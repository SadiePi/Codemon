import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Gust: Move = dexBuilder.register<Move>(() => ({
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
