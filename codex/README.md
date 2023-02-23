# Codemon Codex

This directory contains various Codexes for Codemon.

Data entry is an early work in progress, but I think the data structure is finally stable enough to be useful. Contributions are very welcome! Fleshing out the full Pokédex is my main priority, but I'm also happy to accept PRs for other games (though I'd prefer for `/src` to remain a solo project).

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

## Data Structure

If the Codex is implemented properly, it will have full intellisense support in your IDE, providing you with each option in each category. For example, if you type `P.Species.` in VSCode, you'll see a list of all the Pokémon in the Pokédex.

```ts
// codemon/src/codex.ts
interface Codex {
  Abilities: Record<string, Ability>;
  Experience: Record<string, ExperienceGroup>;
  Genders: Record<string, Gender>; // 🏳️‍⚧️
  Items: Record<string, Item>;
  Moves: Record<string, Move>;
  Natures: Record<string, Nature>;
  Species: Record<string, Species>;
  Statuses: Record<string, StatusEffect>;
  Trainers: Record<string, Trainer>;
  Types: Record<string, Type>;
  Weathers: Record<string, Weather>;
}
```
