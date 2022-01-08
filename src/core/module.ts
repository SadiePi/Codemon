type Game = unknown;
export default interface Module {
  name: string;
  version: number;
  description?: string;
  dependencies?: [string, [number, number]?];
  conflicts?: [string, [number, number]?];
  synergies?: [
    before?: [string, [number, number]?],
    after?: [string, [number, number]?]
  ];

  load: (game: Game) => Game;
}
