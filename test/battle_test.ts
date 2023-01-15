import C, { Codemon, flattenBattleMessages, flattenRoundMessages, spawn } from "../src/index.ts";
import TraditionalBattle from "../src/battles/traditional.ts";
import { iBulby } from "./common.ts";

Deno.test({
  name: "1v1 One Round",
  fn: async () => {
    const bulby1 = spawn(iBulby);
    const bulby2 = spawn(iBulby);
    bulby1.learnMove(C.Moves.Tackle);
    bulby2.learnMove(C.Moves.Tackle);

    const battle = new TraditionalBattle(bulby1, bulby2);
    const reciept = await battle.runRound();

    console.log(flattenRoundMessages(reciept)); 
  },
});

Deno.test({
  name: "1v1 Full Battle",
  fn: async () => {
    const bulby1 = spawn({ ...iBulby, name: "Bulby 1", moves: [C.Moves.Harden] });
    const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });

    const battle = new TraditionalBattle(bulby1, bulby2);
    battle.on("battleReciept", (reciept) => {
      reciept.messages.push(`Battle over!`);
      reciept.messages.push(`Winner: ${reciept.remaining.map((c) => c instanceof Codemon ? c.name : "Non-Codemon").join(", ")}`);
    });
    
    const reciept = await battle.runBattle();
    console.log(flattenBattleMessages(reciept));
  }
});