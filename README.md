# Codemon - A Pokémon library for Deno

Codemon is a WIP Pokémon library for Typescript using Deno. It faithfully implements
mechanics from the games, and is designed to be as flexible and easy to use as possible.

This project is still in alpha. Usage details are far from final and probably won't be perfectly consistent even within this README, but the library is already usable for various nontrivial tasks.

## Basic Usage

### Codex

The Codex acts as the Pokédex for the library, but with far more information than the games reveal. It contains fully detailed (WIP) information on every species, move, ability, item, and more, all with intellisense support. TODO more info

### Example Usage

```ts
// note: not yet published
import { spawn, TraditionalBattle } from "https://deno.land/x/codemon/mod.ts";
// import the Pokédex, a Codex with official Pokémon data
import P from "https://deno.land/x/codemon/codex/pokemon/mod.ts";

// spawn a level 5 Charmander
const charmander = spawn({
  species: P.Species.Charmander,
  stats: { level: 5 },
});

// spawn a level 5 Squirtle
const squirtle = spawn({
  species: P.Species.Squirtle,
  stats: { level: 5 },
});

// battle!
const battle = new TraditionalBattle(charmander, squirtle);
const result = await battle.run();
const winner = result.remaining[0];
console.log(`${winner.name} wins!`);
```

### Custom Spawns

You can specify every tiny detail about the Pokémon you spawn, including their IVs, EVs, and even their nature. You can also specify custom moves, abilities, and items.

```ts
import { spawn } from "https://deno.land/x/codemon/mod.ts";
import P from "https://deno.land/x/codemon/codex/pokemon/index.ts";

const kibble = spawn({
  name: "Kibble",
  species: P.Species.Garchomp,
  gender: P.Genders.Female,
  nature: P.Natures.Adamant,
  stats: {
    level: 78,
    hp: { individualValue: 24, effortValue: 74 },
    attack: { individualValue: 12, effortValue: 190 },
    defense: { individualValue: 30, effortValue: 91 },
    specialAttack: { individualValue: 16, effortValue: 48 },
    specialDefense: { individualValue: 23, effortValue: 84 },
    speed: { individualValue: 5, effortValue: 23 },
  },
  moves: [P.Moves.DragonRage, P.Moves.DragonClaw, P.Moves.Outrage, P.Moves.Earthquake],
  ability: "hidden",
});
```

### Taking Control

TODO trainers, console trainer

### Deciders

TODO this'll be hard to explain

## Custom Codex Entries

Let's define [Nucleon](https://pokemon-uranium.fandom.com/wiki/Nucleon), a [Nuclear](<https://pokemon-uranium.fandom.com/wiki/Nuclear_(type)>)-type eeveelution from [Pokémon Uranium](https://pokemon-uranium.fandom.com/wiki/Main_Page). We'll also define the move [Gamma Ray](https://pokemon-uranium.fandom.com/wiki/Gamma_Ray) for Nucleon to use. All data is translated directly from the above links.

### Run the Arceus Script

We first update the Codex's [arceus file](./ARCEUS.md) to create the boilerplate code for our our new entries. We'll be adding a new type, move, and species, so we'll add the following lines to the file:

```ts
TODO;
```

Then we run `https://deno.land/x/codemon/src/arceus.ts` from the root of our Codex to generate/update the files. (TODO: full command)

### Define a new Type

Define the Nuclear type from Pokémon Uranium

```ts
import { Type } from "https://deno.land/x/codemon/mod.ts";
import loader from "./loader.ts";

// prettier-ignore
export const Nuclear: Type = loader.register<Type>(U => ({
  name: "Nuclear",
  color: 0x00FF00,
  weaknesses: [
    U.Types.Normal,
    ...
  ],
  resistances: [U.Types.Nuclear],
  immunities: [],
}), U => {
  // add Nuclear to the weaknesses, resistances, and immunities of other types
  addTypeRelation({
    weakness: [
      U.Types.Normal,
      ...
    ],
    resistance: [U.Types.Steel],
    // no immunities
  }, U.Types.Nuclear);
});
```

### Define a new Move

Define the move [Gamma Ray](<https://pokemon-uranium.fandom.com/wiki/Gamma_Ray_(move)>) from Pokémon Uranium:

```ts
import { Move, power } from "https://deno.land/x/codemon/mod.ts";
import loader from "./loader.ts";

export const GammaRay: Move = loader.register<Move>(U => ({
  name: "Gamma Ray",
  description: "The user fires a blast of nuclear radiation at the enemy.",
  type: U.Types.Nuclear,
  pp: 30,
  category: "Special",
  attack: power(40),
  target: "Any Foe",
  makesContact: false,
}));
```

### Define a new Species

Define Nucleon, a Nuclear-type eeveelution, from Pokémon Uranium:

```ts
import { Species, weighted } from "https://deno.land/x/codemon/mod.ts";
import loader from "./loader.ts";

export const Nucleon: Species = loader.register(U => ({
  name: "Nucleon",
  description: "A radioactive eeveelution.",
  types: [U.Types.Nuclear],
  abilities: {
    normal: [U.Abilities.Atomize],
    hidden: U.Abilities.GeigerSense,
  },
  genders: weighted(
    [U.Genders.Male, 7],
    [U.Genders.Female, 1],
  ),
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
    9: [U.Moves.GammaRay],
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

Alternatively, like with types, we can modify the `evolutions` property of Eevee directly while defining Nucleon:

```ts
export const Nucleon: Species = loader.register(U => ({
  ...
}, U => {
  U.Species.Eevee.evolutions.push({
    species: Nucleon,
    level: 20,
    partyType: U.Type.Nuclear
  });
}));
```

### Spawn our new Species

```ts
import { spawn } from "https://deno.land/x/codemon/mod.ts";
import U from "./index.ts";

const nuke = spawn({
  species: U.Species.Nucleon,
  name: "Nuke",
  stats: { level: 5 },
});

console.log(nuke.stats.hp.current);
```

## Advanced Usage

These are changes that are fully supported but will inevitably require a fork and some digging into the library's code.

### Adding a new stat

Open `src/stats.ts` and add or remove entries to either the `PermanentStats` or `BattleStats` arrays. Diligent strict typing throughout this project will then result in type errors that point you to other places you need to change. Those changes are straightforward, so I won't go into detail here (yet?). Of course, if it's a permanent stat you'll also need to give every species in your Codex a base value for your new stat.

### Custom Battle functionality

## Contributing

I'd prefer for this to remain a mostly solo project. That said, I would appreciate bug reports and PRs to flesh out entries in `/codex/pokemon/`.
