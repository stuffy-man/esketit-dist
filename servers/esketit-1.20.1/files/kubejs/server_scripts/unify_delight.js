// priority: 10
// Delight addon cross-mod food unification — redirects duplicate ingredients/items
// to a single PRIMARY mod's version so recipes, JEI, and inventories stay clean.

ServerEvents.recipes(event => {

    // ════ CORN · Primary: corn_delight (73 recipes, dedicated corn mod) ════
    // cultural_delights also adds corn crops/kernels/popcorn/tortilla — redirect to corn_delight
    var cornRedirects = [
        ['culturaldelights:corn_cob',      'corn_delight:corn'],
        ['culturaldelights:corn_kernels',  'corn_delight:corn_seeds'],
        ['culturaldelights:creamed_corn',  'corn_delight:creamed_corn'],
        ['culturaldelights:popcorn',       'corn_delight:popcorn'],
        ['culturaldelights:tortilla',      'corn_delight:tortilla'],
        ['culturaldelights:tortilla_chips','corn_delight:tortilla_chip'],
    ]
    cornRedirects.forEach(function(pair) {
        event.replaceInput({},  pair[0], pair[1])
        event.replaceOutput({}, pair[0], pair[1])
        event.shapeless(pair[1], [pair[0]])
    })

    // ════ CALAMARI · Primary: rusticdelight (294 recipes, broad seafood) ════
    // cultural_delights also adds raw/cooked calamari — redirect
    event.replaceInput({},  'culturaldelights:raw_calamari',    'rusticdelight:calamari')
    event.replaceOutput({}, 'culturaldelights:raw_calamari',    'rusticdelight:calamari')
    event.shapeless('rusticdelight:calamari', ['culturaldelights:raw_calamari'])
    event.replaceInput({},  'culturaldelights:cooked_calamari', 'rusticdelight:cooked_calamari')
    event.replaceOutput({}, 'culturaldelights:cooked_calamari', 'rusticdelight:cooked_calamari')
    event.shapeless('rusticdelight:cooked_calamari', ['culturaldelights:cooked_calamari'])

    // ════ SQUID TENTACLES · Primary: crabbersdelight (dedicated seafood mob drops) ════
    // oceanic_delight also adds raw/glow squid tentacles — redirect to crabbersdelight
    event.replaceInput({},  'oceanic_delight:squid_tentacles',      'crabbersdelight:raw_squid_tentacles')
    event.replaceOutput({}, 'oceanic_delight:squid_tentacles',      'crabbersdelight:raw_squid_tentacles')
    event.shapeless('crabbersdelight:raw_squid_tentacles', ['oceanic_delight:squid_tentacles'])
    event.replaceInput({},  'oceanic_delight:glow_squid_tentacles', 'crabbersdelight:raw_glow_squid_tentacles')
    event.replaceOutput({}, 'oceanic_delight:glow_squid_tentacles', 'crabbersdelight:raw_glow_squid_tentacles')
    event.shapeless('crabbersdelight:raw_glow_squid_tentacles', ['oceanic_delight:glow_squid_tentacles'])
    // ocean_s_delight tentacles are unique (guardian-based, different concept) — left alone.

    // ════ SUNFLOWER SEEDS · Primary: sunflowerdelight (95 recipes, oil/halva ecosystem) ════
    // seed_delight also adds sunflower seeds — redirect
    event.replaceInput({},  'seeddelight:sunflower_seed',       'sunflowerdelight:sunflower_seed')
    event.replaceOutput({}, 'seeddelight:sunflower_seed',       'sunflowerdelight:sunflower_seed')
    event.shapeless('sunflowerdelight:sunflower_seed', ['seeddelight:sunflower_seed'])
    event.replaceInput({},  'seeddelight:fried_sunflower_seed', 'sunflowerdelight:fried_sunflower_seed')
    event.replaceOutput({}, 'seeddelight:fried_sunflower_seed', 'sunflowerdelight:fried_sunflower_seed')
    event.shapeless('sunflowerdelight:fried_sunflower_seed', ['seeddelight:fried_sunflower_seed'])

    // ════ PINEAPPLE · Primary: pineapple_delight ════
    // fruitsdelight also adds pineapple — redirect to pineapple_delight's version
    event.replaceInput({},  'fruitsdelight:pineapple', 'pineapple_delight:pineapple')
    event.replaceOutput({}, 'fruitsdelight:pineapple', 'pineapple_delight:pineapple')
    event.shapeless('pineapple_delight:pineapple', ['fruitsdelight:pineapple'])

    // Cherry: seed_delight vs trail_tales_delight — NOT duplicates (one is the fruit,
    // the other is cherry blossom petals). No redirect needed.
})
