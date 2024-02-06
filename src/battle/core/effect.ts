import { Decider } from "../../decision.ts";
import { DeepImmutable } from "../../util.ts";
import {
  Battle,
  BattleBuilderParams,
  ActionContext,
  BattleMessage,
  Combatant,
  EffectGroups,
  TargetContext,
} from "./mod.ts";

type CommonTargetingOptions<P extends BattleBuilderParams<P>> = {
  quantity?: number | "All";
  position?: "Adjacent" | "Non-Adjacent" | "Any";
  selection?: "Player" | "Random" | Decider<Combatant<P>[], Combatant<P>[]>;
};
type FoeTargeting<P extends BattleBuilderParams<P>> = CommonTargetingOptions<P> & { alignment: "Foe" };
type AllyOrAnyTargeting<P extends BattleBuilderParams<P>> = CommonTargetingOptions<P> & {
  alignment?: "Ally" | "Any";
  includeSelf?: boolean;
};
type SelfTargeting = { alignment: "Self" };
type TargetingParams<P extends BattleBuilderParams<P>> = { battle: Battle<P>; combatant: Combatant<P> };
type DeciderTargeting<P extends BattleBuilderParams<P>> = Decider<boolean, TargetingParams<P>>;
export type TargetingCategory<P extends BattleBuilderParams<P>> =
  | DeciderTargeting<P>
  | SelfTargeting
  | FoeTargeting<P>
  | AllyOrAnyTargeting<P>;

export type TargetEffectParams<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P, P["target"]>;
export type SourceEffectParams<P extends BattleBuilderParams<P>> = EffectGroupEffects<ActionContext<P>, P, P["source"]>;
export type BattleEffectParams<P extends BattleBuilderParams<P>> = EffectGroupEffects<ActionContext<P>, P, P["battle"]>;
export type EffectParams<P extends BattleBuilderParams<P>> = TargetEffectParams<P> &
  SourceEffectParams<P> &
  BattleEffectParams<P>;

export type EffectType<Context, Effect, P extends BattleBuilderParams<P>, Extra = Record<never, never>> = {
  effect: Decider<Effect | undefined, Context>;
  receipt: EffectTypeReceipt<P, Effect, Extra>;
};

export type EffectTypeReceipt<P extends BattleBuilderParams<P>, E, Extra = Record<never, never>> = DeepImmutable<
  | ({
      success: true;
      messages: BattleMessage<P>[];
      actual: E;
    } & Extra)
  | {
      success: false;
      messages: BattleMessage<P>[];
    }
>;

export type EffectGroup<Context, P extends BattleBuilderParams<P>> = Record<
  string,
  EffectType<Context, unknown, P, unknown>
>;
export type EffectGroupReceipt<Context, P extends BattleBuilderParams<P>, G extends EffectGroup<Context, P>> = {
  [K in keyof G]: G[K]["receipt"];
} & {
  remove?: boolean;
};

export type GroupContext<P extends BattleBuilderParams<P>, Group extends EffectGroups> = Group extends "target"
  ? TargetContext<P>
  : Group extends "source"
  ? ActionContext<P>
  : Group extends "battle"
  ? ActionContext<P>
  : never; // in case we ever add more groups

export type EffectReceiver<P extends BattleBuilderParams<P>, Group extends EffectGroups> = {
  [G in Group as `receive${Capitalize<P["name"]>}${Capitalize<G>}Effects`]: (
    group: Partial<EffectGroupEffects<GroupContext<P, G>, P, P[G]>>,
    context: GroupContext<P, G>
  ) => Partial<EffectGroupReceipt<GroupContext<P, G>, P, P[G]>> | null;
} & {
  [G in Group]: {
    [Effect in keyof P[G] & string as `receive${Capitalize<P["name"]>}${Capitalize<Effect>}`]: (
      effect: P[G][Effect]["effect"],
      context: GroupContext<P, G>
    ) => P[G][Effect]["receipt"];
  };
}[Group];

export type EffectGroupEffects<C, P extends BattleBuilderParams<P>, G extends EffectGroup<C, P>> = {
  [K in keyof G]?: G[K]["effect"];
};

export type BaseEffectSource<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P, P["target"]> &
  EffectGroupEffects<ActionContext<P>, P, P["source"]> &
  EffectGroupEffects<ActionContext<P>, P, P["battle"]> & {
    name: string;
    description: string;
    target: TargetingCategory<P>;
  };

export type TargetEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P, P["target"]>;
export type SourceEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<ActionContext<P>, P, P["source"]>;
export type BattleEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<ActionContext<P>, P, P["battle"]>;
export type Effects<P extends BattleBuilderParams<P>> = TargetEffects<P> & SourceEffects<P> & BattleEffects<P>;

export type TargetEffectsReceipt<P extends BattleBuilderParams<P>> = EffectGroupReceipt<
  TargetContext<P>,
  P,
  P["target"]
>;
export type SourceEffectsReceipt<P extends BattleBuilderParams<P>> = EffectGroupReceipt<
  ActionContext<P>,
  P,
  P["source"]
>;
export type BattleEffectsReceipt<P extends BattleBuilderParams<P>> = EffectGroupReceipt<
  ActionContext<P>,
  P,
  P["battle"]
>;
export type EffectsReceipt<P extends BattleBuilderParams<P>> = TargetEffectsReceipt<P> &
  SourceEffectsReceipt<P> &
  BattleEffectsReceipt<P>;
