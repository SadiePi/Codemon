import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Dragon: Type = preload.register<Type>((C: Codex) => ({
  name: "Dragon",
  color: "#7038F8",
  weaknesses: [C.Types.Ice, C.Types.Dragon, C.Types.Fairy],
  resistances: [C.Types.Fire, C.Types.Water, C.Types.Grass, C.Types.Electric],
  immunities: [],
}));
