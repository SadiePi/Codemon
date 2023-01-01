import { Codex, dexBuilder, Type } from "../index.ts";

export const Dragon: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Dragon",
  color: "#7038F8",
  weaknesses: [C.Types.Ice, C.Types.Dragon, C.Types.Fairy],
  resistances: [C.Types.Fire, C.Types.Water, C.Types.Grass, C.Types.Electric],
  immunities: [],
}));
