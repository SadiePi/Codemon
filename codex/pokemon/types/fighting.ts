import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Fighting: Type = loader.register<Type>(P => ({
  name: "Fighting",
  color: 0xc03028,
  weaknesses: [P.Types.Flying, P.Types.Psychic, P.Types.Fairy],
  resistances: [P.Types.Rock, P.Types.Bug],
  immunities: [],
}));
