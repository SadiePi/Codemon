import { Move, power } from "../mod.ts";
import loader from "../loader.ts";

export const Accelerock: Move = loader.register(P => ({
  name: "Accelerock",
  description: "The user smashes into the target at high speed. This move always goes first.",
  type: P.Types.Rock,
  category: "Physical",
  pp: 20,
  target: { position: "Adjacent", alignment: "Foe" },
  makesContact: true,
  priority: 1,
  attack: power(40),
}));
