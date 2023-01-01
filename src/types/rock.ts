import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Rock: Type = dexBuilder.register<Type>(() => ({
  name: "Rock",
  color: "#B8A038",
  weaknesses: [C.Types.Fighting, C.Types.Ground, C.Types.Steel, C.Types.Water, C.Types.Grass],
  resistances: [C.Types.Normal, C.Types.Flying, C.Types.Poison, C.Types.Fire],
  immunities: [],
}));
