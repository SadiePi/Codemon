// Ensure that the uranium demo entries are enabled in ../src/types/index.ts and ../src/species/index.ts

import C, { Type } from "../../src/index.ts";
import dexBuilder from "../../src/core/codex.ts";

export const Nuclear: Type = dexBuilder.register<Type>(
  () => ({
    name: "Nuclear",
    color: "#00FF00",
    weaknesses: [
      C.Types.Normal,
      C.Types.Fire,
      C.Types.Fighting,
      C.Types.Water,
      C.Types.Flying,
      C.Types.Grass,
      C.Types.Electric,
      C.Types.Ground,
      C.Types.Psychic,
      C.Types.Rock,
      C.Types.Ice,
      C.Types.Bug,
      C.Types.Dragon,
      C.Types.Ghost,
      C.Types.Dark,
      C.Types.Steel,
      C.Types.Fairy,
      C.Types.Poison,
      C.Types.Nuclear,
    ],
    resistances: [C.Types.Nuclear],
    immunities: [],
  }),
  () => {
    // add weaknesses to other types
    [
      C.Types.Normal,
      C.Types.Fire,
      C.Types.Fighting,
      C.Types.Water,
      C.Types.Flying,
      C.Types.Grass,
      C.Types.Electric,
      C.Types.Ground,
      C.Types.Psychic,
      C.Types.Rock,
      C.Types.Ice,
      C.Types.Bug,
      C.Types.Dragon,
      C.Types.Ghost,
      C.Types.Dark,
      C.Types.Fairy,
      C.Types.Poison,
    ].forEach(type => type.weaknesses.push(Nuclear));
    // add resistances to other types
    [C.Types.Steel].forEach(type => type.resistances.push(Nuclear));
    // add immunities to other types
    // none
  }
);
