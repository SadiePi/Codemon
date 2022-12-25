import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const MirrorMove = moves.register(() => ({
  name: "Mirror Move",
  description: "The user counters the target by mimicking the target's last move.",
  type: C.Types.Flying,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO move replacement
