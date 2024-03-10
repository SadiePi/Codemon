import C, { TraditionalBattle, flattenBattleNodeMessages, spawn } from "../codex/pokemon/mod.ts";
import { iBulby } from "./common.ts";

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
  trainer: C.Trainers.Console,
  stats: { level: 10 },
});

const battle = new TraditionalBattle([bulby1, bulby2])
  .once("start", () => {
    console.log("Battle started!");
    console.log("Combatants: ");
    battle.combatants.forEach(c => console.log(c.toString(true)));
  })
  .on("actionReceipt", receipt => {
    flattenBattleNodeMessages(receipt).forEach(m => console.log(m));
  })
  .on("roundReceipt", receipt => {
    receipt.messages.forEach(m => console.log(m));
    console.log("Round over!");
    console.log();
  })
  .once("battleReceipt", receipt => {
    receipt.messages.push(`Battle over!`);
    receipt.messages.push(`Winner: ${receipt.remaining.map(c => c.name).join(", ")}`);
  });

await battle.runBattle();
