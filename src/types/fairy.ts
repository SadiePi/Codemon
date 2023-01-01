import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Fairy: Type = dexBuilder.register<Type>(() => ({
  name: "Fairy",
  color: "#EE99AC",
  weaknesses: [C.Types.Poison, C.Types.Steel],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Dark],
  immunities: [C.Types.Dragon],
}));
