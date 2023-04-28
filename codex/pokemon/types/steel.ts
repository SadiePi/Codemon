import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Steel: Type = loader.register<Type>(P => ({
  name: "Steel",
  color: "#B8B8D0",
  weaknesses: [P.Types.Fighting, P.Types.Ground, P.Types.Fire],
  resistances: [
    P.Types.Normal,
    P.Types.Flying,
    P.Types.Rock,
    P.Types.Bug,
    P.Types.Steel,
    P.Types.Grass,
    P.Types.Psychic,
    P.Types.Ice,
    P.Types.Dragon,
    P.Types.Fairy,
  ], // jfc
  immunities: [P.Types.Poison],
}));
