import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Dark: Type = preload.register<Type>((C: Codex) => ({
  name: "Dark",
  color: "#705848",
  weaknesses: [C.Types.Fighting, C.Types.Bug, C.Types.Fairy],
  resistances: [C.Types.Ghost, C.Types.Dark],
  immunities: [C.Types.Psychic],
}));
