// priority: 10
// Seafood unification
// CLAM HYBRID: Spawn mod owns the entity (3 species, patterns, sounds).
//              Collector's Reap owns the food chain.
//              Spawn clam items redirect to CR in all recipes.

ServerEvents.recipes(event => {

    // ════ CLAM HYBRID · Entity: spawn · Food: collectorsreap ════
    ;['spawn:clam','crabbersdelight:clam','crittersandcompanions:clam'].forEach(s => {
        event.replaceInput({}, s, 'collectorsreap:clam')
        event.replaceOutput({}, s, 'collectorsreap:clam')
        event.shapeless('collectorsreap:clam', [s])
    })
    // Clam meat (all secondaries → CR clam_meat)
    ;['spawn:clam_meat','crabbersdelight:raw_clam_meat',
      'spawn:cooked_clam_meat','crabbersdelight:cooked_clam_meat'].forEach(s => {
        event.replaceInput({}, s, 'collectorsreap:clam_meat')
        event.replaceOutput({}, s, 'collectorsreap:clam_meat')
    })
    // Clam chowder
    ;['spawn:clam_chowder','crabbersdelight:clam_chowder'].forEach(s => {
        event.replaceInput({}, s, 'collectorsreap:clam_chowder')
        event.replaceOutput({}, s, 'collectorsreap:clam_chowder')
    })
    // Spawn also has scallop + wedge_shell — keep as unique items, they don't duplicate CR
    // spawn:clam_spawn_egg stays as its own entity (Spawn's unique mob)

    // ════ SHRIMP · Primary: oceanic_delight (better recipes) ════
    event.replaceInput({},  'crabbersdelight:shrimp', 'oceanic_delight:shrimp')
    event.replaceOutput({}, 'crabbersdelight:shrimp', 'oceanic_delight:shrimp')
    event.shapeless('oceanic_delight:shrimp', ['crabbersdelight:shrimp'])

    // ════ SQUID + GLOW SQUID (food) · Primary: culturaldelights ════
    event.replaceInput({},  'miners_delight:squid',      'culturaldelights:squid')
    event.replaceOutput({}, 'miners_delight:squid',      'culturaldelights:squid')
    event.replaceInput({},  'miners_delight:glow_squid', 'culturaldelights:glow_squid')
    event.replaceOutput({}, 'miners_delight:glow_squid', 'culturaldelights:glow_squid')
    event.shapeless('culturaldelights:squid',      ['miners_delight:squid'])
    event.shapeless('culturaldelights:glow_squid', ['miners_delight:glow_squid'])

    // ════ TENTACLES · Primary: miners_delight ════
    event.replaceInput({},  'oceansdelight:tentacles', 'miners_delight:tentacles')
    event.replaceOutput({}, 'oceansdelight:tentacles', 'miners_delight:tentacles')

    // ════ CRAB CLAW (3-way) · Primary: friendsandfoes (best texture) ════
    ;['ecologics:crab_claw','crabbersdelight:crab_claw'].forEach(s => {
        event.replaceInput({}, s, 'friendsandfoes:crab_claw')
        event.replaceOutput({}, s, 'friendsandfoes:crab_claw')
        event.shapeless('friendsandfoes:crab_claw', [s])
    })

    // ════ CRAB MEAT · Primary: ecologics ════
    event.replaceInput({},  'compatdelight:crab_meat', 'ecologics:crab_meat')
    event.replaceOutput({}, 'compatdelight:crab_meat', 'ecologics:crab_meat')

    // ════ CATFISH · Primary: naturalist (better texture + ecosystem) ════
    event.replaceInput({},  'tide:catfish',        'naturalist:catfish')
    event.replaceOutput({}, 'tide:catfish',        'naturalist:catfish')
    event.replaceInput({},  'tide:catfish_bucket', 'naturalist:catfish_bucket')
    event.replaceOutput({}, 'tide:catfish_bucket', 'naturalist:catfish_bucket')
    event.shapeless('naturalist:catfish', ['tide:catfish'])

    // ════ PIKE · Primary: upgrade_aquatic ════
    event.replaceInput({},  'tide:pike',        'upgrade_aquatic:pike')
    event.replaceOutput({}, 'tide:pike',        'upgrade_aquatic:pike')
    event.replaceInput({},  'tide:pike_bucket', 'upgrade_aquatic:pike_bucket')
    event.replaceOutput({}, 'tide:pike_bucket', 'upgrade_aquatic:pike_bucket')
    event.shapeless('upgrade_aquatic:pike', ['tide:pike'])

    // ════ PEARL · Primary: crittersandcompanions (otter uses it) ════
    event.replaceInput({},  'crabbersdelight:pearl', 'crittersandcompanions:pearl')
    event.replaceOutput({}, 'crabbersdelight:pearl', 'crittersandcompanions:pearl')
    event.shapeless('crittersandcompanions:pearl', ['crabbersdelight:pearl'])

    // ════ SEA PICKLE CRATE · Primary: oceanic_delight ════
    event.replaceInput({},  'crabbersdelight:sea_pickle_crate', 'oceanic_delight:sea_pickle_crate')
    event.replaceOutput({}, 'crabbersdelight:sea_pickle_crate', 'oceanic_delight:sea_pickle_crate')

    // ════ SCUTE BLOCK · Primary: upgrade_aquatic ════
    event.replaceInput({},  'crabbersdelight:scute_block', 'upgrade_aquatic:scute_block')
    event.replaceOutput({}, 'crabbersdelight:scute_block', 'upgrade_aquatic:scute_block')

    // ════ COOKED FROG LEG · Primary: crabbersdelight ════
    event.replaceInput({},  'swampier_swamps:cooked_frog_leg', 'crabbersdelight:cooked_frog_leg')
    event.replaceOutput({}, 'swampier_swamps:cooked_frog_leg', 'crabbersdelight:cooked_frog_leg')
    event.shapeless('crabbersdelight:cooked_frog_leg', ['swampier_swamps:cooked_frog_leg'])
})
