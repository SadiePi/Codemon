import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const RollingKick: Move = dexBuilder.register<Move>(() => ({
  name: "Rolling Kick",
  description: "The user lashes out with a quick, spinning kick. This may also make the target flinch.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 15,
  attack: power(60),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
}));
