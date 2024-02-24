import C, {
  Codemon,
  flattenBattleMessages,
  flattenActionMessages,
  spawn,
  flattenRoundMessages,
} from "../../../codex/pokemon/mod.ts";
import Traditional from "../../../src/battle/traditional.ts";

import { iBulby } from "../../_common.ts";

Deno.test({
  name: "1v1 One Round",
  fn: async () => {
    const bulby1 = spawn({ ...iBulby, name: "Bulbusaur 1" });
    const bulby2 = spawn({ ...iBulby, name: "Bulbasaur 2" });
    bulby1.learnMove(C.Moves.Tackle);
    bulby2.learnMove(C.Moves.VineWhip);

    const battle = new Traditional([bulby1, bulby2]);
    const receipt = await battle.runRound();

    flattenRoundMessages(receipt).forEach(m => console.log(m));
  },
});

Deno.test({
  name: "1v1 Full Battle",
  fn: async () => {
    const bulby1 = spawn({ ...iBulby, name: "Bulby 1" });
    const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });
    bulby1.learnMove(C.Moves.VineWhip);
    bulby2.learnMove(C.Moves.VineWhip);

    const battle = new Traditional([bulby1, bulby2]);
    const receipt = await battle.runBattle();

    flattenBattleMessages(receipt).forEach(m => console.log(m));
  },
});

Deno.test({
  name: "1v1 Console Strategy",
  fn: async () => {
    const bulby1 = spawn({
      ...iBulby,
      name: "Bulby 1",
      moves: [C.Moves.Tackle, C.Moves.VineWhip, C.Moves.Spore, C.Moves.HyperBeam],
      trainer: C.Trainers.Console,
      stats: { level: 10 },
    });

    const bulby2 = spawn({
      ...iBulby,
      name: "Bulby 2",
      moves: [C.Moves.SleepPowder, C.Moves.StunSpore, C.Moves.PoisonPowder],
      trainer: C.Trainers.Wild,
      stats: { level: 10 },
    });

    const battle = new Traditional([bulby1, bulby2]);
    battle.on("start", () => {
      console.log("Battle started!");
      console.log("Combatants: ");
      console.log(battle.combatants.map(c => (c instanceof Codemon ? c.toString(true) : "Non-Codemon")).join("\n"));
    });

    battle.on("actionReceipt", receipt => {
      console.log(flattenActionMessages(receipt));
    });

    battle.on("battleReceipt", receipt => {
      receipt.messages.push(`Battle over!`);
      receipt.messages.push(`Winner: ${receipt.remaining.map(c => c.name).join(", ")}`);
    });

    const receipt = await battle.runBattle();
    console.log(flattenBattleMessages(receipt));
  },
});
