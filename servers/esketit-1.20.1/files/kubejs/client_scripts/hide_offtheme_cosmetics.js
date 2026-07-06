// priority: 5
// Hide the off-theme cosmetics (see server_scripts/remove_offtheme_cosmetics.js) from JEI.

JEIEvents.hideItems(event => {
    const patterns = [
        /^cosmetic(armoursmod|_armour):(cat|fox|bunny)_ears_/,
        /^cosmetic(armoursmod|_armour):(fox|bunny)_tail_/,
        /^cosmetic(armoursmod|_armour):[a-z_]*(headphones|earmuffs)/,
        /^cosmetic(armoursmod|_armour):astronaut_/,
        /^cosmetic(armoursmod|_armour):(christmas|[a-z_]*claus_attire|[a-z_]*elf_attire|[a-z_]*elf_hat|[a-z_]*_sweater|[a-z_]*pudding_beanie)/,
        /^cosmetic(armoursmod|_armour):warden_mask/,
        /^cosmetic(armoursmod|_armour):sculked_/,
        /^cosmetic(armoursmod|_armour):antlers_/,
        /^cosmetic(armoursmod|_armour):sword_sheath/,
    ]
    patterns.forEach(rx => event.hide(rx))

    event.hide('accents:sheathed_katana')
    event.hide('accents:christmas_hat')
})
