// Protect mobs attached with a lead from despawning or cleanup after chunk reloads.
(function () {
  var BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');

  function entityId(entity) {
    try { return String(BuiltInRegistries.ENTITY_TYPE.getKey(entity.getType())); }
    catch (e) { return ''; }
  }

  function protect(entity) {
    if (!entity) return;
    try { entity.setPersistenceRequired(); }
    catch (e) {}
  }

  // A lead interaction happens before the mob is attached to a fence. Mark it
  // persistent immediately so unloading the chunk cannot remove it.
  ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract', function (event) {
    try {
      var player = event.getEntity();
      var held = player.getItemInHand(event.getHand());
      var itemId = String(BuiltInRegistries.ITEM.getKey(held.getItem()));
      if (itemId === 'minecraft:lead') protect(event.getTarget());
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
      if (entityId(entity) === 'naturalist:zebra') {
        protect(entity);
        return;
      }
      if (entity.isLeashed()) protect(entity);
    } catch (e) {}
  });
})();
