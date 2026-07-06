// priority: 5
// Remove off-theme cosmetics (Wild West / Japan pack): strips their crafting recipes so they can't
// be made. Items stay registered (can't unregister without editing the mod) but are uncraftable +
// hidden in JEI (see client_scripts/hide_offtheme_cosmetics.js). Reversible: delete this file.

ServerEvents.recipes(event => {
    const patterns = [
        // animal ears & tails
        /^cosmetic(armoursmod|_armour):(cat|fox|bunny)_ears_/,
        /^cosmetic(armoursmod|_armour):(fox|bunny)_tail_/,
        // headphones & earmuffs (incl. wooden)
        /^cosmetic(armoursmod|_armour):[a-z_]*(headphones|earmuffs)/,
        // astronaut set
        /^cosmetic(armoursmod|_armour):astronaut_/,
        // new year / christmas attire
        /^cosmetic(armoursmod|_armour):(christmas|[a-z_]*claus_attire|[a-z_]*elf_attire|[a-z_]*elf_hat|[a-z_]*_sweater|[a-z_]*pudding_beanie)/,
        // warden mask + overgrown (sculked) armor
        /^cosmetic(armoursmod|_armour):warden_mask/,
        /^cosmetic(armoursmod|_armour):sculked_/,
        // antlers
        /^cosmetic(armoursmod|_armour):antlers_/,
        // sword sheath
        /^cosmetic(armoursmod|_armour):sword_sheath/,
    ]
    patterns.forEach(rx => event.remove({ output: rx }))

    // accents extras
    event.remove({ output: 'accents:sheathed_katana' })
    event.remove({ output: 'accents:christmas_hat' })
})
