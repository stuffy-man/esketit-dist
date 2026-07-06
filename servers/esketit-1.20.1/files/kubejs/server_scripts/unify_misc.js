// priority: 10
// Miscellaneous item unification — structures, decorations, utilities
// NOTE: Chipped blocks (pillars, terracotta, planks, lanterns) are intentionally excluded.
//       Chipped uses custom workbenches + CTM via Fusion — it is a separate building tier.

ServerEvents.recipes((event) => {
  // ════ ROPE · Primary: farmersdelight (has animal-tying mechanic) ════
  event.replaceInput({}, "supplementaries:rope", "farmersdelight:rope");
  event.replaceOutput({}, "supplementaries:rope", "farmersdelight:rope");
  event.shapeless("farmersdelight:rope", ["supplementaries:rope"]);

  // ════ BOMB · Primary: supplementaries ════
  event.replaceInput({}, "betterarcheology:bomb", "supplementaries:bomb");
  event.replaceOutput({}, "betterarcheology:bomb", "supplementaries:bomb");
  event.shapeless("supplementaries:bomb", ["betterarcheology:bomb"]);

  // ════ CANNON + CANNONBALL · Primary: supplementaries ════
  event.replaceInput({}, "alekiships:cannon", "supplementaries:cannon");
  event.replaceOutput({}, "alekiships:cannon", "supplementaries:cannon");
  event.replaceInput({}, "alekiships:cannonball", "supplementaries:cannonball");
  event.replaceOutput(
    {},
    "alekiships:cannonball",
    "supplementaries:cannonball",
  );
  event.shapeless("supplementaries:cannonball", ["alekiships:cannonball"]);

  // ════ FAUCET · Primary: supplementaries (has fluid drain mechanic) ════
  event.replaceInput({}, "createmetallurgy:faucet", "supplementaries:faucet");
  event.replaceOutput({}, "createmetallurgy:faucet", "supplementaries:faucet");
  event.shapeless("supplementaries:faucet", ["createmetallurgy:faucet"]);

  // ════ FLUTE · Primary: immersive_melodies (dedicated music mod) ════
  event.replaceInput({}, "supplementaries:flute", "immersive_melodies:flute");
  event.replaceOutput({}, "supplementaries:flute", "immersive_melodies:flute");
  event.shapeless("immersive_melodies:flute", ["supplementaries:flute"]);

  // ════ QUIVER · Primary: supplementaries ════
  event.replaceInput({}, "accents:quiver", "supplementaries:quiver");
  event.replaceOutput({}, "accents:quiver", "supplementaries:quiver");
  event.shapeless("supplementaries:quiver", ["accents:quiver"]);

  // ════ STRAW HAT · Primary: overweight_farming (stat bonuses) ════
  event.replaceInput({}, "accents:straw_hat", "overweight_farming:straw_hat");
  event.replaceOutput({}, "accents:straw_hat", "overweight_farming:straw_hat");
  event.shapeless("overweight_farming:straw_hat", ["accents:straw_hat"]);

  // ════ COWBOY HAT · Primary: artifacts ════
  event.replaceInput({}, "accents:cowboy_hat", "artifacts:cowboy_hat");
  event.replaceOutput({}, "accents:cowboy_hat", "artifacts:cowboy_hat");
  event.shapeless("artifacts:cowboy_hat", ["accents:cowboy_hat"]);

  // ════ THIN ICE · Primary: immersive_weathering (full weathering system) ════
  event.replaceInput({}, "ecologics:thin_ice", "immersive_weathering:thin_ice");
  event.replaceOutput(
    {},
    "ecologics:thin_ice",
    "immersive_weathering:thin_ice",
  );

  // ════ ICE BRICKS · Primary: ecologics (has full snow/ice ecosystem) ════
  event.replaceInput({}, "chipped:ice_bricks", "ecologics:ice_bricks");
  event.replaceOutput({}, "chipped:ice_bricks", "ecologics:ice_bricks");

  // ════ TURTLE EGG CRATE · Primary: incubation (has egg-hatching mechanic) ════
  event.replaceInput(
    {},
    "hearthandharvest:turtle_egg_crate",
    "incubation:turtle_egg_crate",
  );
  event.replaceOutput(
    {},
    "hearthandharvest:turtle_egg_crate",
    "incubation:turtle_egg_crate",
  );

  // ════ SAP BUCKET · Primary: hearthandharvest (has tree tapper block) ════
  event.replaceInput(
    {},
    "create_central_kitchen:sap_bucket",
    "hearthandharvest:sap_bucket",
  );
  event.replaceOutput(
    {},
    "create_central_kitchen:sap_bucket",
    "hearthandharvest:sap_bucket",
  );

  // ════ SPEEDOMETER · Primary: create ════
  event.replaceInput({}, "supplementaries:speedometer", "create:speedometer");
  event.replaceOutput({}, "supplementaries:speedometer", "create:speedometer");

  // ════ PLACEABLE ITEM · Primary: supplementaries ════
  event.replaceInput(
    {},
    "moonlight:placeable_item",
    "supplementaries:placeable_item",
  );
  event.replaceOutput(
    {},
    "moonlight:placeable_item",
    "supplementaries:placeable_item",
  );

  // ════ BEEHIVES · Primary: friendsandfoes (functional bee mechanics) ════
  const woodTypes = [
    "acacia",
    "bamboo",
    "birch",
    "cherry",
    "crimson",
    "dark_oak",
    "jungle",
    "mangrove",
    "spruce",
    "warped",
  ];
  woodTypes.forEach((wood) => {
    event.replaceInput(
      {},
      `woodworks:${wood}_beehive`,
      `friendsandfoes:${wood}_beehive`,
    );
    event.replaceOutput(
      {},
      `woodworks:${wood}_beehive`,
      `friendsandfoes:${wood}_beehive`,
    );
  });

  // ════ LEAF PILES · Primary: immersive_weathering (falling leaf system) ════
  const leafTypes = [
    "oak",
    "spruce",
    "birch",
    "jungle",
    "acacia",
    "dark_oak",
    "azalea",
    "flowering_azalea",
    "mangrove",
    "cherry",
  ];
  leafTypes.forEach((tree) => {
    event.replaceInput(
      {},
      `woodworks:${tree}_leaf_pile`,
      `immersive_weathering:${tree}_leaf_pile`,
    );
    event.replaceOutput(
      {},
      `woodworks:${tree}_leaf_pile`,
      `immersive_weathering:${tree}_leaf_pile`,
    );
  });

  /*// ════ ROTTEN WOOD (3-way) · Primary: the_deep_void ════
    // spawn has everything except rotten_pressure_plate.
    // betterarcheology has everything except stripped_rotten_log/wood.
    const spawnRottenItems = [
        'rotten_log','rotten_wood','rotten_planks','rotten_slab','rotten_stairs',
        'rotten_door','rotten_fence','rotten_fence_gate','rotten_trapdoor',
        'stripped_rotten_log','stripped_rotten_wood'
    ]
    const betterarcheologyRottenItems = [
        'rotten_log','rotten_wood','rotten_planks','rotten_slab','rotten_stairs',
        'rotten_door','rotten_fence','rotten_fence_gate','rotten_trapdoor','rotten_pressure_plate'
    ]
    spawnRottenItems.forEach(item => {
        event.replaceInput({},  `spawn:${item}`, `the_deep_void:${item}`)
        event.replaceOutput({}, `spawn:${item}`, `the_deep_void:${item}`)
        event.shapeless(`the_deep_void:${item}`, [`spawn:${item}`])
    })
    betterarcheologyRottenItems.forEach(item => {
        event.replaceInput({},  `betterarcheology:${item}`, `the_deep_void:${item}`)
        event.replaceOutput({}, `betterarcheology:${item}`, `the_deep_void:${item}`)
        })*/

  // ════ CUSHIONS · Primary: redeco ════
  const colors = [
    "black",
    "blue",
    "brown",
    "cyan",
    "gray",
    "green",
    "light_blue",
    "light_gray",
    "lime",
    "magenta",
    "orange",
    "pink",
    "purple",
    "red",
    "white",
    "yellow",
  ];
  colors.forEach((c) => {
    event.replaceInput({}, `interiors:${c}_cushion`, `redeco:${c}_cushion`);
    event.replaceOutput({}, `interiors:${c}_cushion`, `redeco:${c}_cushion`);
    event.shapeless(`redeco:${c}_cushion`, [`interiors:${c}_cushion`]);
  });

  // ════ SOFAS · Primary: redeco ════
  colors.forEach((c) => {
    event.replaceInput({}, `kaleidoscope_tavern:${c}_sofa`, `redeco:${c}_sofa`);
    event.replaceOutput(
      {},
      `kaleidoscope_tavern:${c}_sofa`,
      `redeco:${c}_sofa`,
    );
    event.shapeless(`redeco:${c}_sofa`, [`kaleidoscope_tavern:${c}_sofa`]);
  });

  // ════ QUARTZ BLOCKS · Primary: spelunkery ════
  event.replaceInput(
    {},
    "chipped:rough_quartz_block",
    "spelunkery:rough_quartz_block",
  );
  event.replaceOutput(
    {},
    "chipped:rough_quartz_block",
    "spelunkery:rough_quartz_block",
  );
  event.replaceInput(
    {},
    "chipped:polished_quartz_block",
    "spelunkery:polished_quartz_block",
  );
  event.replaceOutput(
    {},
    "chipped:polished_quartz_block",
    "spelunkery:polished_quartz_block",
  );

});
