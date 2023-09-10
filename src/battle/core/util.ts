import { TODO } from "../../util.ts";
import { EffectGroupReciept } from "./effect.ts";
import {
  ActionReciept,
  BattleBuilderParams,
  BattleMessage,
  BattleReciept,
  EffectGroup,
  EffectTypeReciept,
  RoundReciept,
} from "./mod.ts";

export function flattenEffectMessages<P extends BattleBuilderParams<P>>(
  reciept: EffectTypeReciept<P, unknown>,
  into: BattleMessage<P>[] = []
) {
  if (!reciept.messages) return TODO("WTF?", "warn", into);
  into.push(...reciept.messages);
  return into;
}

export function flattenEffectGroupMessages<P extends BattleBuilderParams<P>, G extends EffectGroup<unknown, P>>(
  reciept: Partial<EffectGroupReciept<unknown, P, G>>,
  into: BattleMessage<P>[] = []
) {
  for (const effect in reciept) {
    const _reciept = reciept[effect];
    if (!_reciept) continue;
    flattenEffectMessages(_reciept, into);
  }

  return into;
}

export function flattenActionMessages<P extends BattleBuilderParams<P>>(
  node: ActionReciept<P>,
  into: BattleMessage<P>[] = []
) {
  if (!node.success) {
    into.push(...node.messages);
    return into;
  }
  for (const action of node.preactions) flattenActionMessages(action, into);
  into.push(...node.messages);
  for (const reciept of node.targetEffects) flattenEffectGroupMessages(reciept, into);
  flattenEffectGroupMessages(node.sourceEffects, into);
  flattenEffectGroupMessages(node.battleEffects, into);
  for (const action of node.reactions) flattenActionMessages(action, into);
  return into;
}

export function flattenRoundMessages<P extends BattleBuilderParams<P>>(
  round: RoundReciept<P>,
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
  battle: BattleReciept<P>,
  into: BattleMessage<P>[] = []
) {
  for (const round of battle.rounds) flattenRoundMessages(round, into);
  into.push(...battle.messages);
  return into;
}
