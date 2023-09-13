import { chance, power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Thunder: Move = loader.register<Move>(P => ({
  name: "Thunder",
  description:
    "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis.",
  type: P.Types.Electric,
  category: "Physical",
  pp: 10, // max 16
  attack: power(110),
  accuracy: 70,
  target: { position: "Adjacent" },
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Paralysis),
}));
