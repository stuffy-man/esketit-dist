// priority: 10
// Tool and weapon unification

ServerEvents.recipes(event => {

    // ════ ROSE GOLD UNIFICATION · cosmeticarmoursmod ships its own closed loop:
    // 3 gold + 1 copper (instant table craft) -> its own rose_gold_ingot -> its own
    // nugget/block/crown/tiara/halo. That's both a visual duplicate of our proper
    // alloy-furnace -> forge chain AND an easy-mode bypass (no heating/forging needed).
    // Remove cosmeticarmoursmod's own ingot/nugget production entirely, then redirect
    // everything that consumes its ingot/nugget (block, crown, tiara, halo) onto our
    // single real esketit_metallurgy:rose_gold_ingot/nugget instead.
    event.remove({ output: 'cosmeticarmoursmod:rose_gold_ingot' })  // instant 3 gold + 1 copper shortcut, plus block->ingot and nugget->ingot
    event.remove({ output: 'cosmeticarmoursmod:rose_gold_nugget' }) // ingot->nugget conversion (redundant with our own)
    event.replaceInput({}, 'cosmeticarmoursmod:rose_gold_ingot',  'esketit_metallurgy:rose_gold_ingot')
    event.replaceInput({}, 'cosmeticarmoursmod:rose_gold_nugget', 'esketit_metallurgy:rose_gold_nugget')

    // cosmeticweaponsmod's own rose-gold tools/weapons (sword, axe, battleaxe, knife) are
    // plain table-crafts with no quality/stats — pure duplicates of esketit_metallurgy's
    // properly-forged rose gold tools. Remove them outright rather than fix their ingredient.
    ;['rose_gold_sword', 'rose_gold_axe', 'rose_gold_battleaxe', 'rose_gold_knife'].forEach(id => {
        event.remove({ output: `cosmeticweaponsmod:${id}` })
    })
    // battleaxe/knife reclaimed skins have no esketit_metallurgy equivalent to rebase onto —
    // remove them too (left as-is, their "base" would otherwise resolve to nothing, same
    // missing-ingredient-becomes-free-craft bug as the original sword exploit).
    event.remove({ output: 'cosmeticweaponsmod:rose_gold_battleaxe_reclaimed' })
    event.remove({ output: 'cosmeticweaponsmod:rose_gold_knife_reclaimed' })

    // sword/axe reclaimed skins: keep them, but rebase the smithing transform onto our real
    // (properly forged) rose gold sword/axe instead of the cosmetic ones just removed above.
    event.replaceInput({}, 'cosmeticweaponsmod:rose_gold_sword', 'esketit_metallurgy:rose_gold_sword')
    event.replaceInput({}, 'cosmeticweaponsmod:rose_gold_axe',   'esketit_metallurgy:rose_gold_axe')

    // ════ COPPER TOOLS · Primary: esketit_metallurgy (forged, quality) ════
    // Caverns & Chasms adds plain crafted copper tools (+ exposed/weathered/oxidized/waxed skins) —
    // pure duplicates of our forged copper tier that would let players skip the forging progression
    // at the copper step. Remove every one of their crafting recipes (also hidden from JEI in
    // client_scripts/hide_duplicates.js). Our copper is forge-only, so it stays the only copper tools.
    ;['', 'exposed_', 'weathered_', 'oxidized_', 'waxed_', 'waxed_exposed_', 'waxed_weathered_', 'waxed_oxidized_'].forEach(state => {
        ['pickaxe', 'axe', 'shovel', 'hoe', 'sword'].forEach(tool => {
            event.remove({ output: `caverns_and_chasms:${state}copper_${tool}` })
        })
    })

    // ════ KNIVES · Primary: farmersdelight for cooking knives ════
    // cosmeticweaponsmod adds cosmetic versions of the same knives — redirect to FD
    // Note: cosmeticweaponsmod has no flint_knife (FD's flint_knife is unique, no redirect needed)
    ;['iron','golden','diamond','netherite'].forEach(mat => {
        event.replaceInput({},  `cosmeticweaponsmod:${mat}_knife`, `farmersdelight:${mat}_knife`)
        event.replaceOutput({}, `cosmeticweaponsmod:${mat}_knife`, `farmersdelight:${mat}_knife`)
    })
    // Stone + wooden knife → moredelight (FD doesn't have these tiers)
    event.replaceInput({},  'cosmeticweaponsmod:stone_knife',  'moredelight:stone_knife')
    event.replaceOutput({}, 'cosmeticweaponsmod:stone_knife',  'moredelight:stone_knife')
    event.replaceInput({},  'cosmeticweaponsmod:wooden_knife', 'moredelight:wooden_knife')
    event.replaceOutput({}, 'cosmeticweaponsmod:wooden_knife', 'moredelight:wooden_knife')
    // Specialty knives → delightful
    event.replaceInput({},  'cosmeticweaponsmod:bone_knife',            'delightful:bone_knife')
    event.replaceOutput({}, 'cosmeticweaponsmod:bone_knife',            'delightful:bone_knife')
    // rose_gold_knife: removed above (cosmeticweaponsmod's whole rose-gold weapon line is
    // gone now), so there's nothing left to redirect to delightful:rose_gold_knife here.
    event.replaceInput({},  'cosmeticweaponsmod:gilded_netherite_knife','delightful:gilded_netherite_knife')
    event.replaceOutput({}, 'cosmeticweaponsmod:gilded_netherite_knife','delightful:gilded_netherite_knife')
    // Silver knife — abnormals_delight has it, delightful has it → delightful
    event.replaceInput({},  'abnormals_delight:silver_knife', 'delightful:silver_knife')
    event.replaceOutput({}, 'abnormals_delight:silver_knife', 'delightful:silver_knife')

    // ════ DUNGEON KNIVES · Primary: dungeonsdelight ════
    // delightful also adds these dungeon-tier knives — redirect to dungeonsdelight
    ;['ironwood','knightmetal','steeleaf','fiery'].forEach(mat => {
        event.replaceInput({},  `delightful:${mat}_knife`, `dungeonsdelight:${mat}_knife`)
        event.replaceOutput({}, `delightful:${mat}_knife`, `dungeonsdelight:${mat}_knife`)
    })
    event.replaceInput({},  'delightful:fiery_knife', 'dungeonsdelight:fiery_knife')
    event.replaceOutput({}, 'delightful:fiery_knife', 'dungeonsdelight:fiery_knife')

    // ════ CLEAVERS · Primary: hearthandharvest ════
    // dungeonsdelight adds dungeon versions of cleavers — redirect to H&H
    ;['flint','iron','golden','diamond','netherite'].forEach(mat => {
        event.replaceInput({},  `dungeonsdelight:${mat}_cleaver`, `hearthandharvest:${mat}_cleaver`)
        event.replaceOutput({}, `dungeonsdelight:${mat}_cleaver`, `hearthandharvest:${mat}_cleaver`)
    })

    // ════ SINIGANG · Primary: dungeonsdelight ════
    event.replaceInput({},  'delightful:sinigang', 'dungeonsdelight:sinigang')
    event.replaceOutput({}, 'delightful:sinigang', 'dungeonsdelight:sinigang')

    // ════ BLOODY MARY · Primary: brewinandchewin ════
    event.replaceInput({},  'dungeonsdelight:bloody_mary', 'brewinandchewin:bloody_mary')
    event.replaceOutput({}, 'dungeonsdelight:bloody_mary', 'brewinandchewin:bloody_mary')
})
