import { Type } from "./index.ts";
import loader from "./loader.ts";

export const Nuclear: Type = loader.register<Type>(
  C => ({
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
  C => {
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
    ].forEach(type => type.weaknesses.push(C.Types.Nuclear));
    // add resistances to other types
    [C.Types.Steel].forEach(type => type.resistances.push(C.Types.Nuclear));
    // add immunities to other types
    // none
  }
);