import C, {
  ActionReciept,
  decideEffects,
  flattenActionMessages,
  MoveEntry,
  ReadyAction,
  recoil,
  spawn,
} from "../src/index.ts";
import { assertEquals, assertNotEquals } from "./common.ts";
import { iBigBoi, iBulby, iGlassCannon, iKibble } from "./common.ts";

async function simulateActionPipeline({ source, targets }: ReadyAction, debug = false) {
  // deno-lint-ignore no-explicit-any
  const battle = {} as any; // Normally this would be a Battle in progress

  const action = source.useAction({
    targets,
    battle,
  });
  if (debug) console.log("Action", action);

  const preactions = await Promise.all(action.preactions.map(preaction => simulateActionPipeline(preaction, debug)));

  const hit = true; // TODO: implement hit chance
  if (source instanceof MoveEntry) {
    if (hit && action.effect.recoil) action.reactions.push(recoil(source.user, action.effect.recoil));
    if (!hit && action.effect.crash) action.reactions.push(recoil(source.user, action.effect.crash));
  }
  const effects = hit
    ? await Promise.all(
        action.targets.map(async target => {
          const effect = decideEffects(action, target, battle);
          // console.log("Effect", effect);

          const effectReciept = target.recieveEffect({
            effect,
            action,
            battle,
          });
          if (debug) console.log("EffectReciept", effectReciept);
          return await effectReciept;
        })
      )
    : [];

  const reactions = await Promise.all(action.reactions.map(reaction => simulateActionPipeline(reaction, debug)));

  const actionReciept: ActionReciept = {
    source,
    effects,
    preactions,
    messages: action.messages,
    reactions,
  };
  if (debug) console.log("ActionReciept", actionReciept);

  return actionReciept;
}

Deno.test("Tackle - Basic Attack", async () => {
  const bulby = spawn(iBulby);
  bulby.learnMove(C.Moves.Tackle);
  const bigBoi = spawn(iBigBoi);

  const actionReciept = await simulateActionPipeline({ source: bulby.moves[0], targets: [bigBoi] });
  const messages = flattenActionMessages(actionReciept);
  console.log(messages.join("\n"));

  assertEquals(messages.length, 3, "There should be 3 messages");
  assertEquals(messages[0], "Bulby used Tackle!", "The first message should be the move being used");
  assertNotEquals(messages[1].indexOf("Big Boi"), -1, "The second message should contain the target's name");
  assertNotEquals(messages[2].indexOf("Big Boi"), -1, "The third message should contain the target's name");
});

Deno.test("Swords Dance - Stat Stage Modifications", async () => {
  const kibble = spawn({
    ...iKibble,
    moves: [C.Moves.SwordsDance],
  });
  // console.log("Kibble", kibble);

  const startingAttackStage = kibble.stats.attack.stage.current;
  const actionReciept = await simulateActionPipeline({ source: kibble.moves[0], targets: [kibble] });
  const messages = flattenActionMessages(actionReciept);
  console.log(messages.join("\n"));

  assertEquals(startingAttackStage, 0, "Attack stage should start at 0");
  assertEquals(kibble.stats.attack.stage.current, startingAttackStage + 2, "Attack stage should have increased by 2");
  assertEquals(messages.length, 2, "There should be 2 messages");
  assertEquals(messages[0], "Kibble used Swords Dance!", "The first message should be the move being used");
  assertEquals(messages[1], "Kibble's attack rose by 2 stages!", "The second message should be the stat change");
});

Deno.test("Explosion - Multitarget and recoil", async () => {
  const kibble = spawn({ ...iKibble, moves: [C.Moves.Explosion] });
  const bulby = spawn(iBulby);
  const bigBoi = spawn(iBigBoi);
  const bigBoi2 = spawn(iBigBoi);
  const glassCannon = spawn(iGlassCannon);

  const actionReciept = await simulateActionPipeline({
    source: kibble.moves[0],
    targets: [bulby, bigBoi, bigBoi2, glassCannon],
  });
  // console.log("ActionReciept", actionReciept);

  assertEquals(kibble.stats.hp.current, 0, "Kibble should have 0 HP");
  assertEquals(bulby.stats.hp.current, 0, "Bulby should have 0 HP");
  assertNotEquals(bigBoi.stats.hp.current, 0, "BigBoi should survive");
  assertEquals(glassCannon.stats.hp.current, 0, "Glass Cannon should have 0 HP");

  const messages = flattenActionMessages(actionReciept);
  console.log(messages.join("\n"));
});

Deno.test("Spore - Status Effect", async () => {
  const bulby = spawn(iBulby);
  const bigBoi = spawn(iBigBoi);
  bulby.learnMove(C.Moves.Spore);

  const actionReciept = await simulateActionPipeline({ source: bulby.moves[0], targets: [bigBoi] });
  const messages = flattenActionMessages(actionReciept);
  console.log(messages.join("\n"));

  assertEquals(messages.length, 2, "There should be 2 messages");
  assertEquals(messages[0], "Bulby used Spore!", "The first message should be the move being used");
  assertNotEquals(messages[1].indexOf("Big Boi"), -1, "The second message should contain the target's name");
});
