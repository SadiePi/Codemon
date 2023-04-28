import C, {
  Codemon,
  flattenActionMessages,
  flattenBattleMessages,
  flattenRoundMessages,
  spawn,
  TraditionalBattle,
} from "../codex/pokemon/mod.ts";

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
    battle.on("battleReciept", reciept => {
      reciept.messages.push(`Battle over!`);
      reciept.messages.push(
        `Winner: ${reciept.remaining.map(c => (c instanceof Codemon ? c.name : "Non-Codemon")).join(", ")}`
      );
    });

    const reciept = await battle.runBattle();
    console.log(flattenBattleMessages(reciept));
  },
});

Deno.test({
  name: "1v1 Full Battle with Console Strategy",
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

    const battle = new TraditionalBattle(bulby1, bulby2);
    battle.on("start", () => {
      console.log("Battle started!");
      console.log("Combatants: ");
      console.log(battle.combatants.map(c => (c instanceof Codemon ? c.toString(true) : "Non-Codemon")).join("\n"));
    });

    battle.on("actionReciept", reciept => {
      console.log(flattenActionMessages(reciept));
    });

    battle.on("battleReciept", reciept => {
      reciept.messages.push(`Battle over!`);
      reciept.messages.push(
        `Winner: ${reciept.remaining.map(c => (c instanceof Codemon ? c.name : "Non-Codemon")).join(", ")}`
      );
    });

    const reciept = await battle.runBattle();
    console.log(flattenBattleMessages(reciept));
  },
});
