// priority: 10
// Woodworks adds wood-variant chests (oak/spruce/birch/jungle/acacia/dark_oak/mangrove/
// cherry/crimson/warped/bamboo_closet) and correctly tags them into forge:chests/wooden
// (via Blueprint's blueprint:wooden_chests -> forge:chests/wooden bridge). boatload's own
// chest boat recipes already use that tag and work fine.
//
// But vanilla's chest_minecart, and several mods' own "boat + chest = chest boat" recipes,
// hardcode the exact item "minecraft:chest" instead of the tag — so none of Woodworks'
// chest variants can be used to craft them. Rebuild those specific recipes on the tag.

ServerEvents.recipes(event => {

    const chestTag = { tag: 'forge:chests/wooden' }

    // [other ingredient, output] — every recipe found across installed mods that hardcoded
    // minecraft:chest instead of forge:chests/wooden.
    var chestCombos = [
        ['minecraft:minecart', 'minecraft:chest_minecart'],
        ['crabbersdelight:palm_boat', 'crabbersdelight:palm_chest_boat'],
        ['deeperdarker:bloom_boat', 'deeperdarker:bloom_chest_boat'],
        ['deeperdarker:echo_boat', 'deeperdarker:echo_chest_boat'],
        ['dungeonsdelight:wormwood_boat', 'dungeonsdelight:wormwood_chest_boat'],
        ['ecologics:azalea_boat', 'ecologics:azalea_chest_boat'],
        ['ecologics:coconut_boat', 'ecologics:coconut_chest_boat'],
        ['ecologics:flowering_azalea_boat', 'ecologics:flowering_azalea_chest_boat'],
        ['ecologics:walnut_boat', 'ecologics:walnut_chest_boat'],
        ['minecraft:pale_oak_boat', 'minecraft:pale_oak_chest_boat'],
    ]

    chestCombos.forEach(function(pair) {
        var other = pair[0]
        var output = pair[1]
        event.remove({ output: output })
        event.shapeless(output, [chestTag, { item: other }])
    })

    // meds_and_herbs' distillery apparatus also hardcodes minecraft:chest in its shape.
    event.remove({ output: 'meds_and_herbs:distillery_apparatus' })
    event.shaped('meds_and_herbs:distillery_apparatus', ['012', '3 5', '678'], {
        0: 'meds_and_herbs:quartz_flask',
        1: 'meds_and_herbs:glass_tube',
        2: 'meds_and_herbs:quartz_flask',
        3: { tag: 'minecraft:candles' },
        5: 'meds_and_herbs:cotton_filter',
        6: { tag: 'minecraft:logs' },
        7: chestTag,
        8: { tag: 'minecraft:logs' },
    })

    // re_deco's per-wood "drawers" and "side_table" furniture each hardcode minecraft:chest
    // in the middle, even though the rest of the recipe is already wood-specific (slabs) —
    // so an acacia table still demanded a plain oak chest. Rebuild on the tag for all 11.
    var redecoWoods = [
        { wood: 'acacia',   slab: 'minecraft:acacia_slab',   leg: 'minecraft:stick' },
        { wood: 'bamboo',   slab: 'minecraft:bamboo_slab',   leg: 'minecraft:bamboo' },
        { wood: 'birch',    slab: 'minecraft:birch_slab',    leg: 'minecraft:stick' },
        { wood: 'cherry',   slab: 'minecraft:cherry_slab',   leg: 'minecraft:stick' },
        { wood: 'crimson',  slab: 'minecraft:crimson_slab',  leg: 'minecraft:stick' },
        { wood: 'dark_oak', slab: 'minecraft:dark_oak_slab', leg: 'minecraft:stick' },
        { wood: 'jungle',   slab: 'minecraft:jungle_slab',   leg: 'minecraft:stick' },
        { wood: 'mangrove', slab: 'minecraft:mangrove_slab', leg: 'minecraft:stick' },
        { wood: 'oak',      slab: 'minecraft:oak_slab',      leg: 'minecraft:stick' },
        { wood: 'spruce',   slab: 'minecraft:spruce_slab',   leg: 'minecraft:stick' },
        { wood: 'warped',   slab: 'minecraft:warped_slab',   leg: 'minecraft:stick' },
    ]
    redecoWoods.forEach(function(w) {
        var drawersId = 'redeco:' + w.wood + '_drawers'
        event.remove({ output: drawersId })
        event.shaped(drawersId, ['zzz', 'zyz', 'x x'], { z: w.slab, y: chestTag, x: w.leg })

        var tableId = 'redeco:' + w.wood + '_side_table'
        event.remove({ output: tableId })
        event.shaped(tableId, ['xyx', 'z z', 'z z'], { x: w.slab, y: chestTag, z: w.leg })
    })

    // trotting_wagons' wagons also hardcode minecraft:chest.
    event.remove({ output: 'trotting_wagons:conestoga_wagon' })
    event.shaped(Item.of('trotting_wagons:conestoga_wagon', '{color:0}'), ['SSS', 'PCP', 'WWW'], {
        P: 'minecraft:spruce_planks',
        C: chestTag,
        S: 'minecraft:white_wool',
        W: 'trotting_wagons:wheel',
    })
    event.remove({ output: 'trotting_wagons:royal_wagon' })
    event.shaped(Item.of('trotting_wagons:royal_wagon', '{color:0}'), ['LLL', 'SCS', 'WWW'], {
        C: chestTag,
        L: 'minecraft:stripped_spruce_log',
        S: 'minecraft:white_wool',
        W: 'trotting_wagons:wheel',
    })

    // NOTE: vanilla's trapped_chest (chest + tripwire_hook) is left as-is — Woodworks
    // already ships its own trapped_<wood>_chest recipe per variant, so there's no gap.
    // NOTE: Mekanism's sawing recipe for deeperdarker's echo_chest_boat always outputs a
    // plain minecraft:chest as the secondary product — that's a disassembly OUTPUT, not an
    // input restriction, so it doesn't block using any chest variant to begin with.
})
