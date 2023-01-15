# Codemon - A fully modular Pokémon library

This implementation is being done in Typescript with [Deno](https://deno.land), but I'd eventually like to make implementations of this library for many languages and platforms. All game information, including data and mechanics but not implementations, is being translated directly from [Bulbapedia](https://bulbapedia.bulbagarden.net).

Currently, the following features are more or less complete and fully modular:

- Species
- Codex (Pokédex)
- Individual Codemon (Pokémon)
- Moves
- Types
- Stats
- Natures
- Leveling
- Genders (🏳️‍⚧️)
- Abstract Battle System

With these well on their way:

- Traditional battle using the above
- Abilities
- Items
- Weather
- Status Effects
- AI Controllers
- Abstract Player Controller

And these planned for the future:

- Evolution
- Breeding
- Trainers
- Locales
- Abstract World Map (for use in MVC)

The Codex currently has entries for all traditional Species, Moves, Types, Natures, Abilities, Items, Weathers, and Status Effects. Yes, all of them, even ones that were removed from the official games. Most are just placeholders, but all types, all gen 1 moves, and a few Pokémon been translated.

My current long-term plan is to have all traditional data translated, and to have a full, CLI-only game in `/demo/game`. Further graphics will have to be done by developers using this library.

## Contributing

I'd prefer for the core functionality to remain a personal project, but I would appreciate contributions to flesh out the data translations and find things that this doesn't support yet. If you'd like to contribute, please open an issue or pull request.
