import { Strategy, Codemon, MoveEntry, config, TraditionalBBP } from "../mod.ts";

export const Wild: Strategy<TraditionalBBP> = {
  chooseAction: ({ combatant }) => {
    if (!(combatant instanceof Codemon)) throw new Error("Wild Codemon must be a Codemon");
    return combatant.moves[0] ?? new MoveEntry({ move: config.struggle, user: combatant });
  },
  chooseTarget: ({ combatant, battle }) => {
    const potentialTargets = battle.getCombatants().filter(c => c !== combatant);
    if (potentialTargets.length === 0) throw new Error("No targets available");
    return [potentialTargets[potentialTargets.length - 1]];
  },
};
