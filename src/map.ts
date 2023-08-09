import P from "../codex/pokemon/mod.ts";
import { Codemon, SpawnParams } from "./codemon.ts";
import { chance, decide, Decider, choose, range, weighted } from "./decision.ts";

export type SpawnRegionType = "Grass" | "Cave" | "Building" | "Fishing" | "Surfing" | "Midair";
export type SpawnType =
  | SpawnRegionType
  | "Interact"
  | "Trade"
  | "Evolve"
  | "Egg"
  | "Load"
  | "Other"
  | "Swarm"
  | "Headbutt"
  | "Radio";

export interface SpawnRegion {
  type: SpawnRegionType;
  params: Decider<SpawnParams, SpawnContext>;
}

export interface SpawnContext {
  type: SpawnType;
}

export function spawn(params: Decider<SpawnParams, SpawnContext>, context: SpawnContext = { type: "Other" }) {
  return new Codemon(decide<SpawnParams, SpawnContext>(params, context));
}

export interface Gen1SpawnTile extends SpawnRegion {
  probability: Decider<number>; // int up to 255
}

export type SpawnAttemptor<R extends SpawnRegion> = Decider<Codemon | undefined, R>;

export const gen1TryTileStepSpawn: SpawnAttemptor<Gen1SpawnTile> = tile =>
  chance(decide(tile.probability, undefined) / 255, () => spawn(tile.params, { type: tile.type }));

export const gen1KantoRBRoute1SpawnTile: Gen1SpawnTile = {
  type: "Grass",
  probability: range(10, 25),
  params: choose(
    {
      species: P.Species.Pidgey,
      level: range(2, 5),
    },
    {
      species: P.Species.Rattata,
      level: range(2, 4),
    }
  ),
};

export const gen1YKantoRoute1SpawnTile: Gen1SpawnTile = {
  type: "Grass",
  probability: range(10, 25),
  params: weighted(
    {
      effect: {
        species: P.Species.Pidgey,
        level: range(2, 7),
      },
      weight: 7,
    },
    {
      effect: {
        species: P.Species.Rattata,
        level: range(2, 4),
      },
      weight: 3,
    }
  ),
};

export interface Gen2SpawnTile extends Gen1SpawnTile {}

export const gen2KantoGS: Gen2SpawnTile = {
  type: "Grass",
  probability: range(10, 25),
  params: choose(),
};
