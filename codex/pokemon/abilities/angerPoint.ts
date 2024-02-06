import {
  Ability,
  MoveEntry,
  TargetContext,
  effectAction,
  permanent,
  TraditionalBBP as T,
  TargetEffectsReceipt,
} from "../mod.ts";

export const AngerPoint: Ability = {
  name: "Anger Point",
  description: "The Pokémon is angered when it takes a critical hit, and that maxes its Attack stat.",
  slot: "ability",

  apply: ({ self }) => {
    function maximizeAttackStageOnCritical(
      receipt: TargetEffectsReceipt<T>,
      { action, battle, source }: TargetContext<T>
    ) {
      if (!(source instanceof MoveEntry)) return;
      if (!receipt.attack) return;

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
        self.on("effectReceipt", maximizeAttackStageOnCritical);
      },
      deactivate: () => {
        self.off("effectReceipt", maximizeAttackStageOnCritical);
      },
      expiry: permanent,
    };
  },
};
