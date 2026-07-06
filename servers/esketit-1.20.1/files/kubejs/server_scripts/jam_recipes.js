// priority: 5
// Replaces H&H jam recipes to require lemon as preservative (FD-inspired style).
// Original: 3 fruit + 3 sugar + jar
// New:      3 fruit + 2 sugar + 1 lemon + jar
// Runs after unify scripts (priority 10) so redirected B&C recipes are also replaced.

ServerEvents.recipes(event => {

    // Remove all existing H&H jam recipes (original + any redirected from B&C)
    const jams = [
        'hearthandharvest:apple_jam',
        'hearthandharvest:blueberry_jam',
        'hearthandharvest:cherry_jam',
        'hearthandharvest:glow_berry_jam',
        'hearthandharvest:grape_jam',
        'hearthandharvest:melon_jam',
        'hearthandharvest:raspberry_jam',
        'hearthandharvest:sweet_berry_jam',
    ]
    jams.forEach(jam => event.remove({ output: jam }))

    const jar = { item: 'hearthandharvest:jar' }
    const lemon = { item: 'fruitsdelight:lemon' }
    const sugar = { item: 'minecraft:sugar' }

    function cookingJam(fruit1, fruit2, fruit3, output) {
        event.custom({
            type: 'farmersdelight:cooking',
            ingredients: [fruit1, fruit2, fruit3, sugar, sugar, lemon],
            container: jar,
            result: { item: output },
            cookingtime: 400,
            experience: 1.0
        })
    }

    const apple   = { item: 'minecraft:apple' }
    const berry   = { item: 'hearthandharvest:blueberries' }
    const cherry  = { item: 'hearthandharvest:cherry' }
    const glow    = { item: 'minecraft:glow_berries' }
    const grape   = { item: 'hearthandharvest:red_grapes' }  // or green
    const melon   = { item: 'minecraft:melon_slice' }
    const rasp    = { item: 'hearthandharvest:raspberry' }
    const sweet   = { item: 'minecraft:sweet_berries' }

    cookingJam(apple,  apple,  apple,  'hearthandharvest:apple_jam')
    cookingJam(berry,  berry,  berry,  'hearthandharvest:blueberry_jam')
    cookingJam(cherry, cherry, cherry, 'hearthandharvest:cherry_jam')   // new recipe
    cookingJam(glow,   glow,   glow,   'hearthandharvest:glow_berry_jam')
    cookingJam(grape,  grape,  grape,  'hearthandharvest:grape_jam')
    cookingJam(melon,  melon,  melon,  'hearthandharvest:melon_jam')
    cookingJam(rasp,   rasp,   rasp,   'hearthandharvest:raspberry_jam')
    cookingJam(sweet,  sweet,  sweet,  'hearthandharvest:sweet_berry_jam')
})
