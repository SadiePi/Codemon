import C, { Codemon, MoveEntry, Trainer } from "../index.ts";
import { loader } from "../loader.ts"


export const Wild: Trainer = {
  strategy: {
    chooseAction: (combatant, battle) => {
      if(!(combatant instanceof Codemon)) throw new Error("Wild Codemon must be a Codemon");
      return combatant.moves[0] ?? new MoveEntry({move: P.Moves.Struggle, user: combatant});
    },
    chooseTarget: (source, combatant, choice, battle) => {
      const potentialTargets = battle.combatants.filter(c => c !== combatant);
      if (potentialTargets.length === 0) throw new Error("No targets available");
      return [potentialTargets[potentialTargets.length - 1]];
    },
  }
};