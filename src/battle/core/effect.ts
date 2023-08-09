import { Decider } from "../../decision.ts";
import { DeepImmutable } from "../../util.ts";
import {
  Battle,
  BattleBuilderParams,
  BattleContext,
  BattleMessage,
  Combatant,
  EffectGroups,
  SourceContext,
  TargetContext,
} from "./index.ts";

export type TargetingCategory<P extends BattleBuilderParams<P>> =
  | Decider<
      boolean,
      {
        battle: Battle<P>;
        combatant: Combatant<P>;
        // team: Team<P>,
      }
    >
  | {
      alignment: "Self";
    }
  | ({
      quantity?: number | "All"; // default 1
      position?: "Adjacent" | "Non-Adjacent" | "Any"; // default Adjacent
      selection?: "Player" | "Random" | Decider<Combatant<P>[], Combatant<P>[]>; // default Player
    } & (
      | {
          alignment: "Foe";
        }
      | {
          alignment?: "Ally" | "Any"; // default Any
          includeSelf?: boolean;
        }
    ));

export type TargetEffectParams<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P, P["target"]>;
export type SourceEffectParams<P extends BattleBuilderParams<P>> = EffectGroupEffects<SourceContext<P>, P, P["source"]>;
export type BattleEffectParams<P extends BattleBuilderParams<P>> = EffectGroupEffects<BattleContext<P>, P, P["battle"]>;
export type EffectParams<P extends BattleBuilderParams<P>> = TargetEffectParams<P> &
  SourceEffectParams<P> &
  BattleEffectParams<P>;

export type EffectType<Context, Effect, P extends BattleBuilderParams<P>, Extra = Record<never, never>> = {
  effect: Decider<Effect | undefined, Context>;
  reciept: EffectTypeReciept<P, Effect, Extra>;
};

export type EffectTypeReciept<P extends BattleBuilderParams<P>, E, Extra = Record<never, never>> = DeepImmutable<
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
export type EffectGroupReciept<Context, P extends BattleBuilderParams<P>, G extends EffectGroup<Context, P>> = {
  [K in keyof G]: G[K]["reciept"];
} & {
  remove?: boolean;
};

export type GroupContext<P extends BattleBuilderParams<P>, Group extends EffectGroups> = Group extends "target"
  ? TargetContext<P>
  : Group extends "source"
  ? SourceContext<P>
  : Group extends "battle"
  ? BattleContext<P>
  : never; // in case we ever add more groups

export type EffectReceiver<P extends BattleBuilderParams<P>, Group extends EffectGroups> = {
  [G in Group as `receive${Capitalize<P["name"]>}${Capitalize<G>}Effects`]: (
    group: Partial<EffectGroupEffects<GroupContext<P, G>, P, P[G]>>,
    context: GroupContext<P, G>
  ) => Partial<EffectGroupReciept<GroupContext<P, G>, P, P[G]>> | null;
} & {
  [G in Group]: {
    [Effect in keyof P[G] & string as `receive${Capitalize<P["name"]>}${Capitalize<Effect>}`]: (
      effect: P[G][Effect]["effect"],
      context: GroupContext<P, G>
    ) => P[G][Effect]["reciept"];
  };
}[Group];

export type EffectGroupEffects<C, P extends BattleBuilderParams<P>, G extends EffectGroup<C, P>> = {
  [K in keyof G]?: G[K]["effect"];
};

export type BaseEffectSource<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P, P["target"]> &
  EffectGroupEffects<SourceContext<P>, P, P["source"]> &
  EffectGroupEffects<BattleContext<P>, P, P["battle"]> & {
    name: string;
    description: string;
    target: TargetingCategory<P>;
  };

export type TargetEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<TargetContext<P>, P, P["target"]>;
export type SourceEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<SourceContext<P>, P, P["source"]>;
export type BattleEffects<P extends BattleBuilderParams<P>> = EffectGroupEffects<BattleContext<P>, P, P["battle"]>;
export type Effects<P extends BattleBuilderParams<P>> = TargetEffects<P> & SourceEffects<P> & BattleEffects<P>;

export type TargetEffectsReciept<P extends BattleBuilderParams<P>> = EffectGroupReciept<
  TargetContext<P>,
  P,
  P["target"]
>;
export type SourceEffectsReciept<P extends BattleBuilderParams<P>> = EffectGroupReciept<
  SourceContext<P>,
  P,
  P["source"]
>;
export type BattleEffectsReciept<P extends BattleBuilderParams<P>> = EffectGroupReciept<
  BattleContext<P>,
  P,
  P["battle"]
>;
export type EffectsReciept<P extends BattleBuilderParams<P>> = TargetEffectsReciept<P> &
  SourceEffectsReciept<P> &
  BattleEffectsReciept<P>;
