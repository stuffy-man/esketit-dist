// priority: 10
// Group 6 small duplicates — individual item pairs

ServerEvents.recipes(event => {

    // ════ JERKY · Primary: hearthandharvest ════
    event.replaceInput({},  'brewinandchewin:jerky', 'hearthandharvest:jerky')
    event.replaceOutput({}, 'brewinandchewin:jerky', 'hearthandharvest:jerky')
    event.shapeless('hearthandharvest:jerky', ['brewinandchewin:jerky'])

    // ════ CHOCOLATE BAR · Primary: neapolitan ════
    event.replaceInput({},  'hearthandharvest:chocolate_bar', 'neapolitan:chocolate_bar')
    event.replaceOutput({}, 'hearthandharvest:chocolate_bar', 'neapolitan:chocolate_bar')
    event.shapeless('neapolitan:chocolate_bar', ['hearthandharvest:chocolate_bar'])

    // ════ FRIED EGG · Primary: farmersdelight ════
    event.replaceInput({},  'incubation:fried_egg', 'farmersdelight:fried_egg')
    event.replaceOutput({}, 'incubation:fried_egg', 'farmersdelight:fried_egg')
    event.shapeless('farmersdelight:fried_egg', ['incubation:fried_egg'])
    // Scrambled eggs is unique to Incubation — keep it, just redirect the fried egg

    // ════ MILK BOTTLE · Primary: farmersdelight ════
    event.replaceInput({},  'neapolitan:milk_bottle', 'farmersdelight:milk_bottle')
    event.replaceOutput({}, 'neapolitan:milk_bottle', 'farmersdelight:milk_bottle')
    event.shapeless('farmersdelight:milk_bottle', ['neapolitan:milk_bottle'])

    // ════ MELON JUICE · Primary: farmersdelight ════
    event.replaceInput({},  'overweight_farming:melon_juice', 'farmersdelight:melon_juice')
    event.replaceOutput({}, 'overweight_farming:melon_juice', 'farmersdelight:melon_juice')
    event.shapeless('farmersdelight:melon_juice', ['overweight_farming:melon_juice'])

    // ════ SUNFLOWER SEEDS · Primary: seeddelight ════
    event.replaceInput({},  'hearthandharvest:sunflower_seeds', 'seeddelight:sunflower_seed')
    event.replaceOutput({}, 'hearthandharvest:sunflower_seeds', 'seeddelight:sunflower_seed')
    event.shapeless('seeddelight:sunflower_seed', ['hearthandharvest:sunflower_seeds'])

    // ════ SWEET BERRY JAM · Primary: hearthandharvest ════
    event.replaceInput({},  'brewinandchewin:sweet_berry_jam', 'hearthandharvest:sweet_berry_jam')
    event.replaceOutput({}, 'brewinandchewin:sweet_berry_jam', 'hearthandharvest:sweet_berry_jam')
    event.shapeless('hearthandharvest:sweet_berry_jam', ['brewinandchewin:sweet_berry_jam'])

    // ════ APPLE JELLY → H&H APPLE JAM · Primary: hearthandharvest:apple_jam ════
    // FD's apple_jelly is part of FD's cauldron system (apple_cauldron → jelly_block → jelly)
    // B&C's apple_jelly is a standalone item — redirect to H&H apple jam
    event.replaceInput({},  'brewinandchewin:apple_jelly', 'hearthandharvest:apple_jam')
    event.replaceOutput({}, 'brewinandchewin:apple_jelly', 'hearthandharvest:apple_jam')
    event.shapeless('hearthandharvest:apple_jam', ['brewinandchewin:apple_jelly'])
    // Note: fruitsdelight:apple_jelly stays — it is a different item (bottled jelly vs jam in jar)

    // ════ GLOW BERRY MARMALADE → H&H GLOW BERRY JAM ════
    event.replaceInput({},  'brewinandchewin:glow_berry_marmalade', 'hearthandharvest:glow_berry_jam')
    event.replaceOutput({}, 'brewinandchewin:glow_berry_marmalade', 'hearthandharvest:glow_berry_jam')
    event.shapeless('hearthandharvest:glow_berry_jam', ['brewinandchewin:glow_berry_marmalade'])

    // ════ MELON POPSICLE · Primary: farmersdelight ════
    event.replaceInput({},  'displaydelight:melon_popsicle', 'farmersdelight:melon_popsicle')
    event.replaceOutput({}, 'displaydelight:melon_popsicle', 'farmersdelight:melon_popsicle')
})
