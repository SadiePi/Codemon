import { Decider } from "./decision.ts";
import { ActionSource, Battle, Combatant, TargetChoice, BattleBuilderParams } from "./battle/core/mod.ts";

export interface Strategy<P extends BattleBuilderParams<P>> {
  chooseAction: Decider<ActionSource<P>, { combatant: Combatant<P>; battle: Battle<P> }>;
  chooseTarget: Decider<
    Combatant<P>[],
    { action: ActionSource<P>; combatant: Combatant<P>; choice: TargetChoice<P>; battle: Battle<P> }
  >;
}

export type Trainer<P extends BattleBuilderParams<P>> = {
  [K in P["name"] as `${K}Strategy`]: Strategy<P>;
  // TODO
};
