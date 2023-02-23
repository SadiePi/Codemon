import { Combatant } from "../src/battle.ts";
import {
  ActionReciept,
  Battle,
  BattleReciept,
  decideEffects,
  flattenActionMessages,
  flattenBattleMessages,
  Move,
  MoveEntry,
  ReadyAction,
  recoil,
  Round,
  RoundReciept,
  spawn,
  TraditionalBattle,
} from "../src/mod.ts";
import C from "../codex/pokemon/index.ts";
import { assertEquals, assertNotEquals } from "./common.ts";
import { iBigBoi, iBulby, iGlassCannon, iKibble } from "./common.ts";

async function runAction({ source, targets }: ReadyAction, battle: Battle = {} as Battle, debug = false) {
  // emit beforeAction

  const action = source.useAction({ targets, battle });
  if (debug) console.log("Action", action);

  const preactions = await Promise.all(action.preactions.map(preaction => runAction(preaction, battle, debug)));

  // emit action
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
          // emit effect

          const effectReciept = target.recieveEffect({
            effect,
            action,
            battle,
          });
          // emit effectReciept
          if (debug) console.log("EffectReciept", effectReciept);
          return await effectReciept;
        })
      )
    : [];

  // emit actionEnd

  const reactions = await Promise.all(action.reactions.map(reaction => runAction(reaction, battle, debug)));

  const actionReciept: ActionReciept = {
    source,
    effects,
    preactions,
    messages: action.messages,
    reactions,
  };
  // emit actionReciept
  if (debug) console.log("ActionReciept", actionReciept);

  return actionReciept;
}

async function simulateRoundPipeline(
  combatants: Combatant[],
  battle: Battle = {} as Battle,
  debug = false
): Promise<RoundReciept> {
  const round: Round = {
    number: 0,
    preactions: [],
    actions: [],
    reactions: [],
    messages: [],
  };

  // emit round
  const preactions = await Promise.all(round.preactions.map(preaction => runAction(preaction, battle, debug)));
  const readyActions = await Promise.all(combatants.map(combatant => combatant.getAction(battle) /* emit ready */));
  // emit allReady
  const actions = await Promise.all(readyActions.map(action => runAction(action, battle, debug)));
  // emit roundEnd
  const reactions = await Promise.all(round.reactions.map(reaction => runAction(reaction, battle, debug)));

  const roundReciept: RoundReciept = {
    number: round.number,
    preactions,
    actions,
    reactions,
    messages: round.messages,
  };
  // emit roundReciept
  if (debug) console.log("RoundReciept", roundReciept);
  return roundReciept;
}

// deno-lint-ignore no-unused-vars
async function simulateBattlePipeline(
  combatants: Combatant[],
  battle: Battle = {} as Battle,
  debug = false
): Promise<BattleReciept> {
  // emit start
  const rounds: RoundReciept[] = [];
  while (combatants.length > 1) {
    const roundReciept = await simulateRoundPipeline(combatants, battle, debug);
    rounds.push(roundReciept);
    // emit roundReciept
    if (debug) console.log("RoundReciept", roundReciept);
  }
  // emit battleEnd
  const battleReciept: BattleReciept = {
    rounds,
    remaining: combatants,
    messages: [],
  };
  // emit battleReciept
  if (debug) console.log("BattleReciept", battleReciept);
  return battleReciept;
}

Deno.test("Tackle - Basic Attack", async () => {
  const bulby = spawn(iBulby);
  bulby.learnMove(C.Moves.Tackle);
  const bigBoi = spawn(iBigBoi);

  const actionReciept = await runAction({ combatant: bulby, source: bulby.moves[0], targets: [bigBoi] });
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
  const actionReciept = await runAction({ combatant: kibble, source: kibble.moves[0], targets: [kibble] });
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

  const actionReciept = await runAction({
    combatant: kibble,
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

Deno.test("Burn - Status Effect", async () => {
  const StatusTest: Move = {
    name: "Status Test",
    description: "Performs cruel and unusual tests on the target.",
    type: C.Types.Fairy, // more fae than fairy lol
    pp: 40,
    category: "Status",
    target: "Any",
    status: [C.Statuses.Burn, C.Statuses.Paralysis], //, C.Statuses.Poison, C.Statuses.Sleep, C.Statuses.Freeze],
    makesContact: false,
  };

  const venusaur = spawn({ species: C.Species.Venusaur, stats: { level: 70 }, name: "Bulby 1", moves: [StatusTest] });
  const garchomp = spawn({ species: C.Species.Garchomp, stats: { level: 70 }, name: "Bulby 2", moves: [StatusTest] });

  const battle = new TraditionalBattle(venusaur, garchomp);
  const reciept = await battle.runBattle();
  const messages = flattenBattleMessages(reciept);
  console.log(messages.join("\n"));

  // assertEquals(messages[0], "Bulby used Burn Test!", "The first message should be the move being used");
  // assertNotEquals(messages[1].indexOf("Big Boi"), -1, "The second message should contain the target's name");
  // assertEquals(messages.length, 2, "There should be 2 messages");
});
