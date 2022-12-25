import C, { Move, Codemon } from "../index.ts";
import { moves } from "../core/codex.ts";

export const Synthesis = moves.register(() => ({
  name: "Synthesis",
  description: "The user restores its own HP. The amount of HP regained varies with the weather.",
  type: C.Types.Grass,
  category: "Status",
  pp: 5, // max 8
  target: "Self",
  makesContact: false,
  hp: (_, target, _battle) => {
    if (target instanceof Codemon) return target.stats.hp.max / 8;
    // const weather = battle.weather;
    // if (weather === Weather.Sunny) return target.maxHp / 2;
    // if (weather === Weather.Rain) return target.maxHp / 4;
  },
}));
// TODO weather consideration
