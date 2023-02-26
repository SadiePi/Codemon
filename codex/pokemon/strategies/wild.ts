import { Strategy, Codemon, MoveEntry, config } from "../index.ts";

export const Wild: Strategy = {
  chooseAction: ({ combatant }) => {
    if (!(combatant instanceof Codemon)) throw new Error("Wild Codemon must be a Codemon");
    return combatant.moves[0] ?? new MoveEntry({ move: config.struggle, user: combatant });
  },
  chooseTarget: ({ combatant, battle }) => {
    const potentialTargets = battle.combatants.filter(c => c !== combatant);
    if (potentialTargets.length === 0) throw new Error("No targets available");
    return [potentialTargets[potentialTargets.length - 1]];
  },
};
