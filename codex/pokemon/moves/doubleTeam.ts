import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const DoubleTeam: Move = loader.register<Move>(P => ({
  name: "Double Team",
  description: "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.",
  type: P.Types.Normal,
  category: "Status",
  pp: 15, // max 24
  target: "Self",
  makesContact: false,
  stages: { evasion: 1 },
}));