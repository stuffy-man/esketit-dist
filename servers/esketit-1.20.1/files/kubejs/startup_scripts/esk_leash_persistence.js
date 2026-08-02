// Protect mobs attached with a lead from despawning or cleanup after chunk reloads.
(function () {
  var BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
  var AbstractHorse = Java.loadClass('net.minecraft.world.entity.animal.horse.AbstractHorse');
  var Mob = Java.loadClass('net.minecraft.world.entity.Mob');
  var InteractionResult = Java.loadClass('net.minecraft.world.InteractionResult');

  function entityId(entity) {
    try { return String(BuiltInRegistries.ENTITY_TYPE.getKey(entity.getType())); }
    catch (e) { return ''; }
  }

  function protect(entity) {
    if (!entity) return;
    try { entity.setPersistenceRequired(); }
    catch (e) {}
  }

  function isMount(entity) {
    if (!entity) return false;
    try { if (entity instanceof AbstractHorse) return true; }
    catch (e) {}
    return entityId(entity) === 'naturalist:zebra';
  }

  // A lead interaction happens before the mob is attached to a fence. Mark it
  // persistent immediately so unloading the chunk cannot remove it.
  ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract', function (event) {
    try {
      var target = event.getTarget();

      // Horseman and Vanilla Backport both replace parts of the leash-knot
      // interaction. When a knot already owns leashes, detach the mobs here
      // atomically and stop the conflicting handlers from running.
      if (entityId(target) === 'minecraft:leash_knot') {
        var level = event.getLevel();
        var clientSide = false;
        try { clientSide = level.isClientSide(); }
        catch (e0) { clientSide = level.isClientSide; }
        if (!clientSide) {
          var nearby = level.getEntitiesOfClass(Mob, target.getBoundingBox().inflate(8.0));
          var detached = 0;
          for (var i = 0; i < nearby.size(); i++) {
            var mob = nearby.get(i);
            var holder = mob.getLeashHolder();
            if (holder != null && holder.getId() === target.getId()) {
              protect(mob);
              mob.dropLeash(true, true);
              detached++;
            }
          }
          if (detached > 0) {
            target.discard();
            event.setCancellationResult(InteractionResult.SUCCESS);
            event.setCanceled(true);
            console.info('[Esketit/MountGuard] safely detached ' + detached + ' mob(s) from leash knot');
            return;
          }
        }
      }

      // Any player interaction is enough to classify a horse-family mob as
      // owned livestock. Persistence remains set after the lead is removed.
      if (isMount(target)) protect(target);
      var player = event.getEntity();
      var held = player.getItemInHand(event.getHand());
      var itemId = String(BuiltInRegistries.ITEM.getKey(held.getItem()));
      if (itemId === 'minecraft:lead') protect(target);
    } catch (e) {}
  });

  // Preserve already-leashed mobs when their chunk is loaded. Naturalist
  // zebras receive the same protection unconditionally because they are mounts
  // and must never be treated as disposable wildlife.
  ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityJoinLevelEvent', function (event) {
    try {
      var clientSide = false;
      try { clientSide = event.getLevel().isClientSide(); }
      catch (e1) { try { clientSide = event.getLevel().isClientSide; } catch (e2) {} }
      if (clientSide) return;
      var entity = event.getEntity();
      if (isMount(entity)) {
        protect(entity);
        return;
      }
      if (entity.isLeashed()) protect(entity);
    } catch (e) {}
  });

  // Leave a useful trace if a mount is ever killed or explicitly discarded.
  // Ordinary chunk unloading is intentionally not logged.
  ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityLeaveLevelEvent', function (event) {
    try {
      var entity = event.getEntity();
      if (!isMount(entity)) return;
      var reason = entity.getRemovalReason();
      if (reason == null || String(reason) === 'UNLOADED_TO_CHUNK') return;
      console.warn('[Esketit/MountGuard] mount removed: type=' + entityId(entity)
        + ' uuid=' + entity.getUUID() + ' reason=' + reason
        + ' pos=' + entity.blockPosition().toShortString());
    } catch (e) {}
  });
})();
