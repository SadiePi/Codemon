import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Submission: Move = loader.register<Move>(P => ({
  name: "Submission",
  description: "The user grabs the target and recklessly dives for the ground. This also damages the user a little.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 20,
  attack: power(80),
  accuracy: 80,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
}));
// TODO proportionals recoil
