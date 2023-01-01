import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Grass: Type = preload.register<Type>((C: Codex) => ({
  name: "Grass",
  color: "#78C850",
  weaknesses: [C.Types.Flying, C.Types.Poison, C.Types.Bug, C.Types.Fire, C.Types.Ice],
  resistances: [C.Types.Ground, C.Types.Water, C.Types.Grass, C.Types.Electric],
  immunities: [],
}));
