// priority: 10
// Food item unification - full replacement mode
// Secondary items are redirected to primary at the recipe level.
// Conversion recipes let players exchange any existing secondary items.

ServerEvents.recipes(event => {

    // ════════════════════════════════════════════════════════════
    //  BLUEBERRY  ·  Primary: Hearth & Harvest
    //  FD unique items kept: blueberry_jelly, blueberry_jello,
    //  blueberry_custard (all will use H&H blueberries as input)
    // ════════════════════════════════════════════════════════════
    event.replaceInput({},  'fruitsdelight:blueberry',       'hearthandharvest:blueberries')
    event.replaceInput({},  'fruitsdelight:blueberry_crate', 'hearthandharvest:blueberry_crate')
    // Redirect duplicate processed items to H&H versions
    event.replaceOutput({}, 'fruitsdelight:blueberry_muffin', 'hearthandharvest:blueberry_muffin')
    event.replaceOutput({}, 'fruitsdelight:blueberry_crate',  'hearthandharvest:blueberry_crate')
    // Conversion: any existing FD blueberries in inventory/chests → H&H
    event.shapeless('hearthandharvest:blueberries', ['fruitsdelight:blueberry'])

    // ════════════════════════════════════════════════════════════
    //  PINEAPPLE  ·  Primary: Pineapple Delight
    //  FD unique items kept: pineapple_jelly, pineapple_jello,
    //  pineapple_marinated_pork, pineapple_slice
    // ════════════════════════════════════════════════════════════
    event.replaceInput({},  'fruitsdelight:pineapple',       'pineapple_delight:pineapple')
    event.replaceInput({},  'fruitsdelight:pineapple_crate', 'pineapple_delight:pineapple_crate')
    event.replaceOutput({}, 'fruitsdelight:pineapple',       'pineapple_delight:pineapple')
    // Redirect duplicate processed items to PD versions
    event.replaceOutput({}, 'fruitsdelight:pineapple_fried_rice', 'pineapple_delight:pineapple_fried_rice')
    event.replaceOutput({}, 'fruitsdelight:pineapple_pie',        'pineapple_delight:pineapple_pie')
    event.replaceOutput({}, 'fruitsdelight:pineapple_crate',      'pineapple_delight:pineapple_crate')
    event.shapeless('pineapple_delight:pineapple', ['fruitsdelight:pineapple'])
    // Wild pineapple (sprout/sapling form) → PD's wild crop item, not the regular fruit
    event.replaceInput({},  'fruitsdelight:wild_pineapple', 'pineapple_delight:pineapple_wild_crop')
    event.replaceOutput({}, 'fruitsdelight:wild_pineapple', 'pineapple_delight:pineapple_wild_crop')
    event.shapeless('pineapple_delight:pineapple_wild_crop', ['fruitsdelight:wild_pineapple'])

    // ════════════════════════════════════════════════════════════
    //  CORN  ·  Primary: Haunted Harvest
    //  Sub-duplicates tortilla + creamed_corn → Corn Delight versions
    //  CD unique items kept: corn_dog, nachos, corn_soup, boiled_corn, etc.
    //  Cultural Delights unique items kept: elote, empanada, taco, etc.
    // ════════════════════════════════════════════════════════════
    // Replace the raw corn ingredient from both secondary mods
    event.replaceInput({},  'corn_delight:corn',        'hauntedharvest:corn')
    event.replaceInput({},  'culturaldelights:corn_cob', 'hauntedharvest:corn')
    event.replaceOutput({}, 'corn_delight:corn',        'hauntedharvest:corn')
    event.replaceOutput({}, 'culturaldelights:corn_cob', 'hauntedharvest:corn')
    event.replaceOutput({}, 'corn_delight:wild_corn',   'hauntedharvest:corn')
    event.replaceOutput({}, 'culturaldelights:wild_corn','hauntedharvest:corn')
    // Kernels: merge both secondary variants into HH kernels
    event.replaceInput({},  'corn_delight:corn_kernel_bag',   'hauntedharvest:kernels')
    event.replaceInput({},  'culturaldelights:corn_kernels',  'hauntedharvest:kernels')
    event.replaceOutput({}, 'corn_delight:corn_kernel_bag',   'hauntedharvest:kernels')
    event.replaceOutput({}, 'culturaldelights:corn_kernels',  'hauntedharvest:kernels')
    // Redirect duplicate processed items to HH versions
    event.replaceOutput({}, 'corn_delight:popcorn',   'hauntedharvest:popcorn')
    event.replaceOutput({}, 'corn_delight:cornbread', 'hauntedharvest:cornbread')
    event.replaceOutput({}, 'corn_delight:corn_crate','hauntedharvest:corn_crate')
    // Tortilla + creamed_corn: Corn Delight versions are canonical
    event.replaceInput({},  'culturaldelights:tortilla',      'corn_delight:tortilla')
    event.replaceOutput({}, 'culturaldelights:tortilla',      'corn_delight:tortilla')
    event.replaceInput({},  'culturaldelights:tortilla_chips','corn_delight:tortilla_chip')
    event.replaceOutput({}, 'culturaldelights:tortilla_chips','corn_delight:tortilla_chip')
    event.replaceInput({},  'culturaldelights:creamed_corn',  'corn_delight:creamed_corn')
    event.replaceOutput({}, 'culturaldelights:creamed_corn',  'corn_delight:creamed_corn')
    // Conversion recipes
    event.shapeless('hauntedharvest:corn', ['corn_delight:corn'])
    event.shapeless('hauntedharvest:corn', ['culturaldelights:corn_cob'])

    // ════════════════════════════════════════════════════════════
    //  CHERRY  ·  Primary: Hearth & Harvest
    //  SD unique items kept: cherry_ice_cream, cherry_pork, milk_cherry_mouss
    // ════════════════════════════════════════════════════════════
    event.replaceInput({},  'seeddelight:cherry', 'hearthandharvest:cherry')
    event.replaceOutput({}, 'seeddelight:cherry', 'hearthandharvest:cherry')
    event.replaceOutput({}, 'seeddelight:cherry_crate', 'hearthandharvest:cherry_crate')
    event.replaceOutput({}, 'seeddelight:cherry_wine',  'hearthandharvest:cherry_wine')
    event.shapeless('hearthandharvest:cherry', ['seeddelight:cherry'])

    // ════════════════════════════════════════════════════════════
    //  ROSE HIPS  ·  Primary: Farmer's Respite
    //  SD unique items kept: rosehip_jam_jar, rosehip_jam_sandwich
    // ════════════════════════════════════════════════════════════
    event.replaceInput({},  'seeddelight:rosehip', 'farmersrespite:rose_hips')
    event.replaceOutput({}, 'seeddelight:rosehip', 'farmersrespite:rose_hips')
    event.replaceOutput({}, 'seeddelight:rosehip_tea', 'farmersrespite:rose_hip_tea')
    event.replaceOutput({}, 'seeddelight:rosehip_pie', 'farmersrespite:rose_hip_pie')
    event.shapeless('farmersrespite:rose_hips', ['seeddelight:rosehip'])
})
