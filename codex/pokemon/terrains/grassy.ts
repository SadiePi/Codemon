import loader from "../loader.ts";
import {
  Round,
  Terrain,
  roundDuration,
  TraditionalBBP as T,
  effectAction,
  TargetContext,
  Codemon,
  Effects,
  MoveEntry,
  proxy,
} from "../mod.ts";

export const Grassy: Terrain = loader.register(P => ({
  name: "Grassy",
  description:
    "For five turns, the battlefield becomes Grassy Terrain. This restores the HP of Pokémon on the ground a little every turn and powers up Grass-type moves.",
  slot: "terrain",

  apply: ({ battle }) => {
    function restoreHpAfterRound(round: Round<T>) {
      round.reactions.add(
        effectAction({
          battle,
          targets: battle.getCombatants(), // TODO .filter(target => target is grounded)
          effect: {
            hp: ({ target }: TargetContext<T>) => {
              return target.stats.hp.max / 16;
            },
          },
          user: {} as Codemon, // TODO ugh
        })
      );
    }

    function boostGrassTypeMoves(effect: Effects<T>, { source }: TargetContext<T>) {
      // TODO if(target is not grounded) return;
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== P.Types.Grass) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        if (!result.conditions) result.conditions = {};
        result.conditions.terrain = 1.3;
      });
    }

    function halveDamageFromGroundMoves(effect: Effects<T>, { source }: TargetContext<T>) {
      // TODO if(target is not grounded) return;
      if (!(source instanceof MoveEntry)) return;
      if (![P.Moves.Bulldoze, P.Moves.Earthquake, P.Moves.Magnitude].includes(source.effects)) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        if (!result.conditions) result.conditions = {};
        result.conditions.terrain = 1 / 2;
      });
    }

    return {
      name: Grassy.name,
      activate: () => {
        battle.on("round", restoreHpAfterRound);
        battle.on("effect", boostGrassTypeMoves);
        battle.on("effect", halveDamageFromGroundMoves);
      },
      deactivate: () => {
        battle.off("round", restoreHpAfterRound);
        battle.off("effect", boostGrassTypeMoves);
        battle.off("effect", halveDamageFromGroundMoves);
      },
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
