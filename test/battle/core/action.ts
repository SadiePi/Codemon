import C, { spawn, flattenBattleNodeMessages, TraditionalBattle, chance } from "../../../codex/pokemon/mod.ts";
import { assert, iBulby } from "../../_common.ts";

Deno.test("Attack - Tackle", async () => {
  const bulby1 = spawn({
    ...iBulby,
    moves: [C.Moves.Tackle],
    name: "Bulby 1",
    stats: { level: 5 },
  });
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });

  const battle = new TraditionalBattle([bulby1, bulby2]);
  const plan = await battle.getPlan(bulby1);
  const receipt = await battle.runPlan(plan);

  assert(receipt.success, "Action failed!");
  assert(bulby2.stats.hp.current < bulby2.stats.hp.max, "No damage dealt");
  const messages = flattenBattleNodeMessages(receipt);
  assert(messages.length > 0, "No messages");
  messages.forEach(m => console.log(m));
});

Deno.test("Enumerate Species", () => {
  const current = {
    Bulbasaur: false,
    Ivysaur: false,
    Venusaur: false,
    Garchomp: false,
  };

  for (const species of Object.values(C.Species)) {
    if (Object.keys(species).length !== 0) {
      console.log(species.name);
      if (species.name in current) current[species.name as keyof typeof current] = true;
    }
  }

  for (const [name, found] of Object.entries(current)) {
    assert(found, `Species ${name} expected and not found`);
  }
});

Deno.test("Stat Stages - Defense via TailWhip", async () => {
  const bulby1 = spawn({ ...iBulby, name: "Bulby 1", moves: [C.Moves.TailWhip] });
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });

  const battle = new TraditionalBattle([bulby1, bulby2]);
  const tailWhip = bulby1.moves[0];
  const plan = { combatant: bulby1, source: tailWhip, targets: [bulby2] };
  const receipt = await battle.runPlan(plan);

  assert(receipt.success, "Action failed!");
  flattenBattleNodeMessages(receipt).forEach(m => console.log(m));
  assert(bulby2.stats.defense.value(true) < bulby2.stats.defense.value(false), "Stat value didn't lower");
});

Deno.test("Status Effect - Burn via Flamethrower", async () => {
  const bulby1 = spawn({ ...iBulby, name: "Bulby 1", moves: [C.Moves.Flamethrower] });
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2", moves: [C.Moves.Tackle] });

  const battle = new TraditionalBattle([bulby1, bulby2]);
  const flamethrower = bulby1.moves[0];
  const plan = { combatant: bulby1, source: flamethrower, targets: [bulby2] };

  const originalFTStatus = C.Moves.Flamethrower.status;
  C.Moves.Flamethrower.status = C.Statuses.Burn; // quick hack so flamethrower ALWAYS burns
  const receipt = await battle.runPlan(plan);
  C.Moves.Flamethrower.status = originalFTStatus; // undo the hack

  assert(receipt.success, "Action failed!");
  flattenBattleNodeMessages(receipt).forEach(m => console.log(m));
  assert(bulby2.statuses.length > 0, "No status effect");
  assert(bulby2.statuses[0].status.name === "Burn", "Wrong status effect");

  const tackle = bulby2.moves[0];
  const plan2 = { combatant: bulby2, source: tackle, targets: [bulby1] };
  const receipt2 = await battle.runPlan(plan2);

  assert(receipt2.success, "Action failed!");
  flattenBattleNodeMessages(receipt2).forEach(m => console.log(m));
  assert(receipt2.targetEffects[0].attack?.success, "Attack failed");
  assert(receipt2.targetEffects[0].attack.actual.other === 0.5, "Attack damage not halved");
  assert(bulby1.stats.hp.current < bulby1.stats.hp.max, "No damage dealt");
});
