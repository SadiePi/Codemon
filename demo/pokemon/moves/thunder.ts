import { Codex, chance, power, Move, register } from "../index.ts";

export const Thunder: Move = register<Move>((C: Codex) => ({
  name: "Thunder",
  description:
    "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Physical",
  pp: 10, // max 16
  attack: power(110),
  accuracy: 70,
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Paralysis),
}));
