// priority: 10
// Hides secondary (replaced) items from JEI.
// Items still exist and can be converted via shapeless recipes in the unify_* scripts.
// KubeJS 6 JEI hide event — if this errors, check KubeJS version for correct event name.

JEIEvents.hideItems((event) => {
  // ── FRUITS (from unify_food.js) ──────────────────────────────
  // Blueberry: H&H primary
  event.hide("fruitsdelight:blueberry");
  event.hide("fruitsdelight:blueberry_muffin");
  event.hide("fruitsdelight:blueberry_crate");
  // Pineapple: Pineapple Delight primary
  event.hide("fruitsdelight:pineapple");
  event.hide("fruitsdelight:pineapple_fried_rice");
  event.hide("fruitsdelight:pineapple_pie");
  event.hide("fruitsdelight:pineapple_crate");
  event.hide("fruitsdelight:wild_pineapple");
  // Cherry: H&H primary
  event.hide("seeddelight:cherry");
  event.hide("seeddelight:cherry_crate");
  event.hide("seeddelight:cherry_wine");
  // Rose hips: Farmer's Respite primary
  event.hide("seeddelight:rosehip");
  event.hide("seeddelight:rosehip_crate");
  event.hide("seeddelight:rosehip_tea");
  event.hide("seeddelight:rosehip_pie");

  // ── CORN (from unify_food.js) ────────────────────────────────
  event.hide("corn_delight:corn");
  event.hide("corn_delight:corn_crate");
  event.hide("corn_delight:corn_kernel_bag");
  event.hide("corn_delight:wild_corn");
  event.hide("corn_delight:popcorn");
  event.hide("corn_delight:cornbread");
  event.hide("culturaldelights:corn_cob");
  event.hide("culturaldelights:corn_kernels");
  event.hide("culturaldelights:wild_corn");
  event.hide("culturaldelights:creamed_corn");
  event.hide("culturaldelights:tortilla");
  event.hide("culturaldelights:tortilla_chips");
  event.hide("culturaldelights:popcorn");

  // ── SALT (5-way) ─────────────────────────────────────────────
  event.hide("hearthandharvest:salt");
  event.hide("hearthandharvest:salt_bag");
  event.hide("spelunkery:salt");
  event.hide("spelunkery:salt_block");
  event.hide("spelunkery:salt_lamp");
  event.hide("vintagedelight:salt");
  event.hide("vintagedelight:salt_block");
  event.hide("compatdelight:salt");
  // spelunkery's separate rock_salt crystal/ore (different from plain "salt" above)
  event.hide("spelunkery:rock_salt");
  event.hide("spelunkery:rock_salt_block");

  // Note: galosphere + galospheric_delight are fully disabled (mods/*.jar.disabled),
  // so their items no longer exist — no hide entries needed for them here.

  // ── CUCUMBER (3-way) ─────────────────────────────────────────
  event.hide("vintagedelight:cucumber");
  event.hide("vintagedelight:cucumber_crate");
  event.hide("vintagedelight:cucumber_seeds");
  event.hide("vintagedelight:wild_cucumbers");
  event.hide("compatdelight:cucumber");
  event.hide("compatdelight:cucumber_seeds");
  event.hide("compatdelight:cut_cucumber");

  // ── EGGPLANT (2-way: vintagedelight has none) ─────────────────
  event.hide("compatdelight:eggplant");
  event.hide("compatdelight:cut_eggplant");

  // ── PICKLE ───────────────────────────────────────────────────
  event.hide("vintagedelight:pickle");

  // ── COFFEE + BEANS ───────────────────────────────────────────
  event.hide("rusticdelight:coffee");
  event.hide("rusticdelight:coffee_beans");

  // ── COCONUT ──────────────────────────────────────────────────
  event.hide("crabbersdelight:coconut");
  event.hide("compatdelight:coconut_milk");

  // ── PEANUT ───────────────────────────────────────────────────
  event.hide("vintagedelight:peanut");
  event.hide("vintagedelight:peanut_crate");
  event.hide("vintagedelight:wild_peanuts");

  // ── COTTON ───────────────────────────────────────────────────
  event.hide("rusticdelight:cotton_seeds");
  event.hide("rusticdelight:wild_cotton");

  // ── MISC INGREDIENTS ─────────────────────────────────────────
  event.hide("ubesdelight:ginger");
  event.hide("compatdelight:garlic");
  event.hide("compatdelight:cut_garlic");
  event.hide("compatdelight:caramel");
  event.hide("delightful:acorn");
  event.hide("rusticdelight:batter");
  event.hide("compatdelight:lemon_juice");
  event.hide("compatdelight:pineapple_juice");
  event.hide("compatdelight:pineapple_slice");
  event.hide("create_central_kitchen:sap_bucket");

  // ── PROCESSED FOOD ───────────────────────────────────────────
  // Mashed potatoes: Cosmopolitan primary
  event.hide("hearthandharvest:mashed_potatoes");
  event.hide("moredelight:mashed_potatoes");
  // Cheese
  event.hide("trailandtales_delight:cheese_wheel");
  event.hide("trailandtales_delight:cheese_slice");
  event.hide("casualness_delight:cheese_wheel");
  event.hide("compatdelight:cheese_slice");
  event.hide("compatdelight:cheese_pasta");
  // Popcorn/waffle/caramel apple
  event.hide("hearthandharvest:waffle");
  // Potato salad
  event.hide("moredelight:potato_salad");
  event.hide("rusticdelight:potato_salad");
  // Misc dishes
  event.hide("oceanic_delight:egg_roll");
  event.hide("rusticdelight:calamari_roll");
  event.hide("vintagedelight:kimchi");
  event.hide("kaleidoscope_tavern:vodka");
  event.hide("dungeonsdelight:bloody_mary");
  event.hide("sunflowerdelight:sunflower_seed");
  event.hide("sunflowerdelight:fried_sunflower_seed");
  event.hide("cosmopolitan:source_berry_ice_cream");
  event.hide("cosmopolitan:source_berry_ice_cream_block");
  event.hide("cosmopolitan:source_berry_milkshake");
  event.hide("compatdelight:source_berry_ice_cream");
  event.hide("compatdelight:sweet_berry_ice_cream");
  event.hide("create_central_kitchen:sweet_berry_cake_slice");
  event.hide("create_central_kitchen:pumpkin_cake_slice");
  event.hide("miners_delight:takoyaki");
  event.hide("swampier_swamps:cooked_frog_leg");
  event.hide("compatdelight:cherry_cookie");
  event.hide("compatdelight:cherry_juice");
  event.hide("compatdelight:cherry_ice_cream");
  event.hide("ubesdelight:condensed_milk_bottle");
  event.hide("delightful:blueberry_pie_slice");
  event.hide("delightful:smore");
  event.hide("delightful:marshmallow_stick");
  event.hide("compatdelight:cheeseburger");
  event.hide("delightful:sinigang");
  event.hide("compatdelight:prickly_pear_juice");
  event.hide("compatdelight:lime_pie");
  event.hide("compatdelight:honey_cookie");
  event.hide("mynethersdelight:spicy_curry");
  event.hide("mynethersdelight:golden_egg");
  event.hide("some_assembly_required:bread_slice");
  event.hide("cosmopolitan:potato_slices");
  event.hide("cosmopolitan:baked_potato_slices");
  event.hide("supplementaries:pancake");

  // ── SEAFOOD ──────────────────────────────────────────────────
  event.hide("spawn:clam");
  event.hide("crabbersdelight:clam");
  event.hide("crittersandcompanions:clam");
  event.hide("spawn:clam_meat");
  event.hide("crabbersdelight:raw_clam_meat");
  event.hide("spawn:cooked_clam_meat");
  event.hide("crabbersdelight:cooked_clam_meat");
  event.hide("spawn:clam_chowder");
  event.hide("crabbersdelight:clam_chowder");
  event.hide("crabbersdelight:shrimp");
  event.hide("miners_delight:squid");
  event.hide("miners_delight:glow_squid");
  event.hide("oceansdelight:tentacles");
  event.hide("ecologics:crab_claw");
  event.hide("crabbersdelight:crab_claw");
  event.hide("compatdelight:crab_meat");
  event.hide("tide:catfish");
  event.hide("tide:catfish_bucket");
  event.hide("tide:pike");
  event.hide("tide:pike_bucket");
  event.hide("crabbersdelight:pearl");
  event.hide("crabbersdelight:sea_pickle_crate");
  event.hide("crabbersdelight:scute_block");

  // ── METALS ───────────────────────────────────────────────────
  // Steel: overgeared is now primary (has the forging/quality mechanic)
  event.hide("createmetallurgy:steel_ingot");
  event.hide("createmetallurgy:steel_block");
  event.hide("create_ironworks:steel_ingot");
  event.hide("create_ironworks:steel_block");
  event.hide("create_ironworks:steel_nugget");
  // Sheets stay on create_ironworks (no overgeared equivalent)
  event.hide("vintage:steel_sheet");
  // molten_metals mod removed — createmetallurgy's molten buckets/slag are no longer hidden
  event.hide("vintage:brass_sheet");
  event.hide("vintage:bronze_sheet");
  event.hide("vintage:tin_sheet");
  event.hide("createloveandwar:netherite_sheet");
  event.hide("vintage:platinum_sheet");
  event.hide("create_ironworks:rose_quartz_block");
  event.hide("create_compressed:sturdy_sheet_block");
  event.hide("create_ironworks:crushed_raw_tin");
  event.hide("spelunkery:copper_nugget");
  event.hide("spelunkery:sulfur");
  event.hide("spelunkery:sulfur_block");
  event.hide("cosmeticarmoursmod:diamond_shard");
  ["helmet", "chestplate", "leggings", "boots"].forEach((p) => {
    event.hide(`create_ironworks:copper_armor_${p}`);
    event.hide(`create_ironworks:steel_armor_${p}`);
  });
  ["pickaxe", "axe", "shovel", "hoe", "sword"].forEach((t) => {
    event.hide(`create_ironworks:bronze_${t}`);
  });

  // ── TOOLS ────────────────────────────────────────────────────
  // Caverns & Chasms copper tools duplicate our forged copper tier — recipes removed in
  // server_scripts/unify_tools.js; hide every skin (base + exposed/weathered/oxidized/waxed) here.
  [
    "",
    "exposed_",
    "weathered_",
    "oxidized_",
    "waxed_",
    "waxed_exposed_",
    "waxed_weathered_",
    "waxed_oxidized_",
  ].forEach((state) => {
    ["pickaxe", "axe", "shovel", "hoe", "sword"].forEach((tool) => {
      event.hide(`caverns_and_chasms:${state}copper_${tool}`);
    });
  });
  event.hide("abnormals_delight:silver_knife");
  ["ironwood", "knightmetal", "steeleaf", "fiery"].forEach((m) => {
    event.hide(`delightful:${m}_knife`);
  });
  ["flint", "iron", "golden", "diamond", "netherite"].forEach((m) => {
    event.hide(`dungeonsdelight:${m}_cleaver`);
  });

  // ── GROUP 6 ──────────────────────────────────────────────────
  event.hide("brewinandchewin:jerky");
  event.hide("hearthandharvest:chocolate_bar");
  event.hide("incubation:fried_egg");
  event.hide("neapolitan:milk_bottle");
  event.hide("overweight_farming:melon_juice");
  event.hide("hearthandharvest:sunflower_seeds");
  event.hide("brewinandchewin:sweet_berry_jam");
  event.hide("brewinandchewin:apple_jelly");
  event.hide("brewinandchewin:glow_berry_marmalade");
  event.hide("displaydelight:melon_popsicle");
  event.hide("displaydelight:melon_juice");
  event.hide("toughasnails:melon_juice");
  event.hide("hearthandharvest:mead");

  // ── MISC ─────────────────────────────────────────────────────
  event.hide("supplementaries:rope");
  event.hide("betterarcheology:bomb");
  event.hide("alekiships:cannon");
  event.hide("alekiships:cannonball");
  event.hide("createmetallurgy:faucet");
  event.hide("supplementaries:flute");
  event.hide("accents:quiver");
  event.hide("accents:straw_hat");
  event.hide("accents:cowboy_hat");
  event.hide("ecologics:thin_ice");
  event.hide("chipped:ice_bricks");
  event.hide("hearthandharvest:turtle_egg_crate");
  event.hide("supplementaries:speedometer");
  event.hide("moonlight:placeable_item");
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
    event.hide(`interiors:${c}_cushion`);
    event.hide(`kaleidoscope_tavern:${c}_sofa`);
  });
  event.hide("chipped:rough_quartz_block");
  event.hide("chipped:polished_quartz_block");

  // ── METALS (from unify_metals.js) ────────────────────────────
  // esketit_metallurgy is primary for tin/silver/bronze/steel/rose gold. Hide foreign duplicate
  // materials + ore blocks (kept: C&C silver ARMOR, soul_silver_ore, tinplate — their unique content).
  [
    // TIN · Caverns & Chasms (materials + ore blocks)
    "caverns_and_chasms:tin_ingot", "caverns_and_chasms:tin_nugget", "caverns_and_chasms:raw_tin",
    "caverns_and_chasms:tin_block", "caverns_and_chasms:raw_tin_block",
    "caverns_and_chasms:tin_ore", "caverns_and_chasms:deepslate_tin_ore",
    "caverns_and_chasms:cassiterite_tin_ore", "caverns_and_chasms:cylindrite_tin_ore",
    // SILVER · Caverns & Chasms (materials + ore blocks, NOT the armour)
    "caverns_and_chasms:silver_ingot", "caverns_and_chasms:silver_nugget", "caverns_and_chasms:raw_silver",
    "caverns_and_chasms:silver_block", "caverns_and_chasms:raw_silver_block",
    "caverns_and_chasms:silver_ore", "caverns_and_chasms:deepslate_silver_ore",
    // SILVER ore variants · spelunkery
    "spelunkery:andesite_silver_ore", "spelunkery:diorite_silver_ore",
    "spelunkery:granite_silver_ore", "spelunkery:tuff_silver_ore",
    // BRONZE · Create: Big Cannons
    "createbigcannons:bronze_ingot", "createbigcannons:bronze_block",
    // STEEL · Create: Big Cannons + Flint'n'Powder
    "createbigcannons:steel_ingot", "createbigcannons:steel_block",
    "flintnpowder:steel_ingot", "flintnpowder:steel_nugget", "flintnpowder:steel_block",
    // ROSE GOLD · cosmeticarmoursmod (ingot/nugget already handled in unify_tools.js)
    "cosmeticarmoursmod:rose_gold_block",
  ].forEach((id) => event.hide(id));
});
