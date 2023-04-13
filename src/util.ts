export type NonEmptyArray<T> = [T, ...T[]];
export type NonEmptyPartial<T extends Record<string, unknown>, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface WeightedRandomEntry<T> {
  entry: T;
  weight: number;
}
export function weightedRandom<T>(entries: WeightedRandomEntry<T>[]): T {
  const total = entries.reduce((a, b) => a + b.weight, 0);
  const rand = Math.random() * total;
  let current = 0;
  for (const { entry, weight } of entries) {
    current += weight;
    if (rand < current) return entry;
  }
  throw new Error("Weighted random failed!");
}

export function unweightedRandom<T>(entries: T[]): T {
  return entries[Math.floor(Math.random() * entries.length)];
}

export type RangeOrExact =
  | number
  | {
      min: number;
      max: number;
    };

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type Immutable<T> = { readonly [P in keyof T]: T[P] };

// https://stackoverflow.com/questions/68988148/how-to-create-a-type-that-yields-keys-of-an-object-that-match-a-given-type
export type KeysAssignableFrom<T, V> = { [K in keyof T]-?: [V] extends [T[K]] ? K : never }[keyof T];

export type SingleOrArray<T> = T | T[];

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export function TODO<T>(message: string, mode: "warn"): T;
export function TODO<T>(message: string, mode: "error"): never;
export function TODO<T>(message: string, mode: "warn" | "error" = "warn"): T | never {
  if (mode === "warn") {
    console.warn(`TODO: ${message}`);
    return { todo: message } as T;
  }
  throw new Error(message);
}
