// priority: 10
// Shared forge tags for cross-mod compatibility
// Diet food group tags for raw crops (processed foods are auto-classified
// by Diet's generateGroupsForEmptyItems setting)

ServerEvents.tags('item', event => {

    // ── Shared forge ingredient tags ─────────────────────────────
    // These allow any recipe using the tag to accept either mod's item.
    // The unify_food.js recipe replacements are the primary mechanism;
    // these tags serve as a safety net for any recipe that checks tags directly.
    event.add('forge:fruits/blueberry', ['hearthandharvest:blueberries', 'fruitsdelight:blueberry'])
    event.add('forge:fruits/pineapple',  ['pineapple_delight:pineapple',  'fruitsdelight:pineapple'])
    event.add('forge:fruits/cherry',     ['hearthandharvest:cherry',      'seeddelight:cherry'])
    event.add('forge:fruits/raspberry',  ['hearthandharvest:raspberry'])
    event.add('forge:crops/corn',        ['hauntedharvest:corn', 'corn_delight:corn', 'culturaldelights:corn_cob'])
    event.add('forge:crops/rose_hips',   ['farmersrespite:rose_hips', 'seeddelight:rosehip'])
    event.add('forge:fruits/fig',        ['fruitsdelight:fig'])
    event.add('forge:fruits/mango',      ['fruitsdelight:mango'])
    event.add('forge:fruits/lemon',      ['fruitsdelight:lemon'])
    event.add('forge:fruits/orange',     ['fruitsdelight:orange'])
    event.add('forge:fruits/peach',      ['fruitsdelight:peach'])
    event.add('forge:fruits/kiwi',       ['fruitsdelight:kiwi'])
    event.add('forge:fruits/strawberry', ['neapolitan:strawberries', 'neapolitan:white_strawberries'])
    event.add('forge:fruits/banana',     ['neapolitan:banana'])
    event.add('forge:fruits/lime',       ['collectorsreap:lime'])
    event.add('forge:fruits/pomegranate',['collectorsreap:pomegranate'])
    event.add('forge:nuts/walnut',       ['ecologics:walnut'])
    event.add('forge:nuts/peanut',       ['hearthandharvest:peanut'])

    // ── Diet: Fruits ─────────────────────────────────────────────
    // Raw fruit drops that Diet can't auto-classify (no crafting recipe)
    const fruits = [
        // Vanilla
        'minecraft:apple',
        'minecraft:sweet_berries',
        'minecraft:glow_berries',
        'minecraft:melon_slice',
        'minecraft:chorus_fruit',
        // Hearth & Harvest
        'hearthandharvest:blueberries',
        'hearthandharvest:raspberry',
        'hearthandharvest:cherry',
        'hearthandharvest:green_grapes',
        'hearthandharvest:red_grapes',
        // Fruits Delight
        'fruitsdelight:bayberry',
        'fruitsdelight:cranberry',
        'fruitsdelight:durian',
        'fruitsdelight:fig',
        'fruitsdelight:hawberry',
        'fruitsdelight:kiwi',
        'fruitsdelight:lemon',
        'fruitsdelight:lychee',
        'fruitsdelight:mango',
        'fruitsdelight:mangosteen',
        'fruitsdelight:orange',
        'fruitsdelight:peach',
        'fruitsdelight:pear',
        'fruitsdelight:persimmon',
        // Pineapple Delight
        'pineapple_delight:pineapple',
        // Neapolitan
        'neapolitan:strawberries',
        'neapolitan:white_strawberries',
        'neapolitan:banana',
        // Ecologics
        'ecologics:coconut',
        'ecologics:prickly_pear',
        'ecologics:walnut',
        // Collector's Reap
        'collectorsreap:lime',
        'collectorsreap:pomegranate',
        'collectorsreap:lucuma',
        'collectorsreap:pink_dragon_fruit',
        // Cultural Delights
        'culturaldelights:avocado',
        // Farmer's Respite
        'farmersrespite:rose_hips',
        // Existing duplicate items can still remain in old inventories.
        'fruitsdelight:blueberry',
        'fruitsdelight:pineapple',
        'seeddelight:cherry',
        'seeddelight:rosehip',
    ]

    // ── Diet: Vegetables ─────────────────────────────────────────
    const vegetables = [
        'hauntedharvest:corn',
        'culturaldelights:cucumber',
        'culturaldelights:eggplant',
        'culturaldelights:white_eggplant',
        'culturaldelights:ginger',
        'farmersdelight:cabbage',
        'farmersdelight:onion',
        'farmersdelight:tomato',
        'ecologics:crab_claw', // stretch, but closest group
    ]

    // ── Diet: Grains ─────────────────────────────────────────────
    // Processed corn/grain items that might be miscategorised
    const grains = [
        'hauntedharvest:cornbread',
        'hauntedharvest:popcorn',
        'corn_delight:tortilla',
        'corn_delight:tortilla_chip',
        'farmersrespite:nether_wart_sourdough',
        'neapolitan:banana_bread',
        'neapolitan:adzuki_bun',
    ]

    // ── Diet: Proteins ───────────────────────────────────────────
    const proteins = [
        'hearthandharvest:peanut',
        'hearthandharvest:roasted_peanuts',
        'hearthandharvest:raw_sausage',
        'hearthandharvest:cooked_sausage',
        'hearthandharvest:jerky',
        'ecologics:crab_meat',
        'culturaldelights:raw_calamari',
        'culturaldelights:cooked_calamari',
        'culturaldelights:cooked_squid',
        'collectorsreap:tiger_prawn',
        'collectorsreap:cooked_tiger_prawn',
        'collectorsreap:clam_meat',
        'collectorsreap:chieftain_crab_meat',
        'collectorsreap:platinum_bass',
        'collectorsreap:cooked_platinum_bass',
        'collectorsreap:uni',
        'berry_good:sweet_berry_mince',
    ]

    // ── Diet: Sugars ─────────────────────────────────────────────
    // Jams, jellies, candies — auto-classification may not catch these
    const sugars = [
        'hearthandharvest:cotton_candy',
        'hearthandharvest:caramel',
        'hearthandharvest:caramel_apple',
        'hearthandharvest:chocolate_bar',
        'hearthandharvest:blueberry_jam',
        'hearthandharvest:cherry_jam',
        'hearthandharvest:grape_jam',
        'hearthandharvest:melon_jam',
        'hearthandharvest:raspberry_jam',
        'hearthandharvest:sweet_berry_jam',
        'hearthandharvest:glow_berry_jam',
        'hearthandharvest:raisins',
        'neapolitan:chocolate_bar',
        'neapolitan:mint_candies',
        'neapolitan:vanilla_fudge',
        'fruitsdelight:apple_jelly',
        'fruitsdelight:bayberry_jelly',
        'fruitsdelight:blueberry_jelly',
        'fruitsdelight:cranberry_jelly',
        'fruitsdelight:fig_jelly',
        'fruitsdelight:kiwi_jelly',
        'fruitsdelight:lemon_jelly',
        'fruitsdelight:mango_jelly',
        'fruitsdelight:orange_jelly',
        'fruitsdelight:peach_jelly',
        'fruitsdelight:pear_jelly',
        'fruitsdelight:persimmon_jelly',
        'brewinandchewin:apple_jelly',
        'brewinandchewin:sweet_berry_jam',
        'brewinandchewin:glow_berry_marmalade',
        'brewinandchewin:cocoa_fudge',
    ]

    // ── Diet: Dairy ──────────────────────────────────────────────
    const dairy = [
        'hearthandharvest:goat_milk_bottle',
        'hearthandharvest:cheddar_cheese_slice',
        'hearthandharvest:cheddar_cheese_wheel',
        'hearthandharvest:goat_cheese_slice',
        'hearthandharvest:goat_cheese_wheel',
        'brewinandchewin:flaxen_cheese_wedge',
        'brewinandchewin:flaxen_cheese_wheel',
        'brewinandchewin:scarlet_cheese_wedge',
        'brewinandchewin:scarlet_cheese_wheel',
        'collectorsreap:cream_cheese',
    ]

    fruits.forEach(i     => event.add('diet:fruits',     i))
    // Cook Your Food must never classify fresh fruit as raw meat/unsafe food.
    fruits.forEach(i     => event.add('cookyourfood:ok_to_eat_raw', i))
    vegetables.forEach(i => event.add('diet:vegetables', i))
    grains.forEach(i     => event.add('diet:grains',     i))
    proteins.forEach(i   => event.add('diet:proteins',   i))
    sugars.forEach(i     => event.add('diet:sugars',     i))
    dairy.forEach(i      => event.add('diet:dairy',      i))

    // Diet can infer crafted dishes from recipes, but foods without a normal
    // crafting recipe used to remain completely unclassified. Cover every
    // edible registry item by its name and treat unknown complete dishes as
    // balanced meals. Harmful food is deliberately excluded.
    const harmfulFood = [
        'minecraft:poisonous_potato',
        'minecraft:pufferfish',
        'minecraft:rotten_flesh',
        'minecraft:spider_eye',
    ]
    const foodWords = {
        fruits: ['apple', 'apricot', 'avocado', 'banana', 'bayberry', 'berry', 'cherry', 'coconut', 'cranberry', 'currant', 'dragon_fruit', 'dragonfruit', 'durian', 'fig', 'grape', 'grapefruit', 'hawberry', 'kiwi', 'lemon', 'lime', 'lucuma', 'lychee', 'mango', 'melon', 'orange', 'peach', 'pear', 'persimmon', 'pineapple', 'plum', 'pomegranate', 'prickly_pear', 'raisin', 'strawberr'],
        vegetables: ['beet', 'cabbage', 'carrot', 'cucumber', 'eggplant', 'garlic', 'ginger', 'kelp', 'lettuce', 'mushroom', 'onion', 'pepper', 'pickle', 'potato', 'pumpkin', 'radish', 'salad', 'spinach', 'squash', 'tomato', 'turnip', 'vegetable', 'zucchini'],
        grains: ['bagel', 'bread', 'bun', 'cake', 'cookie', 'corn', 'cracker', 'dough', 'dumpling', 'flour', 'muffin', 'noodle', 'pancake', 'pasta', 'pie', 'pizza', 'rice', 'sandwich', 'toast', 'tortilla', 'waffle'],
        proteins: ['bacon', 'bass', 'beef', 'boiled_egg', 'burger', 'calamari', 'chicken', 'clam', 'crab', 'egg_', 'fish', 'fried_egg', 'ham', 'hoglin', 'jerky', 'lobster', 'meat', 'mutton', 'pork', 'prawn', 'rabbit', 'salmon', 'sausage', 'scrambled_egg', 'shrimp', 'squid', 'steak', 'tuna', 'turkey'],
        sugars: ['brownie', 'cake', 'candy', 'caramel', 'chocolate', 'cookie', 'cotton_candy', 'fudge', 'honey', 'ice_cream', 'jam', 'jelly', 'marshmallow', 'marmalade', 'pie', 'popsicle', 'sugar', 'sweet'],
        dairy: ['butter', 'cheese', 'cream', 'custard', 'milk', 'yogurt'],
    }

    function containsFoodWord(path, words) {
        for (let i = 0; i < words.length; i++) if (path.indexOf(words[i]) >= 0) return true
        return false
    }

    try {
        Item.getList().forEach(stack => {
            if (!stack || stack.isEmpty() || !stack.isEdible()) return
            const id = String(stack.getId())
            if (harmfulFood.indexOf(id) >= 0) return
            const path = id.substring(id.indexOf(':') + 1)
            let matched = false
            ;['fruits', 'vegetables', 'grains', 'proteins', 'sugars'].forEach(group => {
                if (containsFoodWord(path, foodWords[group])) {
                    event.add('diet:' + group, id)
                    matched = true
                }
            })
            if (containsFoodWord(path, foodWords.dairy)) {
                event.add('diet:dairy', id)
                matched = true
            }
            if (!matched) {
                // Soups, feasts and unusually named modded dishes still improve
                // the four core groups instead of showing an empty Diet tooltip.
                ;['fruits', 'vegetables', 'grains', 'proteins'].forEach(group => event.add('diet:' + group, id))
            }
        })
    } catch (e) {
        console.error('[diet] Failed to classify registry foods: ' + e)
    }
})
