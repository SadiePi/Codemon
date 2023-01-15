# Codemon - FOSS Pokémon library

Codemon is a WIP Pokémon library for Typescript using Deno. It faithfully implements
mechanics from the games, and is designed to be as easy to use as possible.

## Usage

### Spawn a Pokémon

```ts
import P, { Codemon } from "https://deno.land/x/codemon/mod.ts"; // note: not yet published

const charmander = new Codemon({
  species: P.Species.Charmander,
  stats: { level: 5 },
});

console.log(charmander.stats.hp.current);
```

### TODO: More examples

## Codex

The Codex acts as the Pokédex for the library, but with far more information than the games provide. It contains fully detailed information on every species, move, ability, item, and more.

### Species

```ts

## Contributing

I'd prefer for this to remain a mostly solo project. That said, I would appreciate bug reports and PRs to flesh out entries in `codex/pokemon/`.
```

### Arceus files

Arceus files (see `./codex/pokemon/.arceus`) are used to generate the proper structure and placeholder entries for the Codex. 