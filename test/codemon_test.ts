import { assert, iBulby } from "./common.ts";
import { spawn } from "../src/mod.ts";
import C from "../codex/pokemon/mod.ts";

Deno.test("Basics", () => {
  const bulby = spawn(iBulby);

  assert(bulby.getSpecies(false) === C.Species.Bulbasaur);
  assert(bulby.name, "Bulby");
  assert(bulby.gender === C.Genders.Male);
  assert(bulby.nature === C.Natures.Quiet);
  assert(bulby.stats.level === 15);
  // TODO compare stats to expected values
  assert(bulby.moves.length === 4);
  assert(bulby.moves[0].effects === C.Moves.Tackle);
  assert(bulby.moves[1].effects === C.Moves.RazorLeaf);
  assert(bulby.moves[2].effects === C.Moves.StunSpore);
  assert(bulby.moves[3].effects === C.Moves.SolarBeam);
  assert(bulby.ability === C.Abilities.Overgrow);
});

// Vaguely in the same order as the class's code
Deno.test("Species", () => {
  const notBulby = spawn({ species: C.Species.Bulbasaur });
  let species = notBulby.getSpecies();
  assert(species.name === "Bulbasaur");

  notBulby.mutate({ description: "Mutation test" });
  species = notBulby.getSpecies();
  assert(species.description === "Mutation test");
  assert(species.name === "Mutated Bulbasaur");

  notBulby.mutate({ types: [C.Types.Ghost, C.Types.Fire] });
  species = notBulby.getSpecies();
  assert(species.types[0] === C.Types.Ghost);
  assert(species.types[1] === C.Types.Fire);
  assert(species.name === "Mutated Bulbasaur");

  notBulby.mutate({ name: "Mutation Test Bulbasaur" });
  species = notBulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");

  const originalSpecies = notBulby.getSpecies(false);
  assert(originalSpecies.name === "Bulbasaur");
  assert(originalSpecies.description !== "Mutation test");
  assert(originalSpecies.types[0] === C.Types.Grass);
  assert(originalSpecies.types[1] === C.Types.Poison);

  notBulby.setSpecies(C.Species.Ivysaur); // should retain mutations
  species = notBulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");
  assert(species.types[0] === C.Types.Ghost);
  assert(species.types[1] === C.Types.Fire);

  notBulby.setSpecies(C.Species.Bulbasaur, false); // should reset mutations
  species = notBulby.getSpecies();
  assert(species.name === "Bulbasaur");
  assert(species.description !== "Mutation test");
  assert(species.types[0] === C.Types.Grass);
  assert(species.types[1] === C.Types.Poison);
});
Deno.test("Moves", () => {});
Deno.test("Stats", () => {});
Deno.test("Abilities", () => {});
Deno.test("Natures", () => {});
Deno.test("Names", () => {});
Deno.test("Gender", () => {});
Deno.test("Evolutions", () => {});
