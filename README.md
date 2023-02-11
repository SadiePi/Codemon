# Codemon - A Pokémon library for Deno

[Codemon](https://img.shields.io/badge/Codemon-0.0.1-blue)

Codemon is a WIP Pokémon library for Typescript using Deno. It faithfully implements
mechanics from the games, and is designed to be as easy to use as possible.

## Usage

### Spawn a Pokémon

```ts
import P, { spawn } from "https://deno.land/x/codemon/mod.ts"; // note: not yet published

const charmander = spawn({
  species: P.Species.Charmander,
  stats: { level: 5 },
});

console.log(charmander.stats.hp.current);
```

### Define a new Type

Define a new type, `Nuclear`, from Pokémon Uranium:
```ts
import { Type } from "./index.ts";
import loader from "./loader.ts";

export const Nuclear: Type = loader.register<Type>(
  U => ({
    name: "Nuclear",
    color: "#00FF00",
    weaknesses: [
      U.Types.Normal,
      U.Types.Fire,
      U.Types.Fighting,
      U.Types.Water,
      U.Types.Flying,
      U.Types.Grass,
      U.Types.Electric,
      U.Types.Ground,
      U.Types.Psychic,
      U.Types.Rock,
      U.Types.Ice,
      U.Types.Bug,
      U.Types.Dragon,
      U.Types.Ghost,
      U.Types.Dark,
      U.Types.Steel,
      U.Types.Fairy,
      U.Types.Poison,
      U.Types.Nuclear,
    ],
    resistances: [U.Types.Nuclear],
    immunities: [],
  }),
  U => {
    // add weaknesses to other types
    [
      U.Types.Normal,
      ...
    ].forEach(type => type.weaknesses.push(U.Types.Nuclear));
    // add resistances to other types
    [...].forEach(type => type.resistances.push(U.Types.Nuclear));
    // add immunities to other types
    // none
  }
);
```

### Define a new Move
```ts
import { Move, Codemon } from "../index.ts";
import { loader } from "../loader.ts"

export const HalfLife: Move = loader.register<Move>(U => ({
  name: "Half-life",
  description: "The user emits a radioactive wave that halves the target's HP.",
  type: U.Types.Nuclear,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  accuracy: 90,
  makesContact: false,
  hp: ({ target }) => (target instanceof Codemon ? -Math.max(Math.ceil(target.stats.hp.current / 2)) : 0),
}));
```


### Define a new Species

Define Nucleon, a Nuclear-type eeveelution, from Pokémon Uranium:
```ts
import { Species, weighted } from "./index.ts";
import loader from "./loader.ts";

export const Nucleon: Species = loader.register(U => ({
  name: "Nucleon",
  description: "A radioactive eeveelution.",
  types: [U.Types.Nuclear],
  abilities: {
    normal: [U.Abilities.Atomize],
    hidden: U.Abilities.GeigerSense,
  },
  genders: weighted([
    [U.Genders.Male, 7],
    [U.Genders.Female, 1],
  ]),
  catchRate: 45,
  eggCycles: 120,
  height: 0.7,
  weight: 21.5,
  baseExperienceYield: 184,
  experienceGroup: U.Experience.MedFast,
  baseFriendship: 35,
  baseStats: {
    hp: 70,
    attack: 55,
    defense: 85,
    specialAttack: 115,
    specialDefense: 115,
    speed: 90,
  },
  evYields: {
    specialAttack: 1,
    specialDefense: 1,
  },
  bodyType: "Quadruped",
  learnset: {
    ...,
    25: [U.Moves.HalfLife],
    ...,
  },
  evolutions: [],
}));
```

Modify Eevee to evolve into Nucleon at level 20 when exposed to a Nuclear type:
```ts
export const Eevee: Species = loader.register(U => ({
  ...
  evolutions: [
    ...,
    {
      species: Nucleon,
      level: 20,
      partyType: U.Type.Nuclear
    },
  ],
  ...
}));

```

### Define a new Move
  
```ts


## Codex

The Codex acts as the Pokédex for the library, but with far more information than the games provide. It contains fully detailed information on every species, move, ability, item, and more.


## Contributing

I'd prefer for this to remain a mostly solo project. That said, I would appreciate bug reports and PRs to flesh out entries in `codex/pokemon/`.

### Arceus files

Arceus files (see `./codex/pokemon/.arceus`) are used to generate the proper structure and placeholder entries for the Codex. 