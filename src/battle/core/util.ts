import { TODO } from "../../util.ts";
import { EffectGroupReceipt } from "./effect.ts";
import {
  ActionReceipt,
  BattleBuilderParams,
  BattleMessage,
  BattleReceipt,
  EffectGroup,
  EffectTypeReceipt,
  RoundReceipt,
} from "./mod.ts";

export function flattenEffectMessages<P extends BattleBuilderParams<P>>(
  receipt: EffectTypeReceipt<P, unknown>,
  into: BattleMessage<P>[] = []
) {
  if (!receipt.messages) return TODO("WTF?", false, into);
  into.push(...receipt.messages);
  return into;
}

export function flattenEffectGroupMessages<P extends BattleBuilderParams<P>, G extends EffectGroup<unknown, P>>(
  receipt: Partial<EffectGroupReceipt<unknown, P, G>>,
  into: BattleMessage<P>[] = []
) {
  for (const effect in receipt) {
    const _receipt = receipt[effect];
    if (!_receipt) continue;
    flattenEffectMessages(_receipt, into);
  }

  return into;
}

export function flattenActionMessages<P extends BattleBuilderParams<P>>(
  node: ActionReceipt<P>,
  into: BattleMessage<P>[] = []
) {
  if (!node.success) {
    into.push(...node.messages);
    return into;
  }
  for (const action of node.preactions) flattenActionMessages(action, into);
  into.push(...node.messages);
  for (const receipt of node.targetEffects) flattenEffectGroupMessages(receipt, into);
  flattenEffectGroupMessages(node.sourceEffects, into);
  flattenEffectGroupMessages(node.battleEffects, into);
  for (const action of node.reactions) flattenActionMessages(action, into);
  return into;
}

export function flattenRoundMessages<P extends BattleBuilderParams<P>>(
  round: RoundReceipt<P>,
  into: BattleMessage<P>[] = []
) {
  if (!round.success) {
    into.push(...round.messages);
    return into;
  }
  for (const action of round.preactions) flattenActionMessages(action, into);
  for (const action of round.actions) flattenActionMessages(action, into);
  into.push(...round.messages);
  for (const action of round.reactions) flattenActionMessages(action, into);
  return into;
}

export function flattenBattleMessages<P extends BattleBuilderParams<P>>(
  battle: BattleReceipt<P>,
  into: BattleMessage<P>[] = []
) {
  for (const round of battle.rounds) flattenRoundMessages(round, into);
  into.push(...battle.messages);
  return into;
}
