import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Fighting: Type = dexBuilder.register<Type>(() => ({
  name: "Fighting",
  color: "#C03028",
  weaknesses: [C.Types.Flying, C.Types.Psychic, C.Types.Fairy],
  resistances: [C.Types.Rock, C.Types.Bug],
  immunities: [],
}));
