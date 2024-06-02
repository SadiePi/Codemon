import Pokedex from "../codex/pokemon/mod.ts";

for (const [categoryKey, category] of Object.entries(Pokedex))
  for (const [entryKey, entry] of Object.entries(category)) {
    if (typeof entry === "object" && Object.keys(entry).length === 0) continue;
    console.log(`${categoryKey}: ${entryKey}`);
  }
