import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Slash: Move = preload.register<Move>((C: Codex) => ({
  name: "Slash",
  description: "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  attack: power(70),
  makesContact: true,
  criticalHitStage: 1,
}));