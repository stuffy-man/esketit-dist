// priority: 90
// Keeps expensive wild populations within a server-safe budget.
// Named, tamed, leashed, ridden, persistent and chest-carrying animals are never removed.
(function () {
  // APT already prevents new overpopulation. A full level.getEntities() scan
  // causes a large server-thread spike when the first player joins, so the
  // legacy cleanup remains available for emergencies but is disabled normally.
  var ENABLED = false;
  var DEBUG = false;

  // id: [base per dimension, extra per online player]
  var BUDGETS = {
    'minecraft:enderman': [32, 4],
    'minecraft:llama': [24, 2],
    'minecraft:skeleton': [32, 2],
    'minecraft:zombie': [32, 2],
    'minecraft:creeper': [24, 1],
    'minecraft:slime': [24, 2],
    'minecraft:bat': [24, 2],
    'crabbersdelight:crab': [8, 1],
    'caverns_and_chasms:rat': [16, 2],
    'caverns_and_chasms:deeper': [24, 2],
    'caverns_and_chasms:evendeeper': [12, 1],
    'friendsandfoes:glare': [8, 1],
    'artifacts:mimic': [12, 1],
    'neapolitan:chimpanzee': [16, 1],
    'spawn:clam': [8, 1]
  };

  var BuiltInRegistries = null;
  try { BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries'); } catch (e) {}
  // APT prevents populations from growing again. This cleanup only removes the
  // already accumulated excess once; repeatedly scanning every loaded entity
  // causes a visible multi-second server-thread stall on large worlds.
  var cleanedDimensions = {};

  function onlineCount() {
    try { return Math.max(1, Utils.server.getPlayerList().getPlayerCount()); } catch (e) {}
    try { return Math.max(1, Utils.server.players.size()); } catch (e2) {}
    return 1;
  }

  function entityId(entity) {
    try {
      if (BuiltInRegistries) return String(BuiltInRegistries.ENTITY_TYPE.getKey(entity.getType()));
    } catch (e) {}
    try { return String(entity.getEncodeId()); } catch (e2) {}
    return '';
  }

  function isProtected(entity, id) {
    try { if (entity.hasCustomName()) return true; } catch (e) {}
    try { if (entity.isPersistenceRequired()) return true; } catch (e2) {}
    try { if (entity.isTame()) return true; } catch (e3) {}
    try { if (entity.isLeashed()) return true; } catch (e4) {}
    try { if (entity.isPassenger() || entity.isVehicle()) return true; } catch (e5) {}
    try { if ((id === 'minecraft:llama' || id === 'minecraft:donkey' || id === 'minecraft:mule') && entity.hasChest()) return true; } catch (e6) {}
    return false;
  }

  function nearestPlayerDistanceSq(entity, players) {
    var best = 1.0e30;
    try {
      for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        var dx = entity.getX() - player.getX();
        var dy = entity.getY() - player.getY();
        var dz = entity.getZ() - player.getZ();
        var distance = dx * dx + dy * dy + dz * dz;
        if (distance < best) best = distance;
      }
    } catch (e) {}
    return best;
  }

  function prune(level) {
    var buckets = {};
    var players;
    try { players = Utils.server.getPlayerList().getPlayers(); } catch (e) { return; }
    try {
      var iterator = level.getEntities().iterator();
      while (iterator.hasNext()) {
        var entity = iterator.next();
        var id = entityId(entity);
        if (!BUDGETS[id] || isProtected(entity, id)) continue;
        if (!buckets[id]) buckets[id] = [];
        buckets[id].push(entity);
      }
    } catch (e2) {
      console.error('[entity-budget] scan: ' + e2);
      return;
    }

    var population = onlineCount();
    var removed = 0;
    for (var id in buckets) {
      var entities = buckets[id];
      var rule = BUDGETS[id];
      var limit = rule[0] + rule[1] * population;
      if (entities.length <= limit) continue;
      entities.sort(function (a, b) {
        return nearestPlayerDistanceSq(b, players) - nearestPlayerDistanceSq(a, players);
      });
      var excess = entities.length - limit;
      for (var i = 0; i < excess; i++) {
        try { entities[i].discard(); removed++; } catch (e3) {}
      }
    }
    if (removed > 0 || DEBUG) console.info('[entity-budget] removed ' + removed + ' excess wild entities');
  }

  if (PlayerEvents.tick) PlayerEvents.tick(function (event) {
    if (!ENABLED) return;
    var player = event.player;
    if (!player) return;
    var level;
    try { level = player.level; } catch (e) { return; }
    var dimension = '';
    try { dimension = String(level.dimension); } catch (e2) { return; }
    if (cleanedDimensions[dimension]) return;
    cleanedDimensions[dimension] = true;
    prune(level);
  });
})();
