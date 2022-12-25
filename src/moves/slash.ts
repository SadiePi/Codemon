import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Slash = moves.register(() => ({
  name: "Slash",
  description: "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  power: 70,
  makesContact: true,
  criticalHitStage: 1,
}));
