import { SignalBeam } from "../codex/pokemon/moves/signalBeam.ts";
import { Codemon } from "./codemon.ts";
import { Decider, decide } from "./decision.ts";

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

export type DeepImmutable<T> = {
  readonly [P in keyof T]: T[P] extends Array<infer U>
    ? ReadonlyArray<DeepImmutable<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepImmutable<U>>
    : DeepImmutable<T[P]>;
};

export function TODO<T>(message: string, error?: false, placeholder?: Decider<T>): T;
export function TODO<T>(message: string, error: true): never;
export function TODO<T>(message: string, error = false, placeholder?: Decider<T>): T | never {
  if (error) throw new Error(`TODO: ${message}`);
  console.warn(`TODO: ${message}`);
  if (placeholder) return decide(placeholder, undefined);
  return { todo: message } as T;
}

/**
 * Sequentially processes an array of items with a given async callback function.
 *
 * @template T The type of items in the input array.
 * @template U The type of results.
 * @param {T[]} items The array of items to be processed.
 * @param {(item: T, index: number) => Promise<U>} callback The async function that processes an item.
 * @param {number} [concurrency=1] The maximum number of concurrent promises. Defaults to 1.
 * @returns {Promise<U[]>} A promise that resolves with an array of results once all items have been processed.
 *                          The result for an item is at the same index as the item in the input array.
 *                          If any promise rejects, the function rejects with the same reason.
 *
 * @example
 * const items = [1, 2, 3, 4, 5];
 * const callback = (item, index) => new Promise((resolve) => setTimeout(() => resolve(item * 2), 100 * item));
 * sequentialAsync(items, callback, 2)
 *     .then(console.log)  // Logs: [2, 4, 6, 8, 10]
 *     .catch(console.error);
 */
export function sequentialAsync<T, U>(
  items: T[],
  callback: (item: T, index: number) => Promise<U>,
  concurrency = 1
): Promise<U[]> {
  return new Promise((resolve, reject) => {
    const results: U[] = [];
    let index = 0;
    let running = 0;
    function run() {
      while (running < concurrency && index < items.length) {
        running++;
        callback(items[index], index)
          .then(result => {
            results.push(result);
            running--;
            run();
          })
          .catch(reject);
        index++;
      }
      if (running === 0) resolve(results);
    }
    run();
  });
  // thanks copilot 👍
}

// TODO use this?
type Signaler<Args extends Array<unknown>, SignalArgs extends Array<unknown> = []> = (
  signal: (...args: SignalArgs) => void,
  ...args: Args
) => void;

const _levelupsignal: (level: number) => Signaler<[self: Codemon]> = level => (signal, self) => {
  self.stats.on("levelUp", lup => {
    if (level >= lup.newLevel) signal();
  });
};

const bulbasaurToIvysaurLevelupSignal = _levelupsignal(16);

bulbasaurToIvysaurLevelupSignal(() => {
  // evolve `self`to ivysaur
}, {} as Codemon);
