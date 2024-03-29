import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const DragonRage: Move = loader.register<Move>(P => ({
  name: "Dragon Rage",
  description: "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage.",
  type: P.Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  target: { position: "Adjacent" },
  makesContact: false,
  hp: -40,
}));
