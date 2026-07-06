// priority: 10
// Food ingredient unification — raw crops and base ingredients

ServerEvents.recipes(event => {

    // ════ SALT (5-way) · Primary: salt mod ════
    ;['hearthandharvest:salt','spelunkery:salt','vintagedelight:salt','compatdelight:salt'].forEach(s => {
        event.replaceInput({}, s, 'salt:salt')
        event.replaceOutput({}, s, 'salt:salt')
    })
    ;['spelunkery:salt_block','vintagedelight:salt_block'].forEach(s => {
        event.replaceInput({}, s, 'salt:salt_block')
        event.replaceOutput({}, s, 'salt:salt_block')
    })
    event.replaceInput({}, 'spelunkery:salt_lamp', 'salt:salt_lamp')
    event.replaceOutput({}, 'spelunkery:salt_lamp', 'salt:salt_lamp')
    event.shapeless('salt:salt', ['hearthandharvest:salt'])
    event.shapeless('salt:salt', ['spelunkery:salt'])
    event.shapeless('salt:salt', ['vintagedelight:salt'])
    // Ore/lamps/dust/bricks intentionally left alone — only the base salt item is unified
    // in crafting. World generation of salt ore is handled separately in remove_duplicate_worldgen.js.
    // spelunkery's separate rock_salt crystal (different concept from plain "salt" above)
    event.replaceInput({},  'spelunkery:rock_salt', 'salt:raw_rock_salt')
    event.replaceOutput({}, 'spelunkery:rock_salt', 'salt:raw_rock_salt')
    event.replaceInput({},  'spelunkery:rock_salt_block', 'salt:raw_rock_salt_block')
    event.replaceOutput({}, 'spelunkery:rock_salt_block', 'salt:raw_rock_salt_block')
    event.shapeless('salt:raw_rock_salt', ['spelunkery:rock_salt'])

    // ════ CUCUMBER (3-way) · Primary: culturaldelights ════
    ;['vintagedelight:cucumber','compatdelight:cucumber'].forEach(s => {
        event.replaceInput({}, s, 'culturaldelights:cucumber')
        event.replaceOutput({}, s, 'culturaldelights:cucumber')
    })
    event.replaceInput({},  'vintagedelight:cucumber_crate', 'culturaldelights:cucumber_crate')
    event.replaceOutput({}, 'vintagedelight:cucumber_crate', 'culturaldelights:cucumber_crate')
    ;['vintagedelight:cucumber_seeds','compatdelight:cucumber_seeds'].forEach(s => {
        event.replaceInput({}, s, 'culturaldelights:cucumber_seeds')
        event.replaceOutput({}, s, 'culturaldelights:cucumber_seeds')
    })
    event.replaceInput({},  'compatdelight:cut_cucumber', 'culturaldelights:cut_cucumber')
    event.replaceOutput({}, 'compatdelight:cut_cucumber', 'culturaldelights:cut_cucumber')
    event.replaceInput({},  'vintagedelight:wild_cucumbers', 'culturaldelights:wild_cucumbers')
    event.replaceOutput({}, 'vintagedelight:wild_cucumbers', 'culturaldelights:wild_cucumbers')
    event.shapeless('culturaldelights:cucumber', ['vintagedelight:cucumber'])

    // ════ EGGPLANT (2-way) · Primary: culturaldelights ════
    // Note: vintagedelight has NO eggplant content at all — only compatdelight + spelunkery (mineral, skip) duplicate
    event.replaceInput({},  'compatdelight:eggplant', 'culturaldelights:eggplant')
    event.replaceOutput({}, 'compatdelight:eggplant', 'culturaldelights:eggplant')
    event.replaceInput({},  'compatdelight:cut_eggplant', 'culturaldelights:cut_eggplant')
    event.replaceOutput({}, 'compatdelight:cut_eggplant', 'culturaldelights:cut_eggplant')

    // ════ PICKLE · Primary: culturaldelights ════
    // Note: vintagedelight has no pickle_crate — only culturaldelights does
    event.replaceInput({},  'vintagedelight:pickle', 'culturaldelights:pickle')
    event.replaceOutput({}, 'vintagedelight:pickle', 'culturaldelights:pickle')

    // ════ COFFEE + BEANS · Primary: farmersrespite ════
    event.replaceInput({},  'rusticdelight:coffee',       'farmersrespite:coffee')
    event.replaceOutput({}, 'rusticdelight:coffee',       'farmersrespite:coffee')
    event.replaceInput({},  'rusticdelight:coffee_beans', 'farmersrespite:coffee_beans')
    event.replaceOutput({}, 'rusticdelight:coffee_beans', 'farmersrespite:coffee_beans')
    event.shapeless('farmersrespite:coffee_beans', ['rusticdelight:coffee_beans'])

    // ════ COCONUT · Primary: ecologics ════
    event.replaceInput({},  'crabbersdelight:coconut', 'ecologics:coconut')
    event.replaceOutput({}, 'crabbersdelight:coconut', 'ecologics:coconut')
    event.shapeless('ecologics:coconut', ['crabbersdelight:coconut'])

    // ════ COCONUT MILK · Primary: crabbersdelight ════
    event.replaceInput({},  'compatdelight:coconut_milk', 'crabbersdelight:coconut_milk')
    event.replaceOutput({}, 'compatdelight:coconut_milk', 'crabbersdelight:coconut_milk')

    // ════ PEANUT + CRATE · Primary: hearthandharvest ════
    event.replaceInput({},  'vintagedelight:peanut',       'hearthandharvest:peanut')
    event.replaceOutput({}, 'vintagedelight:peanut',       'hearthandharvest:peanut')
    event.replaceInput({},  'vintagedelight:peanut_crate', 'hearthandharvest:peanut_crate')
    event.replaceOutput({}, 'vintagedelight:peanut_crate', 'hearthandharvest:peanut_crate')
    event.replaceInput({},  'vintagedelight:wild_peanuts', 'hearthandharvest:wild_peanuts')
    event.replaceOutput({}, 'vintagedelight:wild_peanuts', 'hearthandharvest:wild_peanuts')
    // Note: vintagedelight has no peanut_butter — H&H's is unique
    event.shapeless('hearthandharvest:peanut', ['vintagedelight:peanut'])

    // ════ COTTON SEEDS + WILD COTTON · Primary: hearthandharvest ════
    event.replaceInput({},  'rusticdelight:cotton_seeds', 'hearthandharvest:cotton_seeds')
    event.replaceOutput({}, 'rusticdelight:cotton_seeds', 'hearthandharvest:cotton_seeds')
    event.replaceInput({},  'rusticdelight:wild_cotton',  'hearthandharvest:wild_cotton')
    event.replaceOutput({}, 'rusticdelight:wild_cotton',  'hearthandharvest:wild_cotton')

    // ════ GINGER · Primary: culturaldelights ════
    event.replaceInput({},  'ubesdelight:ginger', 'culturaldelights:ginger')
    event.replaceOutput({}, 'ubesdelight:ginger', 'culturaldelights:ginger')

    // ════ GARLIC · Primary: ubesdelight (has garlic_chop, garlic_crate, wild_garlic) ════
    event.replaceInput({},  'compatdelight:garlic', 'ubesdelight:garlic')
    event.replaceOutput({}, 'compatdelight:garlic', 'ubesdelight:garlic')
    event.replaceInput({},  'compatdelight:cut_garlic', 'ubesdelight:garlic_chop')
    event.replaceOutput({}, 'compatdelight:cut_garlic', 'ubesdelight:garlic_chop')

    // ════ CARAMEL · Primary: hearthandharvest ════
    event.replaceInput({},  'compatdelight:caramel', 'hearthandharvest:caramel')
    event.replaceOutput({}, 'compatdelight:caramel', 'hearthandharvest:caramel')

    // ════ ACORN · Primary: seeddelight ════
    event.replaceInput({},  'delightful:acorn', 'seeddelight:acorn')
    event.replaceOutput({}, 'delightful:acorn', 'seeddelight:acorn')
    event.shapeless('seeddelight:acorn', ['delightful:acorn'])

    // ════ BATTER · Primary: hearthandharvest ════
    event.replaceInput({},  'rusticdelight:batter', 'hearthandharvest:batter')
    event.replaceOutput({}, 'rusticdelight:batter', 'hearthandharvest:batter')

    // ════ LEMON JUICE · Primary: fruitsdelight ════
    event.replaceInput({},  'compatdelight:lemon_juice', 'fruitsdelight:lemon_juice')
    event.replaceOutput({}, 'compatdelight:lemon_juice', 'fruitsdelight:lemon_juice')

    // ════ PINEAPPLE JUICE · Primary: pineapple_delight ════
    event.replaceInput({},  'compatdelight:pineapple_juice', 'pineapple_delight:pineapple_juice')
    event.replaceOutput({}, 'compatdelight:pineapple_juice', 'pineapple_delight:pineapple_juice')

    // ════ PINEAPPLE SLICE · Primary: fruitsdelight ════
    event.replaceInput({},  'compatdelight:pineapple_slice', 'fruitsdelight:pineapple_slice')
    event.replaceOutput({}, 'compatdelight:pineapple_slice', 'fruitsdelight:pineapple_slice')

    // ════ SAP BUCKET · Primary: hearthandharvest ════
    event.replaceInput({},  'create_central_kitchen:sap_bucket', 'hearthandharvest:sap_bucket')
    event.replaceOutput({}, 'create_central_kitchen:sap_bucket', 'hearthandharvest:sap_bucket')
})
