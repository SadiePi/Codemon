import {
  Ability,
  MoveEntry,
  TargetContext,
  effectAction,
  permanent,
  TraditionalBBP as T,
  TargetEffectsReciept,
} from "../mod.ts";

export const AngerPoint: Ability = {
  name: "Anger Point",
  description: "The Pokémon is angered when it takes a critical hit, and that maxes its Attack stat.",
  slot: "ability",

  apply: ({ self }) => {
    function maximizeAttackStageOnCritical(
      reciept: TargetEffectsReciept<T>,
      { action, battle, source }: TargetContext<T>
    ) {
      if (!(source instanceof MoveEntry)) return;
      if (!reciept.attack) return;

      action.reactions.add(
        effectAction({
          battle,
          user: self,
          targets: [self],
          effect: {
            stages: { attack: Infinity }, // will get replaced by config.stats.maxStage
          },
        })
      );
    }

    return {
      name: AngerPoint.name,
      activate: () => {
        self.on("effectReciept", maximizeAttackStageOnCritical);
      },
      deactivate: () => {
        self.off("effectReciept", maximizeAttackStageOnCritical);
      },
      expiry: permanent,
    };
  },
};
