# Arceus Files
Arceus files are used to generate the boilerplate code for your Codex, a generalized Pokédex containing every Species, Move, Ability, Item, etc. that you want to use in your game. They use a custom format detailed below to define the names of each entry. To generate the boilerplate code, run `src/core/arceus.ts` in the root directory of your project. Any entries that already have files will be left alone, any entries that don't will be given a corresponding file, and any files that don't have an entry will be disabled (by not importing it into the Codex) but not deleted. NOTE: THIS IS THE PLAN, BUT IT IS NOT YET IMPLEMENTED PROPERLY.

## Format
Arceus files adhere to the following format:
```
```

## Why?
This is done because the code structure required to implement a custom Codex is rather strange and easy to get wrong, not to mention tedious. Why this structure though? Good question. Intellisense. TODO