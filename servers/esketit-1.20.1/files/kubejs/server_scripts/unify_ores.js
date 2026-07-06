// priority: 5
// Ore-tag unification for tin & silver.
// BUG: esketit_metallurgy's tin/silver ore blocks were never added to #forge:ores/tin|silver, so
// Large Ore Deposits (which places whatever is in those tags) was generating Caverns & Chasms' ore
// instead of ours. Rebuild the tags to contain ONLY our ore, so LOD generates ours. Foreign ore
// GENERATION is disabled in config/adlods-common.toml (disabledFeatures); the blocks are hidden from
// JEI in client_scripts/hide_duplicates.js.

const OUR_TIN = ['esketit_metallurgy:tin_ore', 'esketit_metallurgy:deepslate_tin_ore']
const OUR_SILVER = ['esketit_metallurgy:silver_ore', 'esketit_metallurgy:deepslate_silver_ore']

function retag(event) {
    event.removeAll('forge:ores/tin')
    event.add('forge:ores/tin', OUR_TIN)
    event.removeAll('forge:ores/silver')
    event.add('forge:ores/silver', OUR_SILVER)
}

ServerEvents.tags('block', event => retag(event))
ServerEvents.tags('item', event => retag(event))
