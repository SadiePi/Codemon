import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const Gust: Move = loader.register<Move>((C: Codex) => ({
  name: "Gust",
  description: "A gust of wind is whipped up by wings and launched at the target to inflict damage.",
  type: C.Types.Flying,
  category: "Special",
  pp: 35,
  attack: power(40),
  target: "Any",
  makesContact: false,
}));
// TODO during Fly, double power
