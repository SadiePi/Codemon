import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Submission: Move = preload.register<Move>((C: Codex) => ({
  name: "Submission",
  description: "The user grabs the target and recklessly dives for the ground. This also damages the user a little.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  attack: power(80),
  accuracy: 80,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
}));
// TODO proportionals recoil