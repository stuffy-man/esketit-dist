// priority: 5
// Cold Cellar — mark canned / salted / cured / preserved foods as immune to spoilage.
// Adds matching items to the esketit_coldcellar:preserved tag (the mod treats tagged food as
// non-spoiling). Pattern-based so it covers the whole Farmer's Delight ecosystem without listing
// every item by hand. Only edible items actually matter (the mod ignores the tag on non-food).
// Tune the patterns to taste.

ServerEvents.tags('item', event => {
    const PRESERVED = 'esketit_coldcellar:preserved'

    const patterns = [
        // canned goods
        /(^|[:_])canned([:_]|$)/, /can_of/, /tin_of/, /(^|[:_])canning/,
        // salted / brined
        /salted/, /salt_cured/, /(^|[:_])brined/, /(^|[:_])brine([:_]|$)/,
        // pickled
        /pickled/, /(^|[:_])pickle(s)?([:_]|$)/,
        // dried / cured meats & produce
        /jerky/, /(^|[:_])dried_/, /(^|[:_])cured/, /smoked_and_dried/,
        // jams / jellies / preserves
        /(^|[:_])jam([:_]|$)/, /jelly/, /jello/, /marmalade/, /preserve/, /conserve/,
        // fermented
        /fermented/, /kimchi/, /sauerkraut/,
    ]

    patterns.forEach(rx => event.add(PRESERVED, rx))
})
