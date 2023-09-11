import { addTypeRelation, Type } from "./index.ts";
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
    // add relationships to other types
    // this is only necessary if you import types from other Codexes
    // another option is to simply modify the other Codex directly
    addTypeRelation(
      {
        weakness: [
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
          U.Types.Fairy,
          U.Types.Poison,
        ],
        resistance: [U.Types.Steel],
        // no immunities
      },
      U.Types.Nuclear
    );
  }
);
