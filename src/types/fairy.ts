import { Codex, dexBuilder, Type } from "../index.ts";

export const Fairy: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Fairy",
  color: "#EE99AC",
  weaknesses: [C.Types.Poison, C.Types.Steel],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Dark],
  immunities: [C.Types.Dragon],
}));
