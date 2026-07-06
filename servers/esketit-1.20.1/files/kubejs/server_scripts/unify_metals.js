// priority: 5
// Metal material unification — SAFE mode.
// esketit_metallurgy is the single primary for tin / silver / bronze / steel / rose gold.
// Foreign duplicate ingots/nuggets/raw/blocks are hidden from JEI (client_scripts/hide_duplicates.js)
// and given a 1:1 conversion into ours here so players can consolidate. We DO NOT touch the other
// mods' own recipes — they stay tag-interchangeable via #forge:*, so their content still works.
// (The stale unify_metals.js.disabled targeted create_ironworks, which is no longer in the pack.)

ServerEvents.recipes(event => {
    // from -> our equivalent (1 to 1)
    const conversions = [
        // ── TIN · Caverns & Chasms ──
        ['caverns_and_chasms:tin_ingot',      'esketit_metallurgy:tin_ingot'],
        ['caverns_and_chasms:tin_nugget',     'esketit_metallurgy:tin_nugget'],
        ['caverns_and_chasms:raw_tin',        'esketit_metallurgy:raw_tin'],
        ['caverns_and_chasms:tin_block',      'esketit_metallurgy:tin_block'],
        ['caverns_and_chasms:raw_tin_block',  'esketit_metallurgy:raw_tin_block'],
        // ── SILVER · Caverns & Chasms ──
        ['caverns_and_chasms:silver_ingot',     'esketit_metallurgy:silver_ingot'],
        ['caverns_and_chasms:silver_nugget',    'esketit_metallurgy:silver_nugget'],
        ['caverns_and_chasms:raw_silver',       'esketit_metallurgy:raw_silver'],
        ['caverns_and_chasms:silver_block',     'esketit_metallurgy:silver_block'],
        ['caverns_and_chasms:raw_silver_block', 'esketit_metallurgy:raw_silver_block'],
        // ── BRONZE · Create: Big Cannons ──
        ['createbigcannons:bronze_ingot', 'esketit_metallurgy:bronze_ingot'],
        ['createbigcannons:bronze_block', 'esketit_metallurgy:bronze_block'],
        // ── STEEL · Create: Big Cannons + Flint'n'Powder ──
        ['createbigcannons:steel_ingot', 'esketit_metallurgy:steel_ingot'],
        ['createbigcannons:steel_block', 'esketit_metallurgy:steel_block'],
        ['flintnpowder:steel_ingot',  'esketit_metallurgy:steel_ingot'],
        ['flintnpowder:steel_nugget', 'esketit_metallurgy:steel_nugget'],
        ['flintnpowder:steel_block',  'esketit_metallurgy:steel_block'],
        // ── ROSE GOLD · cosmeticarmoursmod (ingot/nugget already redirected in unify_tools.js) ──
        ['cosmeticarmoursmod:rose_gold_block', 'esketit_metallurgy:rose_gold_block'],
    ]

    conversions.forEach(([from, to]) => {
        event.shapeless(to, [from])
            .id('esketit_metallurgy:unify/' + from.replace(/[:\/]/g, '_'))
    })
})
