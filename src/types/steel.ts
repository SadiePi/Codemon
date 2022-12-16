import C, { Type } from "../index.ts";

export const Steel: Type = {
  name: "Steel",
  color: "#B8B8D0",
  weaknesses: [C.Types.Fighting, C.Types.Ground, C.Types.Fire],
  resistances: [
    C.Types.Normal,
    C.Types.Flying,
    C.Types.Rock,
    C.Types.Bug,
    C.Types.Steel,
    C.Types.Grass,
    C.Types.Psychic,
    C.Types.Ice,
    C.Types.Dragon,
    C.Types.Fairy,
  ],
  immunities: [C.Types.Poison],
};
