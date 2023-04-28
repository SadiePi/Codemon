import { assertEquals, iBulby } from "./common.ts";
import { spawn } from "../src/mod.ts";
import C from "../codex/pokemon/mod.ts";

Deno.test("Basic", () => {
  const bulby = spawn(iBulby);
  console.log("Spawned Bulby");

  assertEquals(bulby.species, C.Species.Bulbasaur);
  console.log("Species is Bulbasaur");
  assertEquals(bulby.name, "Bulby");
  console.log("Name is Bulby");
  assertEquals(bulby.gender, C.Genders.Male);
  console.log("Gender is Male");
  assertEquals(bulby.nature, C.Natures.Quiet);
  console.log("Nature is Quiet");
  assertEquals(bulby.stats.level, 15);
  console.log("Level is 15");
  assertEquals(bulby.moves.length, 4);
  console.log("Moves length is 4");
  assertEquals(bulby.moves[0].effects, C.Moves.Tackle);
  console.log("Move 1 is Tackle");
  assertEquals(bulby.moves[1].effects, C.Moves.VineWhip);
  console.log("Move 2 is Vine Whip");
  assertEquals(bulby.moves[2].effects, C.Moves.RazorLeaf);
  console.log("Move 3 is Razor Leaf");
  assertEquals(bulby.moves[3].effects, C.Moves.SolarBeam);
  console.log("Move 4 is Solar Beam");
  assertEquals(bulby.ability, C.Abilities.Overgrow);
  console.log("Ability is Overgrow");
});

Deno.test("Modifications", () => {
  const bulby = spawn(iBulby);

  // Gender
  bulby.gender = C.Genders.NonBinary;
  assertEquals(bulby.gender.name, "Non-binary");

  // Nature
  bulby.nature = C.Natures.Hasty;
  assertEquals(bulby.nature, C.Natures.Hasty);
  assertEquals(bulby.originalNature, C.Natures.Quiet);

  bulby.setOriginalNature(C.Natures.Brave);
  assertEquals(bulby.originalNature, C.Natures.Brave);
  assertEquals(bulby.nature, C.Natures.Brave);

  bulby.nature = C.Natures.Bold;
  assertEquals(bulby.originalNature, C.Natures.Brave);
  assertEquals(bulby.nature, C.Natures.Bold);

  bulby.setOriginalNature(C.Natures.Impish, false);
  assertEquals(bulby.originalNature, C.Natures.Impish);
  assertEquals(bulby.nature, C.Natures.Bold);

  bulby.resetNature();
  assertEquals(bulby.originalNature, C.Natures.Impish);
  assertEquals(bulby.nature, C.Natures.Impish);

  // Stats
  // see ./stats_test.ts

  // Level & Name
  const ptnl = bulby.stats.pointsToNextLevel;
  // console.log(requiredExp);
  // assertEquals
  bulby.stats.addExp(ptnl);
  assertEquals(bulby.stats.level, 16);
  bulby.species = C.Species.Ivysaur; // TODO make this happen automatically
  bulby.name = "Ivy";
  assertEquals(bulby.species, C.Species.Ivysaur);
  assertEquals(bulby.name, "Ivy");

  bulby.stats.levelUp();
  assertEquals(bulby.stats.level, 17);
  bulby.stats.levelUp();
  assertEquals(bulby.stats.level, 18);

  // Moves
  bulby.learnMove(C.Moves.SwordsDance, 2);
  assertEquals(bulby.moves.length, 4);
  assertEquals(bulby.moves[0].effects, C.Moves.Tackle);
  assertEquals(bulby.moves[1].effects, C.Moves.VineWhip);
  assertEquals(bulby.moves[2].effects, C.Moves.SwordsDance);
  assertEquals(bulby.moves[3].effects, C.Moves.SolarBeam);
  bulby.learnMove(C.Moves.RazorLeaf);
  assertEquals(bulby.moves.length, 5);
  assertEquals(bulby.moves[0].effects, C.Moves.Tackle);
  assertEquals(bulby.moves[1].effects, C.Moves.VineWhip);
  assertEquals(bulby.moves[2].effects, C.Moves.SwordsDance);
  assertEquals(bulby.moves[3].effects, C.Moves.SolarBeam);
  assertEquals(bulby.moves[4].effects, C.Moves.RazorLeaf);

  // Ability
  // TODO redo with a species that has more than one ability
  bulby.ability = 1;
  assertEquals(bulby.ability, C.Abilities.Overgrow);
  bulby.ability = 0;
  assertEquals(bulby.ability, C.Abilities.Overgrow);
  bulby.ability = "hidden";
  assertEquals(bulby.ability, C.Abilities.Chlorophyll);
  bulby.ability = C.Abilities.SandVeil;
  assertEquals(bulby.ability, C.Abilities.SandVeil);
});

Deno.test("Evolution", async () => {
  const bulby = spawn({
    species: C.Species.Bulbasaur,
    stats: { level: 15 },
  });

  let options = bulby.getDesiredEvolutions();
  assertEquals(options, []);
  console.log("No evolutions available at level 15");

  bulby.stats.addExp(bulby.stats.pointsToNextLevel);
  assertEquals(bulby.stats.level, 16);
  console.log("Now level 16");

  options = bulby.getDesiredEvolutions();
  assertEquals(options.length, 1);
  assertEquals(options[0].species, C.Species.Ivysaur);
  console.log("Ivysaur is available");

  bulby.evolve(options[0]);
  assertEquals(bulby.species, C.Species.Ivysaur);
  console.log("Bulby is now Ivysaur");

  await bulby.stats.levelUp(15);
  assertEquals(bulby.stats.level, 31);
  console.log("Bulby is now level 31");

  options = bulby.getDesiredEvolutions();
  assertEquals(options.length, 0);
  console.log("No evolutions available at level 31");

  await bulby.stats.levelUp();
  assertEquals(bulby.stats.level, 32);
  console.log("Bulby is now level 32");

  options = bulby.getDesiredEvolutions();
  assertEquals(options.length, 1);
  assertEquals(options[0].species, C.Species.Venusaur);
  console.log("Venusaur is available");

  bulby.evolve(options[0]);
  assertEquals(bulby.species, C.Species.Venusaur);
  console.log("Bulby is now Venusaur");
  console.log("Evolution chain complete");
});
