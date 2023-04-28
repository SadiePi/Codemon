import C, { Battle, spawn } from "../codex/pokemon/mod.ts";
import { iBulby } from "./common.ts";

Deno.test("Action - Tackle", async () => {
  const bulby1 = spawn({
    ...iBulby,
    moves: [C.Moves.Tackle],
    name: "Bulby 1",
    stats: { level: 5 },
  });
  const bulby2 = spawn({ ...iBulby, name: "Bulby 2" });

  //temp
  bulby1.learnMove(C.Moves.Flamethrower);

  const plan = {
    combatant: bulby1,
    source: bulby1.moves[0],
    targets: [bulby2],
  };

  const action = bulby1.moves[0].useAction({
    battle: {} as Battle,
    plan,
  });

  if (action === null) {
    console.log("Action failed!");
    return;
  }

  const reciept = await action.execute({} as Battle);
  reciept.messages.forEach(m => console.log(m));
  reciept.targetEffects[0].attack?.messages.forEach(m => console.log(m));
  reciept.targetEffects[0].status?.messages.forEach(m => console.log(m));
  reciept.targetEffects[0].stages?.messages.forEach(m => console.log(m));
  reciept.targetEffects[0].hp?.messages.forEach(m => console.log(m));
  reciept.targetEffects[0].faint?.messages.forEach(m => console.log(m));
});
