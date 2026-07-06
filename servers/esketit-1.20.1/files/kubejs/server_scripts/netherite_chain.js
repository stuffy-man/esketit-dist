// priority: 5
// Netherite ingots are now forged: craft a Netherite Alloy (4 scrap + 4 gold, in esketit_metallurgy)
// then hammer it on the anvil a few times → netherite ingot. Remove the vanilla crafting shortcut
// (4 netherite scrap + 4 gold → netherite ingot) so the anvil path is the way to netherite.
ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:netherite_ingot' })
})
