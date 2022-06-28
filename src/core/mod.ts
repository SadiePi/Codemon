// deno-lint-ignore-file no-unused-vars
export type Game = unknown;
export interface GameLoad extends Record<string, unknown> {
  nextLoadConfig?: ModConfig;
}
export type Patch = (current: GameLoad, config: ModConfig) => GameLoad | void;

export type ModConfig = Record<string, unknown>;
export type Mod = {
  name?: string;
  description?: string;
  uuid: string;
  dependencies?: [...uuids: string[]];
  incompatabilities?: [...uuids: string[]];
  config?: Record<string, unknown>;
  patches: {
    uuids: string[];
    pre?: Patch;
    shims?: {
      [uuid: string]: Patch;
    };
    post?: Patch;
  }[];
};

export const base: Mod = {
  uuid: "0",
  config: {
    directories: {
      species: ["../base/species.ts"],
      types: ["../base/types.ts"],
    },
  },
  patches: [],
};
export function Load(mods: Mod[], includeBase = true): Game {
  if (includeBase && mods[0] !== base) mods = [base, ...mods];

  const load: GameLoad = { nextLoadConfig: mods[0].config };
  mods.forEach(m => _load([base], mods, load));
  return load as Game;
}

function _load(_context: Mod[], mods: Mod[], gameLoad: GameLoad): GameLoad {
  mods.forEach(m => {
    let patch: Patch;
    m.patches
      .sort(p => -p.uuids.length)
      .forEach(p => {
        const match = true;
        // check if uuids in context list
        if (match && p.pre) patch = p.pre;
      });
  });
  return gameLoad;
}
