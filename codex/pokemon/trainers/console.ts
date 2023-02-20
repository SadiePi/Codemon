import { Codemon, Combatant, Trainer } from "../index.ts";
import loader from "../loader.ts"

export const Console: Trainer = loader.register(P => ({
  strategy: {
    chooseAction: ({ combatant }) => {
      if(!(combatant instanceof Codemon)) throw new Error("Console controlled must be a Codemon")
      // use deno std lib to get user input
      // print each move info, and ask for user input
      // return the move
      console.log(combatant.toString(true))
      const moves = combatant.moves;
      console.log("Choose a move:");
      moves.forEach((move, i) => console.log(`${i + 1}. ${move.toString()}`));
      let input: number | null = null;
      // TODO? get suggested move from another strategy
      while (!input || input < 1 || input > moves.length) {
        const raw = prompt();
        input = parseInt(raw ?? "");
      }
      return moves[input - 1];
    },
    chooseTarget({ combatant, choice }): Combatant[] {
      return [choice.targets.filter(t => t !== combatant)[0]!]; // TODO: make this better (random, etc.
    },
  },
}));
