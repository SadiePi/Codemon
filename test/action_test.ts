import C, { spawn } from "../codex/pokemon/mod.ts";
import Traditional from "../src/battle/traditional.ts";
import { flattenActionMessages } from "../src/mod.ts";
import { iBulby } from "./common.ts";

Deno.test("Attack - Tackle", async () => {
  const bulby1 = spawn({
    ...iBulby,
    moves: [C.Moves.Tackle],
    name: "Bulby 1",
    stats: { level: 5 },
  });
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });

  //temp
  bulby1.learnMove(C.Moves.Flamethrower);

  const battle = new Traditional([bulby1, bulby2]);
  const plan = await battle.getPlan(bulby1);
  const reciept = await battle.runPlan(plan);

  if (!reciept.success) throw new Error("Action failed!");
  flattenActionMessages(reciept).forEach(m => console.log(m));
  console.log(bulby2.stats.hp.current, bulby2.stats.hp.max);
});

Deno.test("Enumerate Species", () => {
  for (const species of Object.values(C.Species)) {
    if (Object.keys(species).length !== 0) console.log(species.name);
  }
});

Deno.test("Stat Stages - Defense via TailWhip", async () => {
  const bulby1 = spawn({ ...iBulby, name: "Bulby 1" });
  bulby1.learnMove(C.Moves.TailWhip);
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });

  const battle = new Traditional([bulby1, bulby2]);
  const plan = await battle.getPlan(bulby1);
  const reciept = await battle.runPlan(plan);

  if (!reciept.success) throw new Error("Action failed!");
  flattenActionMessages(reciept).forEach(m => console.log(m));
  console.log(bulby2.stats.defense.value(true), bulby2.stats.defense.value(false));
});

Deno.test("Status Effect - Paralysis via Thunderbolt", async () => {
  const bulby1 = spawn({ ...iBulby, name: "Bulby 1" });
  bulby1.learnMove(C.Moves.ThunderWave);
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });
  bulby2.learnMove(C.Moves.TailWhip);

  const battle = new Traditional([bulby1, bulby2]);
  const plan = await battle.getPlan(bulby1);
  const reciept = await battle.runPlan(plan);

  if (!reciept.success) throw new Error("Action failed!");
  flattenActionMessages(reciept).forEach(m => console.log(m));

  const plan2 = await battle.getPlan(bulby2);
  const reciept2 = await battle.runPlan(plan2);

  if (reciept2.success) throw new Error("Action succeeded!");
  flattenActionMessages(reciept2).forEach(m => console.log(m));
});

Deno.test("Status Effect - Burn via Flamethrower", async () => {
  const bulby1 = spawn({ ...iBulby, name: "Bulby 1" });
  bulby1.learnMove(C.Moves.Flamethrower);
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });
  bulby2.learnMove(C.Moves.Tackle);

  const battle = new Traditional([bulby1, bulby2]);
  const plan = await battle.getPlan(bulby1);
  const reciept = await battle.runPlan(plan);

  if (!reciept.success) throw new Error("Action failed!");
  flattenActionMessages(reciept).forEach(m => console.log(m));

  const plan2 = await battle.getPlan(bulby2);
  const reciept2 = await battle.runPlan(plan2);

  flattenActionMessages(reciept2).forEach(m => console.log(m));
});
