import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Dark: Type = loader.register<Type>((C: Codex) => ({
  name: "Dark",
  color: "#705848",
  weaknesses: [C.Types.Fighting, C.Types.Bug, C.Types.Fairy],
  resistances: [C.Types.Ghost, C.Types.Dark],
  immunities: [C.Types.Psychic],
}));
