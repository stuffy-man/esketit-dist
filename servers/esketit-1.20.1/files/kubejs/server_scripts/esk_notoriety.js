// priority: 100
// ESKETIT — Notoriety (репутация угрозы). ФАЗА 1.
// Считает персональный "уровень известности" игрока среди пиладжеров по ГИРУ + БОГАТСТВУ
// (+ минорный флор возраста сервера). Пишет результат в persistentData игрока:
//   EskNotoriety      (int 0..100)  — сырой счёт
//   EskNotorietyTier  (int 0..4)    — тир (0 Безвестный .. 4 Враг пиладжеров)
// Другие скрипты (esk_pillager_scaling / esk_threat_director) читают ЭТО, не дублируя счёт.
//
// БЕЗОПАСНОСТЬ (уроки пака): только var; троттл через СВОЙ счётчик (НЕ p.age — он undefined);
// весь код в try/catch (ошибка server-script = сервер незаходибелен); IIFE (общий scope скриптов).
// Ничего не крашит: любой промах API → компонент = 0, не исключение наверх.

(function () {
  // ────────── МАСТЕР-ВЫКЛЮЧАТЕЛЬ и флаги ──────────
  var ENABLED = true;          // false → скрипт не считает (аварийный стоп)
  var ENABLE_BASE_SCAN = false; // ФАЗА 5: тяжёлый скан базы. По умолчанию ВЫКЛ.
  var DEBUG = false;           // console.info по каждому пересчёту

  // ────────── ТЮНЕРЫ ──────────
  var RECALC_INTERVAL = 100;   // тиков между пересчётами на игрока (~5 c)
  // Пороги тиров по сырому N (0..100). tierOf(N): последний порог, который N достиг.
  var TIER_CUTS = [16, 36, 56, 76]; // <16=0, <36=1, <56=2, <76=3, >=76=4

  // Веса компонент (сумма максимумов = 100; гир+богатство доминируют)
  var CAP_GEAR = 40, CAP_CARRY = 30, CAP_BASE = 20, CAP_AGE = 10;

  // Несомые ценности: id → вес за 1 штуку (лог-масштаб применяется к сумме)
  var VALUABLES = {
    'minecraft:netherite_ingot': 8, 'minecraft:netherite_block': 72,
    'minecraft:netherite_scrap': 4, 'minecraft:ancient_debris': 3,
    'minecraft:diamond': 4, 'minecraft:diamond_block': 36,
    'minecraft:emerald': 2, 'minecraft:emerald_block': 18,
    'minecraft:gold_ingot': 1, 'minecraft:gold_block': 9,
    'minecraft:totem_of_undying': 2, 'minecraft:enchanted_golden_apple': 3,
    'minecraft:nether_star': 10, 'minecraft:netherite_upgrade_smithing_template': 3,
    'esketit_metallurgy:steel_ingot': 1.5, 'esketit_metallurgy:rose_gold_ingot': 1.5,
    'esketit_metallurgy:steel_block': 13, 'esketit_metallurgy:rose_gold_block': 13
  };
  // Тир оружия/инструмента по подстроке id → очки (берём максимум по хотбару)
  var TOOL_TIER = [
    ['netherite', 10], ['esketit_metallurgy:steel', 8], ['esketit_metallurgy:rose_gold', 8],
    ['diamond', 7], ['esketit_metallurgy:bronze', 5], ['iron', 4],
    ['esketit_metallurgy:copper', 3], ['golden', 2], ['stone', 1], ['wooden', 0]
  ];

  // Любой предмет даёт крошечный вклад, но ценные ресурсы и снаряжение остаются главным фактором.
  // Это не позволяет набить высокий тир булыжником, зато закрывает лазейку с сумками/контейнерами.
  var GENERIC_ITEM_WEIGHT = 0.002;
  var MAX_NBT_DEPTH = 12;
  var MAX_NBT_NODES = 4096;
  var MAX_NESTED_STACKS = 1024;

  var CuriosApi = null;
  try { CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi'); } catch (e) {}

  var lastCalc = {};   // uuid → локальный тик игрока последнего пересчёта
  var playerTicks = {}; // отдельный счётчик на игрока: онлайн других игроков не ускоряет скан

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
  function tierOf(n) { var t = 0; for (var i = 0; i < TIER_CUTS.length; i++) if (n >= TIER_CUTS[i]) t = i + 1; return t; }

  // Сумма уровней зачарований на стаке (через NBT, надёжно)
  function enchLevels(stack) {
    try {
      if (!stack || stack.isEmpty()) return 0;
      var nbt = stack.getNbt();
      if (!nbt) return 0;
      var list = nbt.getList('Enchantments', 10); // 10 = Compound
      var s = 0;
      for (var i = 0; i < list.size(); i++) { try { s += list.getCompound(i).getInt('lvl'); } catch (e) {} }
      return s;
    } catch (e) { return 0; }
  }

  function forgingQualityBonus(stack) {
    try {
      if (!stack || stack.isEmpty()) return 0;
      var nbt = stack.getNbt();
      if (!nbt || !nbt.contains('ForgingQuality')) return 0;
      var q = String(nbt.getString('ForgingQuality')).toLowerCase();
      if (q.indexOf('master') >= 0) return 2.0;
      if (q.indexOf('perfect') >= 0) return 1.5;
      if (q.indexOf('expert') >= 0) return 1.0;
      return 0;
    } catch (e) { return 0; }
  }

  function toolScore(id) {
    var best = 0;
    for (var i = 0; i < TOOL_TIER.length; i++) if (id.indexOf(TOOL_TIER[i][0]) >= 0 && TOOL_TIER[i][1] > best) best = TOOL_TIER[i][1];
    return best;
  }

  function isEquipmentId(id) {
    return /(_sword|_pickaxe|_axe|_shovel|_hoe|_helmet|_chestplate|_leggings|_boots)$/.test(id)
      || id === 'minecraft:bow' || id === 'minecraft:crossbow'
      || id === 'minecraft:trident' || id === 'minecraft:shield';
  }

  function enchLevelsNbt(nbt) {
    try {
      if (!nbt) return 0;
      var list = nbt.getList('Enchantments', 10);
      var stored = nbt.getList('StoredEnchantments', 10);
      var s = 0, i;
      for (i = 0; i < list.size(); i++) s += list.getCompound(i).getInt('lvl');
      for (i = 0; i < stored.size(); i++) s += stored.getCompound(i).getInt('lvl');
      return s;
    } catch (e) { return 0; }
  }

  function forgingQualityBonusNbt(nbt) {
    try {
      if (!nbt || !nbt.contains('ForgingQuality')) return 0;
      var q = String(nbt.getString('ForgingQuality')).toLowerCase();
      if (q.indexOf('master') >= 0) return 2.0;
      if (q.indexOf('perfect') >= 0) return 1.5;
      if (q.indexOf('expert') >= 0) return 1.0;
      return 0;
    } catch (e) { return 0; }
  }

  // Безопасно достать стак из слота инвентаря
  function slot(inv, i) { try { return inv.getItem(i); } catch (e) { return null; } }

  function computeGear(p) {
    var g = 0;
    try {
      // Броня (0..15): ванильный armorValue 0..20 → 0..12, + toughness/quality сверху
      var av = 0; try { av = p.getArmorValue(); } catch (e) {}
      g += clamp(av * 0.6, 0, 12);
      var inv = p.inventory;
      // Слоты брони 36..39; оружие и инструменты учитываются во всём инвентаре, не только в хотбаре.
      var qBonus = 0, enchTotal = 0, toolBest = 0;
      for (var i = 36; i <= 39; i++) { var st = slot(inv, i); qBonus += forgingQualityBonus(st); enchTotal += enchLevels(st); }
      for (var h = 0; h <= 35; h++) { var s2 = slot(inv, h); if (s2 && !s2.isEmpty()) { toolBest = Math.max(toolBest, toolScore(String(s2.getId()))); qBonus += forgingQualityBonus(s2) * 0.5; enchTotal += enchLevels(s2) * 0.5; } }
      var off = slot(inv, 40);
      if (off && !off.isEmpty()) { toolBest = Math.max(toolBest, toolScore(String(off.getId()))); qBonus += forgingQualityBonus(off) * 0.5; enchTotal += enchLevels(off) * 0.5; }

      // Надетые Curios тоже являются снаряжением игрока.
      eachCurioStack(p, function (curio) {
        toolBest = Math.max(toolBest, toolScore(String(curio.getId())));
        qBonus += forgingQualityBonus(curio) * 0.5;
        enchTotal += enchLevels(curio) * 0.5;
      });
      g += clamp(toolBest, 0, 10);              // оружие/инструмент 0..10
      g += clamp(enchTotal * 0.5, 0, 10);        // зачарования 0..10
      g += clamp(qBonus, 0, 5);                  // качество ковки 0..5
    } catch (e) { if (DEBUG) console.error('[notoriety] gear ' + e); }
    return clamp(g, 0, CAP_GEAR);
  }

  function eachCurioStack(p, callback) {
    if (!CuriosApi) return;
    try {
      var opt = CuriosApi.getCuriosInventory(p);
      if (!opt || !opt.isPresent()) return;
      var handler = opt.orElse(null).getEquippedCurios();
      for (var i = 0; i < handler.getSlots(); i++) {
        var st = handler.getStackInSlot(i);
        if (st && !st.isEmpty()) callback(st);
      }
    } catch (e) { if (DEBUG) console.error('[notoriety] curios ' + e); }
  }

  function addItemValue(state, id, count, itemNbt) {
    if (!id || count <= 0) return;
    var cappedCount = Math.min(count, 64);
    state.raw += GENERIC_ITEM_WEIGHT * cappedCount;
    var valuable = VALUABLES[id];
    if (valuable) state.raw += valuable * count;
    if (isEquipmentId(id)) state.raw += toolScore(id) * 0.6 * Math.min(count, 4);
    state.raw += enchLevelsNbt(itemNbt) * 0.15;
    state.raw += forgingQualityBonusNbt(itemNbt) * 1.5;
  }

  // Ищет сериализованные ItemStack внутри любого NBT-контейнера: SatchelItems, BlockEntityTag.Items,
  // bundle Items, Forge ItemStackHandler и совместимые рюкзаки. Каждый NBT-узел посещается один раз.
  function scanNestedNbt(tag, state, depth) {
    if (!tag || depth > MAX_NBT_DEPTH || state.nodes >= MAX_NBT_NODES || state.stacks >= MAX_NESTED_STACKS) return;
    state.nodes++;
    try {
      var type = tag.getId();
      if (type === 10) {
        if (tag.contains('id') && (tag.contains('Count') || tag.contains('count'))) {
          var id = String(tag.getString('id'));
          var count = tag.contains('Count') ? tag.getInt('Count') : tag.getInt('count');
          var itemNbt = tag.contains('tag') ? tag.getCompound('tag') : null;
          addItemValue(state, id, count, itemNbt);
          state.stacks++;
        }
        var keys = tag.getAllKeys().iterator();
        while (keys.hasNext() && state.nodes < MAX_NBT_NODES && state.stacks < MAX_NESTED_STACKS) {
          scanNestedNbt(tag.get(String(keys.next())), state, depth + 1);
        }
      } else if (type === 9) {
        for (var i = 0; i < tag.size() && state.nodes < MAX_NBT_NODES && state.stacks < MAX_NESTED_STACKS; i++) {
          scanNestedNbt(tag.get(i), state, depth + 1);
        }
      }
    } catch (e) { if (DEBUG) console.error('[notoriety] nested nbt ' + e); }
  }

  function addRealStack(state, st) {
    try {
      if (!st || st.isEmpty()) return;
      var id = String(st.getId());
      var count = st.getCount();
      var nbt = st.getNbt();
      addItemValue(state, id, count, nbt);
      if (nbt) scanNestedNbt(nbt, state, 0);
    } catch (e) { if (DEBUG) console.error('[notoriety] stack ' + e); }
  }

  function computeCarry(p) {
    var state = { raw: 0, nodes: 0, stacks: 0 };
    try {
      var inv = p.inventory;
      for (var i = 0; i <= 40; i++) {
        var st = slot(inv, i);
        addRealStack(state, st);
      }
      eachCurioStack(p, function (curio) { addRealStack(state, curio); });
    } catch (e) { if (DEBUG) console.error('[notoriety] carry ' + e); }
    // Лог-масштаб: 0→0, ~40→~15, ~300→~30 (богатство не улетает в бесконечность)
    var scaled = state.raw <= 0 ? 0 : Math.log(1 + state.raw) * 5.4;
    return clamp(scaled, 0, CAP_CARRY);
  }

  function computeBase(p) {
    if (!ENABLE_BASE_SCAN) return 0;
    // ФАЗА 5 — тяжёлый компонент, выключен по умолчанию. Реализуется отдельно
    // (скан ценных блоков/контейнеров/маяков вокруг стоящего игрока с кэшем по чанку).
    return 0;
  }

  function computeAge() {
    // Минорный глобальный флор по возрасту мира (игровые сутки). Читается дёшево.
    try {
      var lvl = Utils.server.overworld();
      var days = Math.floor(lvl.getDayTime() / 24000);
      return clamp(days * 0.2, 0, CAP_AGE); // ~50 суток → максимум флора
    } catch (e) { return 0; }
  }

  if (PlayerEvents.tick) PlayerEvents.tick(function (event) {
    if (!ENABLED) return;
    var p = event.player;
    if (!p) return; // PlayerEvents.tick на сервере всегда даёт ServerPlayer; лишний guard убран
    var id;
    try { id = String(p.getUuid()); } catch (e) { return; }

    var now = (playerTicks[id] || 0) + 1;
    playerTicks[id] = now;
    var last = lastCalc[id] || -99999;
    if (now - last < RECALC_INTERVAL) return;
    lastCalc[id] = now;

    try {
      var g = computeGear(p), c = computeCarry(p), b = computeBase(p), a = computeAge();
      var n = Math.round(clamp(g + c + b + a, 0, 100));
      var tier = tierOf(n);
      var pd = p.persistentData;
      pd.putInt('EskNotoriety', n);
      pd.putInt('EskNotorietyTier', tier);
      if (DEBUG) console.info('[notoriety] ' + p.getUsername() + ' N=' + n + ' (g' + Math.round(g) + ' c' + Math.round(c) + ' b' + Math.round(b) + ' a' + Math.round(a) + ') tier=' + tier);
    } catch (e) { console.error('[notoriety] calc ' + e); }
  });

  // Команда самопроверки: /notoriety → показать свой счёт и тир
  if (ServerEvents.commandRegistry) ServerEvents.commandRegistry(function (event) {
    try {
      var Commands = Java.loadClass('net.minecraft.commands.Commands');
      event.register(
        Commands.literal('notoriety').executes(function (ctx) {
          try {
            var sp = ctx.getSource().getPlayerOrException();
            var pd = sp.getPersistentData();
            var n = pd.getInt('EskNotoriety'), t = pd.getInt('EskNotorietyTier');
            var names = ['§7Безвестный', '§fЗамеченный', '§eМеченый', '§6Охотимый', '§cВраг пиладжеров'];
            sp.sendSystemMessage(Text.of('§8[§dNotoriety§8] §fуровень §b' + n + '§f/100 — тир ' + (names[t] || t)));
          } catch (e2) {}
          return 1;
        })
      );
    } catch (e) { console.error('[notoriety] cmd ' + e); }
  });

})();
