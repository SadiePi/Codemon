import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Dark: Type = loader.register<Type>(P => ({
  name: "Dark",
  color: 0x705848,
  weaknesses: [P.Types.Fighting, P.Types.Bug, P.Types.Fairy],
  resistances: [P.Types.Ghost, P.Types.Dark],
  immunities: [P.Types.Psychic],
}));
