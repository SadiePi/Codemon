import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Fairy: Type = loader.register<Type>((C: Codex) => ({
  name: "Fairy",
  color: "#EE99AC",
  weaknesses: [C.Types.Poison, C.Types.Steel],
  resistances: [C.Types.Fighting, C.Types.Bug, C.Types.Dark],
  immunities: [C.Types.Dragon],
}));
