import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Poison: Type = dexBuilder.register<Type>(() => ({
  name: "Poison",
  color: "#A040A0",
  weaknesses: [C.Types.Ground, C.Types.Psychic],
  resistances: [C.Types.Fighting, C.Types.Poison, C.Types.Bug, C.Types.Grass, C.Types.Fairy],
  immunities: [],
}));
