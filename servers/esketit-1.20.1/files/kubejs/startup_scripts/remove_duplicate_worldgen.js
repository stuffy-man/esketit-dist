// priority: 10
// Removes duplicate worldgen features from secondary mods.
// Only the primary mod's crop/plant generates naturally in the world.
// API: event.removeFeatureById(decoration_step, [feature_ids])

WorldgenEvents.remove(event => {

    event.removeFeatureById('vegetal_decoration', [
        // ── BLUEBERRY: H&H patch_blueberry_bush is primary ──────
        'fruitsdelight:blueberry_bush',

        // ── PINEAPPLE: Pineapple Delight patch_wild_pineapple is primary ──
        'fruitsdelight:pineapple',

        // ── CORN: Haunted Harvest corn_field is primary ──────────
        'corn_delight:patch_wild_corn',
        'culturaldelights:wild_corn',

        // ── CUCUMBER: Cultural Delights wild_cucumbers is primary ──
        'vintagedelight:patch_wild_cucumbers',

        // ── PEANUTS: H&H patch_wild_peanuts is primary ──────────
        'vintagedelight:patch_wild_peanuts',

        // ── COTTON: H&H patch_wild_cotton is primary ────────────
        'rusticdelight:wild_cotton_placed',

        // ── COFFEE: Farmer's Respite patch_wild_coffee_bush is primary ──
        'rusticdelight:wild_coffee_placed',

        // ── SALT: Salt mod ore generation is primary ────────────
        'vintagedelight:patch_salt',
    ])
    // Note: galosphere is fully disabled (mods/galosphere.jar.disabled), so its pink_salt
    // worldgen features no longer exist and don't need a removal entry here.

    // Spelunkery's salt ore is registered under "raw_generation", not "vegetal_decoration" —
    // needs its own call. salt:mineral_rock_salt itself lives under "underground_ores", untouched.
    event.removeFeatureById('raw_generation', [
        'spelunkery:noise_salt',
        'spelunkery:rock_salt',
    ])
})
