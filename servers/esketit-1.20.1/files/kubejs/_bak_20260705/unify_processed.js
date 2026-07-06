// priority: 10
// Processed food unification — dishes, preserved foods, desserts

ServerEvents.recipes(event => {

    // ════ CHEESE WHEEL (3-way) · Primary: vintagedelight ════
    ;['trailandtales_delight:cheese_wheel','casualness_delight:cheese_wheel'].forEach(s => {
        event.replaceInput({}, s, 'vintagedelight:cheese_wheel')
        event.replaceOutput({}, s, 'vintagedelight:cheese_wheel')
        event.shapeless('vintagedelight:cheese_wheel', [s])
    })
    ;['trailandtales_delight:cheese_slice','compatdelight:cheese_slice'].forEach(s => {
        event.replaceInput({}, s, 'vintagedelight:cheese_slice')
        event.replaceOutput({}, s, 'vintagedelight:cheese_slice')
    })
    event.replaceInput({},  'compatdelight:cheese_pasta', 'vintagedelight:cheese_pasta')
    event.replaceOutput({}, 'compatdelight:cheese_pasta', 'vintagedelight:cheese_pasta')

    // ════ POPCORN (add culturaldelights — corn already redirected to HH) ════
    event.replaceInput({},  'culturaldelights:popcorn', 'hauntedharvest:popcorn')
    event.replaceOutput({}, 'culturaldelights:popcorn', 'hauntedharvest:popcorn')

    // ════ WAFFLE · Primary: create_factory (4 variants + Create integration) ════
    // Guard: create_factory may not be installed; replaceInput/replaceOutput are safe no-ops
    // when either item is missing, but shapeless() throws if the result item doesn't exist.
    if (!Item.of('create_factory:waffle').isEmpty()) {
        event.replaceInput({},  'hearthandharvest:waffle', 'create_factory:waffle')
        event.replaceOutput({}, 'hearthandharvest:waffle', 'create_factory:waffle')
        event.shapeless('create_factory:waffle', ['hearthandharvest:waffle'])
    }

    // ════ MASHED POTATOES (3-way) · Primary: cosmopolitan ════
    event.replaceInput({},  'hearthandharvest:mashed_potatoes', 'cosmopolitan:mashed_potato')
    event.replaceOutput({}, 'hearthandharvest:mashed_potatoes', 'cosmopolitan:mashed_potato')
    event.replaceInput({},  'moredelight:mashed_potatoes',      'cosmopolitan:mashed_potato')
    event.replaceOutput({}, 'moredelight:mashed_potatoes',      'cosmopolitan:mashed_potato')
    event.shapeless('cosmopolitan:mashed_potato', ['hearthandharvest:mashed_potatoes'])
    event.shapeless('cosmopolitan:mashed_potato', ['moredelight:mashed_potatoes'])

    // ════ POTATO SALAD (3-way) · Primary: oceanic_delight ════
    ;['moredelight:potato_salad','rusticdelight:potato_salad'].forEach(s => {
        event.replaceInput({}, s, 'oceanic_delight:potato_salad')
        event.replaceOutput({}, s, 'oceanic_delight:potato_salad')
        event.shapeless('oceanic_delight:potato_salad', [s])
    })

    // ════ EGG ROLL · Primary: culturaldelights ════
    event.replaceInput({},  'oceanic_delight:egg_roll', 'culturaldelights:egg_roll')
    event.replaceOutput({}, 'oceanic_delight:egg_roll', 'culturaldelights:egg_roll')

    // ════ CALAMARI ROLL · Primary: culturaldelights ════
    event.replaceInput({},  'rusticdelight:calamari_roll', 'culturaldelights:calamari_roll')
    event.replaceOutput({}, 'rusticdelight:calamari_roll', 'culturaldelights:calamari_roll')

    // ════ KIMCHI · Primary: brewinandchewin (fermentation mechanic) ════
    event.replaceInput({},  'vintagedelight:kimchi', 'brewinandchewin:kimchi')
    event.replaceOutput({}, 'vintagedelight:kimchi', 'brewinandchewin:kimchi')
    event.shapeless('brewinandchewin:kimchi', ['vintagedelight:kimchi'])

    // ════ VODKA · Primary: brewinandchewin ════
    event.replaceInput({},  'kaleidoscope_tavern:vodka', 'brewinandchewin:vodka')
    event.replaceOutput({}, 'kaleidoscope_tavern:vodka', 'brewinandchewin:vodka')
    event.shapeless('brewinandchewin:vodka', ['kaleidoscope_tavern:vodka'])

    // ════ BLOODY MARY · Primary: brewinandchewin ════
    event.replaceInput({},  'dungeonsdelight:bloody_mary', 'brewinandchewin:bloody_mary')
    event.replaceOutput({}, 'dungeonsdelight:bloody_mary', 'brewinandchewin:bloody_mary')

    // ════ SUNFLOWER SEED + FRIED · Primary: seeddelight ════
    event.replaceInput({},  'sunflowerdelight:sunflower_seed',       'seeddelight:sunflower_seed')
    event.replaceOutput({}, 'sunflowerdelight:sunflower_seed',       'seeddelight:sunflower_seed')
    event.replaceInput({},  'sunflowerdelight:fried_sunflower_seed', 'seeddelight:fried_sunflower_seed')
    event.replaceOutput({}, 'sunflowerdelight:fried_sunflower_seed', 'seeddelight:fried_sunflower_seed')

    // ════ SOURCE BERRY ICE CREAM (3-way) · Primary: delightful ════
    ;['cosmopolitan:source_berry_ice_cream','compatdelight:source_berry_ice_cream'].forEach(s => {
        event.replaceInput({}, s, 'delightful:source_berry_ice_cream')
        event.replaceOutput({}, s, 'delightful:source_berry_ice_cream')
    })
    event.replaceInput({},  'cosmopolitan:source_berry_ice_cream_block', 'delightful:source_berry_ice_cream_block')
    event.replaceOutput({}, 'cosmopolitan:source_berry_ice_cream_block', 'delightful:source_berry_ice_cream_block')
    event.replaceInput({},  'cosmopolitan:source_berry_milkshake', 'delightful:source_berry_milkshake')
    event.replaceOutput({}, 'cosmopolitan:source_berry_milkshake', 'delightful:source_berry_milkshake')

    // ════ SWEET BERRY ICE CREAM · Primary: seasonals ════
    event.replaceInput({},  'compatdelight:sweet_berry_ice_cream', 'seasonals:sweet_berry_ice_cream')
    event.replaceOutput({}, 'compatdelight:sweet_berry_ice_cream', 'seasonals:sweet_berry_ice_cream')

    // ════ CAKE SLICES · Primary: seasonals ════
    event.replaceInput({},  'create_central_kitchen:sweet_berry_cake_slice', 'seasonals:sweet_berry_cake_slice')
    event.replaceOutput({}, 'create_central_kitchen:sweet_berry_cake_slice', 'seasonals:sweet_berry_cake_slice')
    event.replaceInput({},  'create_central_kitchen:pumpkin_cake_slice', 'seasonals:pumpkin_cake_slice')
    event.replaceOutput({}, 'create_central_kitchen:pumpkin_cake_slice', 'seasonals:pumpkin_cake_slice')

    // ════ TAKOYAKI · Primary: oceanic_delight ════
    event.replaceInput({},  'miners_delight:takoyaki', 'oceanic_delight:takoyaki')
    event.replaceOutput({}, 'miners_delight:takoyaki', 'oceanic_delight:takoyaki')

    // ════ CHERRY COOKIE · Primary: abnormals_delight ════
    event.replaceInput({},  'compatdelight:cherry_cookie', 'abnormals_delight:cherry_cookie')
    event.replaceOutput({}, 'compatdelight:cherry_cookie', 'abnormals_delight:cherry_cookie')

    // ════ CHERRY JUICE · Primary: hearthandharvest ════
    event.replaceInput({},  'compatdelight:cherry_juice', 'hearthandharvest:cherry_juice')
    event.replaceOutput({}, 'compatdelight:cherry_juice', 'hearthandharvest:cherry_juice')

    // ════ CHERRY ICE CREAM · Primary: seeddelight ════
    event.replaceInput({},  'compatdelight:cherry_ice_cream', 'seeddelight:cherry_ice_cream')
    event.replaceOutput({}, 'compatdelight:cherry_ice_cream', 'seeddelight:cherry_ice_cream')

    // ════ CONDENSED MILK · Primary: cosmopolitan ════
    event.replaceInput({},  'ubesdelight:condensed_milk_bottle', 'cosmopolitan:condensed_milk_bottle')
    event.replaceOutput({}, 'ubesdelight:condensed_milk_bottle', 'cosmopolitan:condensed_milk_bottle')

    // ════ BLUEBERRY PIE SLICE · Primary: hearthandharvest ════
    event.replaceInput({},  'delightful:blueberry_pie_slice', 'hearthandharvest:blueberry_pie_slice')
    event.replaceOutput({}, 'delightful:blueberry_pie_slice', 'hearthandharvest:blueberry_pie_slice')

    // ════ SMORE + MARSHMALLOW STICK · Primary: hearthandharvest ════
    event.replaceInput({},  'delightful:smore', 'hearthandharvest:smore')
    event.replaceOutput({}, 'delightful:smore', 'hearthandharvest:smore')
    event.replaceInput({},  'delightful:marshmallow_stick', 'hearthandharvest:marshmallow_stick')
    event.replaceOutput({}, 'delightful:marshmallow_stick', 'hearthandharvest:marshmallow_stick')
    event.shapeless('hearthandharvest:smore',            ['delightful:smore'])
    event.shapeless('hearthandharvest:marshmallow_stick',['delightful:marshmallow_stick'])

    // ════ CHEESEBURGER · Primary: delightful ════
    event.replaceInput({},  'compatdelight:cheeseburger', 'delightful:cheeseburger')
    event.replaceOutput({}, 'compatdelight:cheeseburger', 'delightful:cheeseburger')

    // ════ SINIGANG · Primary: dungeonsdelight ════
    event.replaceInput({},  'delightful:sinigang', 'dungeonsdelight:sinigang')
    event.replaceOutput({}, 'delightful:sinigang', 'dungeonsdelight:sinigang')

    // ════ PRICKLY PEAR JUICE · Primary: delightful ════
    event.replaceInput({},  'compatdelight:prickly_pear_juice', 'delightful:prickly_pear_juice')
    event.replaceOutput({}, 'compatdelight:prickly_pear_juice', 'delightful:prickly_pear_juice')

    // ════ LIME PIE · Primary: collectorsreap ════
    event.replaceInput({},  'compatdelight:lime_pie', 'collectorsreap:lime_pie')
    event.replaceOutput({}, 'compatdelight:lime_pie', 'collectorsreap:lime_pie')

    // ════ HONEY COOKIE · Primary: farmersdelight ════
    event.replaceInput({},  'compatdelight:honey_cookie', 'farmersdelight:honey_cookie')
    event.replaceOutput({}, 'compatdelight:honey_cookie', 'farmersdelight:honey_cookie')

    // ════ SPICY CURRY · Primary: culturaldelights ════
    event.replaceInput({},  'mynethersdelight:spicy_curry', 'culturaldelights:spicy_curry')
    event.replaceOutput({}, 'mynethersdelight:spicy_curry', 'culturaldelights:spicy_curry')

    // ════ GOLDEN EGG · Primary: vintagedelight ════
    event.replaceInput({},  'mynethersdelight:golden_egg', 'vintagedelight:golden_egg')
    event.replaceOutput({}, 'mynethersdelight:golden_egg', 'vintagedelight:golden_egg')

    // ════ BREAD SLICE · Primary: moredelight ════
    event.replaceInput({},  'some_assembly_required:bread_slice', 'moredelight:bread_slice')
    event.replaceOutput({}, 'some_assembly_required:bread_slice', 'moredelight:bread_slice')

    // ════ POTATO SLICES · Primary: rusticdelight ════
    event.replaceInput({},  'cosmopolitan:potato_slices',       'rusticdelight:potato_slices')
    event.replaceOutput({}, 'cosmopolitan:potato_slices',       'rusticdelight:potato_slices')
    event.replaceInput({},  'cosmopolitan:baked_potato_slices', 'rusticdelight:baked_potato_slices')
    event.replaceOutput({}, 'cosmopolitan:baked_potato_slices', 'rusticdelight:baked_potato_slices')

    // ════ PANCAKE · Primary: rusticdelight ════
    event.replaceInput({},  'supplementaries:pancake', 'rusticdelight:pancake')
    event.replaceOutput({}, 'supplementaries:pancake', 'rusticdelight:pancake')
    event.shapeless('rusticdelight:pancake', ['supplementaries:pancake'])
})
