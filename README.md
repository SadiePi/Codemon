# Codemon

My attempt at a fully modular reimplementation of Pokémon. This implementation is being done in Typescript, but I'd eventually like to make implementations of this library in many common languages.

My current plan is to eventually have a full, CLI-only game in `/demo`. Further graphics will have to be done by developers using this library.

Yes, I know about Pokémon Essentials, but this is being designed to work in more than just RPG Maker. I'm also trying to reference PE as little as possible to not be influenced by design decisions its creators made. I want this to be something actually new (except for Pokémon itself obviously)

## Roadmap

- [x] means at least in a testable state, not necessarily complete

- [x] Codemon
  - [x] Sexes
  - [x] Experience
  - [x] Natures
  - [x] Stats
  - [ ] Affection
- [x] Species info
  - [ ] Abilities
  - [ ] Learnsets
  - [ ] Physiology
- [x] Moves
  - [ ] Status effects
  - [ ] Battle consideration
  - [x] Critical hits
- [ ] Battles
- [ ] Items
- [ ] CLI
- [ ] Documentation & consistent style
- [ ] Modularity

## TODOs
- Stats
  - Utilize Species.overrideStatValue
- Critical hits
  - Fix crit stage implementation, currently totally wrong
  - Consider user affection
