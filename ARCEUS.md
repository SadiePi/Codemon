# Arceus

The boilerplate code for a Codex is quite cumbersome and easy to get wrong. It's done this way to enable Intellisense and type checking, but it's still a pain to write. Arceus is a script that generates the boilerplate code for you based on a JSON file.

To begin creation of a new Codex, create the file `arceus.json` in the root directory of your Codex. See [the Arceus file for the full Pokédex](./codex/pokemon/arceus.json) for an example. The required interface is:

```jsonc
{
  name: string, // the name of your Codex, used throughout the boilerplate code
  format: "nested" | "spread" | "flat", // should each entry be its own file, each category be in its own file, or all in one file?
  library?: string, // the Codemon library to use. currently defaults to "../../src/index.ts" for development
  import?: string | string[], // which codexes to import into this one, if any
  export?: string, // the mod/index file to export from, defaults to "mod.ts"

  // the names of the entries in each category
  // these will be the names in the code, so make sure they're valid
  // display names will default to these but can be changed
  abilities?: string[],
  experience?: string[] // experience groups
  genders?: string[], // 🏳️‍⚧️
  items?: string[],
  locales?: string[],
  moves?: string[],
  natures?: string[],
  species?: string[],
  statuses?: string[], // status effects
  strategies?: string[], // strategies for the battle AI
  trainers?: string[], // more complicated than it sounds currently, wip
  types?: string[],
  weathers?: string[],

  // special entries that the library needs to know about
  struggle: string, // which move to struggle with
  wild: string, // the strategy wild Pokémon use
}
```

Then run `/src/arceus.ts` in the same directory. This will generate the boilerplate code for your Codex. **Any names that don't have entries will be added; entries that already exist will be left alone; entries that aren't named in the file will be logged and disabled but not deleted.**

## The Boilerplate

This script will always create (and more importantly bulldoze) the following files:

- `loader.ts` - a special file whose default export collects entries for the Codex. It has a few functions, but the only one you need to know is `.register`, which provides placeholder constants for the Codex to point to, allowing circular references between entries. **It takes two functions as parameters: the first takes in the placeholder Codex and returns the new entry, and the optional second takes in the completed Codex and runs any additional setup code, such as adding your types as weaknesses of types imported from another Codex.** The register function itself returns the placeholder entry that will eventually be populated with the defined entry.
- `mod.ts` (or what you chose to call it) - the main entry point of the Codex. It imports the Codex entries and the loader, and then fully populates all the entries in the Codex. It default exports the final Codex.

Depending on the format you chose, it will also create the following files:

- `nested` - each category is a directory with each entry as a file. Best for extremely large projects such as the Pokédex.
- `spread` - each category is a single file with all the entries. **Best for most projects that extend an existing Codex.**
- `flat` - all the entries in a single file. Best for small or example projects.

This structure ensures that everything loads in the correct order to allow circular references between entries, nice Intellisense, and type checking.

## Defining Entries

The placeholder entries will look like this, using `species: ["bulbasaur"]` as an example:

```ts
import { Species } from "../../src/index.ts";
import loader from "./loader.ts";

// vvv this won't be in the actual file
// prettier-ignore
export const Bulbasaur: Species = loader.register<Species>(C => ({
  // placeholder entry
} as Species));
```

You can fill in the details from there by inspecting the `Species` interface. The parameter `C` is the placeholder Codex, which you can use to reference all other entries, though they won't be populated with data. If you need to reference the data of another entry, use the second parameter of the register function instead. **Remove `as Species` when you mean for this to be full defined.**

## Importing Entries

You can import the entire Codex, a single category, or a single entry:

```ts
import P from "./codex/pokemon/mod.ts"; // the entire Codex
import Species from "./codex/pokemon/species/mod.ts"; // a single category
import { Bulbasaur } from "./codex/pokemon/species/mod.ts"; // a single entry
```
