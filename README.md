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
  - [x] Types
  - [ ] Abilities
  - [ ] Learnsets
  - [x] Basic physiology
  - [ ] Advanced physiology
  - [x] Experience groups
  - [x] Lambda overrides
- [x] Moves
  - [x] Usage and reciept
  - [x] Advanced targeting
  - [x] PP schemes
  - [ ] Status effects
  - [ ] Battle consideration
  - [x] Critical hits
  - [x] Lambda overrides
- [ ] Battles
  - [x] Wild vs wild
- [ ] Items
- [ ] CLI
- [ ] Module loading

## TODOs

- Improve structure (always)
- Documentation and style consistency
- Enforce sane values

- Add more base stuff
- Types
  - Automated initialization system
- Stats
  - Utilize Species.overrideStatValue
- Moves
  - Critical hits
    - Fix crit stage implementation, currently totally wrong
    - Consider user affection
  - Use
    - Replace multitarget param with check to TargetingCategory
    - Consider current battle
    - Use effective power instead of base
- Battles
  - More customizability
