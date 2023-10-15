import { Reward, TraditionalBBP as T, Weather } from "./battle/traditional.ts";
import { ActionPlan, ActionUseContext, Battle, BattleContext, Combatant, TargetContext } from "./battle/core/mod.ts";
import { Decider } from "./decision.ts";
import { SingleOrArray } from "./util.ts";
import { StatusEntry } from "./status.ts";
import { StageMods } from "./stats.ts";
import { MoveEntry } from "./move.ts";
import { Terrain } from "./mod.ts";

type LocaleString<Args = undefined> = Decider<SingleOrArray<string>, Args>;

type TTC = TargetContext<T>; // for brevity

// TODO convert more strings throughout to LocaleStrings
export interface Locale {
  name: string;

  battle: {
    traditional: {
      plan: {
        failed: LocaleString<{ battle: Battle<T>; plan: ActionPlan<T> }>;
      };

      join: LocaleString<{ context: BattleContext<T>; combatant: Combatant<T> }>;
      weather: LocaleString<{ context: BattleContext<T>; weather: Weather }>;
      terrain: LocaleString<{ context: BattleContext<T>; terrain: Terrain }>;
      end: LocaleString<{ context: BattleContext<T> }>;
    };
  };

  codemon: {
    traditional: {
      attack: {
        effectiveness: LocaleString<{ context: TTC; typeMultiplier: number }>;
        damage: LocaleString<{ context: TTC; total: number }>;
      };
      status: {
        apply: LocaleString<{ context: TTC; entry: StatusEntry<TTC> }>;
      };
      hp: LocaleString<{ context: TTC; difference: number }>;
      stages: LocaleString<{ context: TTC; stages: StageMods }>;
      faint: LocaleString<{ context: TTC }>;
      ball: {
        immediate: LocaleString<{ context: TTC; a: number }>;
        caught: LocaleString<{ context: TTC; a: number; b: number }>;
        escape: LocaleString<{ context: TTC; a: number; b: number; check: number }>;
      };
      reward: LocaleString<{ context: TTC; reward: Reward }>;
      eject: LocaleString<{ context: TTC }>;
      disable: LocaleString<{ context: TTC; move: MoveEntry }>;
    };
  };

  move: {
    use: LocaleString<{ context: ActionUseContext<T>; move: MoveEntry }>;
  };
}
