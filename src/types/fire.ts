import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Fire: Type = dexBuilder.register<Type>(() => ({
  name: "Fire",
  color: "#F08030",
  weaknesses: [C.Types.Ground, C.Types.Rock, C.Types.Water],
  resistances: [C.Types.Bug, C.Types.Steel, C.Types.Fire, C.Types.Grass, C.Types.Ice, C.Types.Fairy],
  immunities: [],
}));
