// priority: 80
// ESKETIT — Threat Director (телеграфированные патрули). ФАЗА 3 + АТМОСФЕРА (D).
// Раз в персональный кулдаун (короче на высоких тирах и при большом онлайне) высылает патруль пиладжеров
// НА ДИСТАНЦИИ от игрока с ДВУХСТАДИЙНЫМ телеграфом:
//   1) далёкий рог + смутное предчувствие  →  ~15 c спустя  →  2) сам отряд + боевой рог.
// Атмосфера: сезоны (Serene Seasons) и погода влияют на частоту/размер (гроза и "сезон набегов"
// = чаще). Между событиями — гарантированная передышка (принцип L4D: Нарастание→Пик→Отдых).
// Сила мобов — через esk_pillager_scaling.js. Только var; троттл своим счётчиком; всё в try/catch.

(function () {
  var ENABLED = true;
  var DEBUG = false;            // подробная трассировка (вкл при отладке)
  var TEST_MODE = false;        // быстрый кулдаун/шанс для диагностики (боевой режим = false)
  var _dimLogged = false;
  var _handlerLogged = false;

  var CHECK_INTERVAL = 200;     // как часто проверять игрока (~10 c, эфемерный троттл)
  var MIN_DIST = 24, MAX_DIST = 40;
  var SPAWN_ATTEMPTS = 8;
  var WARN_DELAY = 300;         // тиков между предупреждением и спавном (~15 c)
  var DAY_COOLDOWN_MULT = 1.6;  // днём реже
  var MIN_POPULATION_CD_MULT = 0.4; // онлайн не может ускорить личный кулдаун более чем в 2.5 раза

  // По тиру: [кулдаун_тиков, шанс_за_проверку, размер_патруля, пул_мобов]
  // Тир 0 (Безвестный/новичок) — БАЗОВОЕ давление: редкий одиночный разведчик, ВАНИЛЬНОЙ силы
  // (esk_pillager_scaling на тире 0 не усиливает). Чтобы «и к новичку приходили», но мягко.
  var TIERS = {
    0: [24000, 0.35, 1, ['minecraft:pillager', 'takesapillage:skirmisher']],
    1: [16000, 0.42, 2, ['minecraft:pillager', 'takesapillage:skirmisher', 'illagerinvasion:basher']],
    2: [10800, 0.50, 3, ['minecraft:pillager', 'illagerinvasion:marauder', 'illagerinvasion:provoker', 'takesapillage:archer', 'savage_and_ravage:iceologer']],
    3: [8000, 0.58, 4, ['minecraft:vindicator', 'illagerinvasion:sorcerer', 'illagerinvasion:necromancer', 'raided:electromancer', 'savage_and_ravage:trickster']],
    4: [5400, 0.65, 5, ['minecraft:vindicator', 'illagerinvasion:inquisitor', 'raided:savager', 'illagerinvasion:invoker', 'minecraft:evoker']]
  };

  var playerTicks = {};
  var lastCheck = {};
  var SeasonHelper = null, seasonResolved = false;

  function clampInt(v) { return Math.floor(v); }
  function isDay(level) { try { var t = level.getDayTime() % 24000; return t < 12000; } catch (e) { return false; } }
  function onlineCount() {
    try { return Math.max(1, Utils.server.getPlayerList().getPlayerCount()); } catch (e) {}
    try { return Math.max(1, Utils.server.players.size()); } catch (e2) {}
    return 1;
  }
  // 1 игрок = 1.00; 2 = 0.82; 4 = 0.63; 8 = 0.47; 11+ упираются в безопасный предел 0.40.
  function populationCooldownMult() {
    var players = onlineCount();
    return Math.max(MIN_POPULATION_CD_MULT, 1.0 / Math.sqrt(1.0 + 0.5 * (players - 1)));
  }
  // Надёжно достать РЕАЛЬНЫЙ Level (в этом KubeJS p.level может быть свойством ИЛИ методом)
  function getLevel(p) {
    var c;
    try { c = p.level; if (c != null && c.getBlock) return c; } catch (e) {}
    try { c = p.level(); if (c != null && c.getBlock) return c; } catch (e) {}
    try { c = p.getLevel(); if (c != null && c.getBlock) return c; } catch (e) {}
    return null;
  }

  // ─── Атмосфера: сезон (Serene Seasons, рефлексия) ───
  function resolveSeason() {
    if (seasonResolved) return; seasonResolved = true;
    try { SeasonHelper = Java.loadClass('sereneseasons.api.season.SeasonHelper'); } catch (e) { SeasonHelper = null; }
  }
  function seasonName(level) {
    resolveSeason();
    if (!SeasonHelper) return null;
    try {
      var state = SeasonHelper.getSeasonState(level);
      if (!state) return null;
      var s = state.getSeason();
      return s ? String(s.toString()).toUpperCase() : null;
    } catch (e) { return null; }
  }
  // Возвращает {cdMult, sizeBonus, chanceMult} по сезону/погоде
  function atmosphere(level) {
    var cd = 1.0, size = 0, chance = 1.0;
    try {
      var s = seasonName(level);
      if (s === 'AUTUMN') { cd *= 0.8; size += 1; chance *= 1.15; }      // сезон набегов (жатва)
      else if (s === 'WINTER') { cd *= 0.85; chance *= 1.1; }            // суровые ночи
      else if (s === 'SPRING') { cd *= 1.1; }                            // затишье
    } catch (e) {}
    try {
      if (level.isThundering()) { cd *= 0.7; chance *= 1.3; }            // гроза = прикрытие набега
      else if (level.isRaining()) { cd *= 0.9; chance *= 1.1; }
    } catch (e) {}
    return { cd: cd, size: size, chance: chance };
  }

  function validColumn(level, x, y, z) {
    try {
      var below = level.getBlock(x, y - 1, z);
      var feet = level.getBlock(x, y, z);
      var head = level.getBlock(x, y + 1, z);
      if (feet.id !== 'minecraft:air' || head.id !== 'minecraft:air') return false;
      if (below.id === 'minecraft:air') return false;
      try { if (!level.canSeeSky(feet.pos)) return false; } catch (e) {}
      return true;
    } catch (e) { return false; }
  }

  function findSpawn(level, px, py, pz) {
    for (var a = 0; a < SPAWN_ATTEMPTS; a++) {
      try {
        var ang = Math.random() * Math.PI * 2;
        var dist = MIN_DIST + Math.random() * (MAX_DIST - MIN_DIST);
        var x = clampInt(px + Math.cos(ang) * dist);
        var z = clampInt(pz + Math.sin(ang) * dist);
        for (var dy = 6; dy >= -8; dy--) {
          var y = clampInt(py) + dy;
          if (validColumn(level, x, y, z)) return { x: x + 0.5, y: y, z: z + 0.5 };
        }
      } catch (e) {}
    }
    return null;
  }

  function spawnPatrol(level, player, tier, extraSize) {
    var cfg = TIERS[tier]; if (!cfg) return false;
    var pool = cfg[3], size = cfg[2] + (extraSize || 0);
    var px, py, pz;
    try { px = player.getX(); py = player.getY(); pz = player.getZ(); } catch (e) { return false; }
    try { if (!level.canSeeSky(player.blockPosition())) { if (DEBUG) console.info('[director] spawnPatrol: игрок НЕ под открытым небом — пропуск'); return false; } } catch (e) {}
    var pos = findSpawn(level, px, py, pz);
    if (!pos) { if (DEBUG) console.info('[director] spawnPatrol: не найдено валидной точки спавна рядом'); return false; }
    var spawned = 0;
    for (var i = 0; i < size; i++) {
      try {
        var id = pool[Math.floor(Math.random() * pool.length)];
        var e = level.createEntity(id);
        if (!e) { if (DEBUG) console.info('[director] createEntity вернул null для ' + id); continue; }
        e.setPosition(pos.x + (Math.random() - 0.5) * 2, pos.y, pos.z + (Math.random() - 0.5) * 2);
        try { e.persistentData.putBoolean('EskDirector', true); } catch (e2) {}
        e.spawn();
        spawned++;
      } catch (e3) { console.error('[director] spawn one (' + id + '): ' + e3); }
    }
    if (DEBUG) console.info('[director] spawnPatrol: заспавнено ' + spawned + '/' + size + ' в ' + Math.floor(pos.x) + ',' + Math.floor(pos.y) + ',' + Math.floor(pos.z));
    return spawned > 0;
  }

  // Стадия 1 — далёкое предупреждение
  function warn(player, tier) {
    var m = { 0: '§7Вдалеке мелькнул одинокий пиладжерский разведчик...',
              1: '§7Где-то вдалеке протрубил рог... за вами могли выслать разъезд.',
              2: '§7Тревожный рог разносится по округе — пиладжеры близко.',
              3: '§eБоевые рога пиладжеров — за вами идёт отряд!',
              4: '§cГул рогов и барабанов — пиладжеры послали за вами карателей!' };
    try { player.tell(Text.of('§8[§dУгроза§8] ' + (m[tier] || m[1]))); } catch (e) {}
    try { player.playNotifySound('minecraft:event.raid.horn', 'ambient', 0.6, 0.6); } catch (e) {}
  }
  // Стадия 2 — отряд пришёл
  function strike(player, tier) {
    var m = { 0: '§7Пиладжерский разведчик вышел на вас.',
              1: '§fПатруль пиладжеров вышел на ваш след.',
              2: '§fОтряд пиладжеров атакует!',
              3: '§eБоевой отряд пиладжеров настиг вас!',
              4: '§c⚔ Карательный отряд пиладжеров обрушился на вас!' };
    try { player.tell(Text.of('§8[§dУгроза§8] ' + (m[tier] || m[1]))); } catch (e) {}
    try { player.playNotifySound('minecraft:event.raid.horn', 'hostile', 1.0, 1.0); } catch (e) {}
  }

  if (DEBUG) { try { console.info('[director] SCRIPT LOADED — регистрирую PlayerEvents.tick'); } catch (e) {} }
  if (PlayerEvents.tick) PlayerEvents.tick(function (event) {
    if (DEBUG && !_handlerLogged) { _handlerLogged = true; try { console.info('[director] HANDLER FIRED'); } catch (e) {} }
    if (!ENABLED) return;
    var player, level;
    try {
      player = event.player;
      if (!player) return; // лишний guard !player.isPlayer убран (undefined → молчаливый выход)
      level = getLevel(player);
      if (!level) return; // БАГ-ФИКС: было `level.isClientSide` без скобок = truthy method-ref → return у всех
      var dimStr = ''; try { dimStr = String(level.dimension); } catch (e) {}
      if (DEBUG && !_dimLogged) { _dimLogged = true; try { console.info('[director] dim="' + dimStr + '"'); } catch (e) {} }
      if (dimStr.indexOf('overworld') < 0) return; // мягче: содержит overworld (обёртки/ResourceKey)
    } catch (e) { return; }

    var id;
    try { id = String(player.getUuid()); } catch (e) { return; }
    var playerTick = (playerTicks[id] || 0) + 1;
    playerTicks[id] = playerTick;
    if (playerTick - (lastCheck[id] || -99999) < CHECK_INTERVAL) return;
    lastCheck[id] = playerTick;

    try {
      try { if (player.isCreative() || player.isSpectator()) return; } catch (e) {}
      var pd = player.persistentData;
      var nowGT = 0; try { nowGT = level.getGameTime(); } catch (e) {}

      // ── Стадия 2: есть ли отложенный спавн, которому пора? ──
      var pending = 0; try { pending = pd.getLong('EskPendingPatrol'); } catch (e) {}
      if (pending > 0) {
        if (nowGT < pending) return; // предупреждение отзвучало, ждём отряд
        try { pd.putLong('EskPendingPatrol', 0); } catch (e) {}
        var tierNow = pd.getInt('EskNotorietyTier');
        if (tierNow < 0) tierNow = 0;
        var tc = tierNow > 4 ? 4 : tierNow;
        var atmo = atmosphere(level);
        if (DEBUG) console.info('[director] СТАДИЯ2: пора спавнить, tier=' + tc + ' для ' + player.getUsername());
        var ok = spawnPatrol(level, player, tc, atmo.size);
        if (ok) strike(player, tc);
        // ставим передышку (кулдаун) вне зависимости — чтобы не долбило
        var cfg2 = TIERS[tc];
        var popMult = populationCooldownMult();
        var cd = TEST_MODE ? 400 : clampInt(cfg2[0] * atmo.cd * popMult);
        if (!TEST_MODE && isDay(level)) cd = clampInt(cd * DAY_COOLDOWN_MULT);
        try {
          pd.putLong('EskNextPatrol', nowGT + cd);
          pd.putFloat('EskPatrolPopulationMult', popMult);
        } catch (e) {}
        if (DEBUG) console.info('[director] передышка=' + cd + ' тиков, online=' + onlineCount() + ', populationMult=' + popMult.toFixed(2));
        return;
      }

      // ── Стадия 0: тир и кулдаун ── (тир 0 = базовое давление на новичка, тоже шлём)
      var tier = pd.getInt('EskNotorietyTier');
      if (tier < 0) tier = 0;
      var cfg = TIERS[tier > 4 ? 4 : tier];
      if (!cfg) return;
      var nextAt = 0; try { nextAt = pd.getLong('EskNextPatrol'); } catch (e) {}
      // Если онлайн вырос во время уже идущей передышки, сокращаем её один раз пропорционально.
      // При падении онлайна текущую передышку не удлиняем; новый кулдаун уже возьмёт новое значение.
      if (!TEST_MODE && nextAt > nowGT) {
        try {
          var currentPopMult = populationCooldownMult();
          var scheduledPopMult = pd.getFloat('EskPatrolPopulationMult');
          if (scheduledPopMult <= 0) scheduledPopMult = 1.0; // кулдаун от старой версии скрипта
          if (currentPopMult < scheduledPopMult) {
            nextAt = nowGT + clampInt((nextAt - nowGT) * currentPopMult / scheduledPopMult);
            pd.putLong('EskNextPatrol', nextAt);
            pd.putFloat('EskPatrolPopulationMult', currentPopMult);
          }
        } catch (e) {}
      }
      if (nextAt !== 0 && nowGT < nextAt) return; // передышка

      // ── Стадия 1: ролл (с учётом атмосферы) → предупреждение + отложенный спавн ──
      var atmo0 = atmosphere(level);
      var chance = cfg[1] * atmo0.chance; if (chance > 0.95) chance = 0.95;
      if (TEST_MODE) chance = 0.95;
      if (DEBUG) console.info('[director] СТАДИЯ1: проверка ' + player.getUsername() + ' tier=' + tier + ' chance=' + chance.toFixed(2) + ' nowGT=' + nowGT + ' nextAt=' + nextAt);
      if (Math.random() > chance) return; // не в этот раз (кулдаун не ставим — попробуем позже)
      var wd = TEST_MODE ? 60 : WARN_DELAY;
      try { pd.putLong('EskPendingPatrol', nowGT + wd); } catch (e) {}
      warn(player, tier > 4 ? 4 : tier);
      if (DEBUG) console.info('[director] РОЛЛ ПРОШЁЛ, tier ' + tier + ' для ' + player.getUsername() + ', отряд через ' + wd + ' тиков');
    } catch (e) { console.error('[director] ' + e); }
  });

})();
