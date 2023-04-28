import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Sharpen: Move = loader.register<Move>(P => ({
  name: "Sharpen",
  description: "The user makes its edges more jagged, which raises its Attack stat.",
  type: P.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
  stages: { attack: 1 },
}));
