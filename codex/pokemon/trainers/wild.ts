import P, { Codemon, MoveEntry, Trainer, getStruggleInfo } from "../index.ts";
import { loader } from "../loader.ts"

export const Wild: Trainer = {
  strategy: {
    chooseAction: ({combatant}) => {
      if(!(combatant instanceof Codemon)) throw new Error("Wild Codemon must be a Codemon");
      return combatant.moves[0] ?? new MoveEntry({move: getStruggleInfo(), user: combatant});
    },
    chooseTarget: ({combatant, battle}) => {
      const potentialTargets = battle.combatants.filter(c => c !== combatant);
      if (potentialTargets.length === 0) throw new Error("No targets available");
      return [potentialTargets[potentialTargets.length - 1]];
    },
  }
};