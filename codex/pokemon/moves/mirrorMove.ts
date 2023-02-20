import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const MirrorMove: Move = loader.register<Move>(P => ({
  name: "Mirror Move",
  description: "The user counters the target by mimicking the target's last move.",
  type: P.Types.Flying,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO move replacement
