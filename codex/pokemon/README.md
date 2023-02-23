# Codemon Pokédex

This is a [Codex](../README.md) containing standard Pokémon data. At the moment, there isn't perfect consistency in which generation data is from, but it's generally from the most recent generation or the most recent it was available in. The ultimate goal is to have a Codex for each generation. All data is sourced from [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) and copied/translated by hand.

This is an early work in progress, but I think the data structure is finally stable enough to be useful. Contributions are very welcome! Fleshing out this full Pokédex is my main priority, but I'm also happy to accept PRs for other games (though I'd prefer for `/src` to remain a solo project).

## Basic Usage

Import the Codex and inspect the data (see [/README.md](../../README.md) for actual usage):

```ts
import P from "https://deno.land/x/codemon/codex/pokemon/index.ts"; // note: not yet published

const bulbasaur = P.Species.Bulbasaur;
bulbasaur.name; // "Bulbasaur"
bulbasaur.baseStats; // { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 }

const types = bulbasaur.types; // [ P.Types.Grass, P.Types.Poison ]
types[0].name; // "Grass"
types[0].resistances; // [ P.Types.Fire, P.Types.Grass, P.Types.Poison, P.Types.Flying, P.Types.Bug, P.Types.Dragon, P.Types.Steel ]

const abilities = bulbasaur.abilities; // [ P.Abilities.Overgrow, P.Abilities.Chlorophyll ]
abilities[0].apply.toString(); // TODO: add this
```

## Currently Implemented

- Abilities: None
- Experience Groups: All
- Items: None
- Moves: All Gen 1, some others, not all effects
- Natures: All
- Species: Bulbasaur, Ivsaur, Venusaur, Garchomp
- Statuses: Burn, Paralysis (mostly)
- Trainers: (system still WIP)
- Types: All
- Weather: None

## Data Structure

See [../codex/README.md](../codex/README.md#Data-Structure) for a full description of the data structure.
