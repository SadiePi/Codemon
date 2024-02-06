import { Reward, TraditionalBBP as T, Weather } from "./battle/traditional.ts";
import { ActionPlan, ActionUseContext, Battle, ActionContext, Combatant, TargetContext } from "./battle/core/mod.ts";
import { Decider } from "./decision.ts";
import { SingleOrArray } from "./util.ts";
import { StatusEntry } from "./status.ts";
import { StageMods } from "./stats.ts";
import { MoveEntry } from "./move.ts";
import { Terrain } from "./mod.ts";

type LocaleString<Args = undefined> = Decider<SingleOrArray<string>, Args>;

// for brevity
type LS<A> = LocaleString<A>;
type TTC = TargetContext<T>;

// TODO NEXT convert more strings throughout to LocaleStrings
export interface Locale {
  name: string;

  battle: {
    traditional: {
      plan: {
        failed: LS<{ battle: Battle<T>; plan: ActionPlan<T> }>;
      };

      join: LS<{ context: ActionContext<T>; combatant: Combatant<T> }>;
      weather: LS<{ context: ActionContext<T>; weather: Weather }>;
      terrain: LS<{ context: ActionContext<T>; terrain: Terrain }>;
      end: LS<{ context: ActionContext<T> }>;
    };
  };

  codemon: {
    traditional: {
      attack: {
        effectiveness: LS<{ context: TTC; typeEffectiveness: number }>;
        damage: LS<{ context: TTC; total: number }>;
      };
      status: {
        apply: LocaleString<{ context: TTC; entry: StatusEntry<TTC> }>;
      };
      hp: LS<{ context: TTC; difference: number }>;
      stages: LS<{ context: TTC; stages: StageMods }>;
      faint: LS<{ context: TTC }>;
      ball: {
        miss: LS<{ context: TTC }>; // TODO (req miss reasons)
        blocked: LS<{ context: TTC }>; // TODO (req block reasons)
        immediate: LS<{ context: TTC; a: number }>;
        caught: LS<{ context: TTC; a: number; b: number }>;
        escape: LS<{ context: TTC; a: number; b: number; check: number }>;
      };
      reward: LS<{ context: TTC; reward: Reward }>;
      eject: LS<{ context: TTC }>;
      disable: LS<{ context: TTC; move: MoveEntry }>;
    };
  };

  move: {
    use: LS<{ context: ActionUseContext<T>; move: MoveEntry }>;
  };
}
