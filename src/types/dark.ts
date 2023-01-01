import { Codex, dexBuilder, Type } from "../index.ts";

export const Dark: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Dark",
  color: "#705848",
  weaknesses: [C.Types.Fighting, C.Types.Bug, C.Types.Fairy],
  resistances: [C.Types.Ghost, C.Types.Dark],
  immunities: [C.Types.Psychic],
}));
