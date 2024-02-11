import { Type } from "../mod.ts";
import loader from "../loader.ts";

export const Ghost: Type = loader.register<Type>(P => ({
  name: "Ghost",
  color: 0x705898,
  weaknesses: [P.Types.Ghost, P.Types.Dark],
  resistances: [P.Types.Poison, P.Types.Bug],
  immunities: [P.Types.Normal, P.Types.Fighting],
}));
