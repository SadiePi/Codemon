import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const ViseGrip: Move = loader.register<Move>(P => ({
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 30,
  attack: power(55),
  target: { position: "Adjacent" },
  makesContact: true,
}));
