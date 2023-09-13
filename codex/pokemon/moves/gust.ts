import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Gust: Move = loader.register<Move>(P => ({
  name: "Gust",
  description: "A gust of wind is whipped up by wings and launched at the target to inflict damage.",
  type: P.Types.Flying,
  category: "Special",
  pp: 35,
  attack: power(40),
  target: { alignment: "Any" },
  makesContact: false,
}));
// TODO during Fly, double power
