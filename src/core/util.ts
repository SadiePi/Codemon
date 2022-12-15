export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

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

export function randomChoice<T>(entries: T[]): T {
  return entries[Math.floor(Math.random() * entries.length)];
}

export function placeholder<T>(): T {
  return {} as T;
}
