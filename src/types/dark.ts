import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Dark: Type = dexBuilder.register<Type>(() => ({
  name: "Dark",
  color: "#705848",
  weaknesses: [C.Types.Fighting, C.Types.Bug, C.Types.Fairy],
  resistances: [C.Types.Ghost, C.Types.Dark],
  immunities: [C.Types.Psychic],
}));
