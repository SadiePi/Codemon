export class CircularRefBuilder<T extends Record<string, unknown>> {
  private readonly builders: [T, () => T][] = [];

  public register(builder: () => T): T {
    const placeholder = {} as T;
    this.builders.push([placeholder, builder]);
    return placeholder;
  }

  public build() {
    this.builders.map(b => Object.assign(b[0], b[1]()));
  }
}

export type NonEmptyPartial<T extends Record<string, unknown>, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type NonEmptyArray<T> = [T, ...T[]];

export function weightedRandom<T>(entries: [T, number][]): T {
  const total = entries.reduce((a, b) => a + b[1], 0);
  const rand = Math.random() * total;
  let current = 0;
  for (const [item, weight] of entries) {
    current += weight;
    if (rand < current) return item;
  }
  throw new Error("Weighted random failed");
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

export type Randomizer<T> = T extends Array<unknown>
  ? never // TODO: support arrays somehow
  :
      | T // literal
      | NonEmptyArray<T> // unweighted random
      | NonEmptyArray<[T, number]>; // weighted random

export function randomize<T>(randomizer: Randomizer<T>): T {
  return Array.isArray(randomizer)
    ? Array.isArray(randomizer[0])
      ? weightedRandom(randomizer)
      : unweightedRandom(randomizer)
    : randomizer;
}

export type MultiRandomizer<T extends Record<string, unknown>> = {
  [K in keyof T]: Randomizer<T[K]>;
};

export function multiRandomize<T extends Record<string, unknown>>(randomizer: MultiRandomizer<T>): T {
  return Object.fromEntries(Object.entries(randomizer).map(([key, value]) => [key, randomize(value)])) as T;
}
