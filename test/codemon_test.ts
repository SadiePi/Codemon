import { assert, iBulby } from "./common.ts";
import { spawn } from "../src/mod.ts";
import C from "../codex/pokemon/mod.ts";

Deno.test("Basics", () => {
  const bulby = spawn(iBulby);
  console.log("Spawned Bulby");

  assert(bulby.getSpecies(false) === C.Species.Bulbasaur);
  console.log("Species is Bulbasaur");
  assert(bulby.name, "Bulby");
  console.log("Name is Bulby");
  assert(bulby.gender === C.Genders.Male);
  console.log("Gender is Male");
  assert(bulby.nature === C.Natures.Quiet);
  console.log("Nature is Quiet");
  assert(bulby.stats.level === 15);
  console.log("Level is 15");
  // TODO compare stats to expected values
  assert(bulby.moves.length === 4);
  console.log("Moves length is 4");
  assert(bulby.moves[0].effects === C.Moves.Tackle);
  console.log("Move 1 is Tackle");
  assert(bulby.moves[1].effects === C.Moves.RazorLeaf);
  console.log("Move 2 is Razor Leaf");
  assert(bulby.moves[2].effects === C.Moves.StunSpore);
  console.log("Move 3 is Stun Spore");
  assert(bulby.moves[3].effects === C.Moves.SolarBeam);
  console.log("Move 4 is Solar Beam");
  assert(bulby.ability === C.Abilities.Overgrow);
  console.log("Ability is Overgrow");
});

// Vaguely in the same order as the class's code
Deno.test("Species", () => {
  const notBulby = spawn({ species: C.Species.Bulbasaur });
  let species = notBulby.getSpecies();
  assert(species.name === "Bulbasaur");
  console.log("Species is Bulbasaur");

  console.log("Mutating species description");
  notBulby.mutate({ description: "Mutation test" });
  species = notBulby.getSpecies();
  assert(species.description === "Mutation test");
  console.log("Species description is Mutation test");
  assert(species.name === "Mutated Bulbasaur");
  console.log("Species name is Mutated Bulbasaur");

  console.log("Mutating species types");
  notBulby.mutate({ types: [C.Types.Ghost, C.Types.Fire] });
  species = notBulby.getSpecies();
  assert(species.types[0] === C.Types.Ghost);
  console.log("Species type 1 is Ghost");
  assert(species.types[1] === C.Types.Fire);
  console.log("Species type 2 is Fire");
  assert(species.name === "Mutated Bulbasaur");
  console.log("Species name is still Mutated Bulbasaur");

  console.log("Mutating species name");
  notBulby.mutate({ name: "Mutation Test Bulbasaur" });
  species = notBulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  console.log("Species name is Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");
  console.log("Species description is Mutation test");

  const originalSpecies = notBulby.getSpecies(false);
  assert(originalSpecies.name === "Bulbasaur");
  console.log("Original species name is Bulbasaur");
  assert(originalSpecies.description !== "Mutation test");
  console.log("Original species description is not Mutation test");
  assert(originalSpecies.types[0] === C.Types.Grass);
  console.log("Original species type 1 is Grass");
  assert(originalSpecies.types[1] === C.Types.Poison);
  console.log("Original species type 2 is Poison");

  notBulby.setSpecies(C.Species.Ivysaur); // should retain mutations
  species = notBulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  console.log("Species name is Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");
  console.log("Species description is Mutation test");
  assert(species.types[0] === C.Types.Ghost);
  console.log("Species type 1 is Ghost");
  assert(species.types[1] === C.Types.Fire);
  console.log("Species type 2 is Fire");

  notBulby.setSpecies(C.Species.Bulbasaur, false); // should reset mutations
  species = notBulby.getSpecies();
  assert(species.name === "Bulbasaur");
  console.log("Species name is Bulbasaur");
  assert(species.description !== "Mutation test");
  console.log("Species description is not Mutation test");
  assert(species.types[0] === C.Types.Grass);
  console.log("Species type 1 is Grass");
  assert(species.types[1] === C.Types.Poison);
  console.log("Species type 2 is Poison");
});
Deno.test("Moves", () => {});
Deno.test("Stats", () => {});
Deno.test("Abilities", () => {});
Deno.test("Natures", () => {});
Deno.test("Names", () => {});
Deno.test("Gender", () => {});
Deno.test("Evolutions", () => {});
