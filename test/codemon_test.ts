import { assertEquals, iBulby } from "./common.ts";
import C, { spawn } from "../src/index.ts";

Deno.test("Basic", () => {
  const bulby = spawn(iBulby);

  assertEquals(bulby.species, C.Species.Bulbasaur);
  assertEquals(bulby.name, "Bulby");
  assertEquals(bulby.gender, C.Genders.Male);
  assertEquals(bulby.nature, C.Natures.Quiet);
  assertEquals(bulby.stats.level, 15);
  assertEquals(bulby.moves.length, 4);
  assertEquals(bulby.moves[0].effects, C.Moves.Tackle);
  assertEquals(bulby.moves[1].effects, C.Moves.VineWhip);
  assertEquals(bulby.moves[2].effects, C.Moves.RazorLeaf);
  assertEquals(bulby.moves[3].effects, C.Moves.SolarBeam);
  assertEquals(bulby.ability, C.Abilities.Overgrow);
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
