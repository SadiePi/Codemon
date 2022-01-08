import { PermanentStat } from "../core/stats.ts";
import Natures from "../core/nature.ts";

const PS = PermanentStat;
const Hardy = (Natures.Hardy = {
  name: "Hardy",
  buff: PS.Attack,
  nerf: PS.Attack,
});
const Lonely = (Natures.Lonely = {
  name: "Lonely",
  buff: PS.Attack,
  nerf: PS.Defense,
});
const Brave = (Natures.Brave = {
  name: "Brave",
  buff: PS.Attack,
  nerf: PS.Speed,
});
const Adamant = (Natures.Adamant = {
  name: "Adamant",
  buff: PS.Attack,
  nerf: PS.SpecialAttack,
});
const Naughty = (Natures.Naughty = {
  name: "Naughty",
  buff: PS.Attack,
  nerf: PS.SpecialDefense,
});
const Bold = (Natures.Bold = {
  name: "Bold",
  buff: PS.Defense,
  nerf: PS.Attack,
});
const Docile = (Natures.Docile = {
  name: "Docile",
  buff: PS.Defense,
  nerf: PS.Defense,
});
const Relaxed = (Natures.Relaxed = {
  name: "Relaxed",
  buff: PS.Defense,
  nerf: PS.Speed,
});
const Impish = (Natures.Impish = {
  name: "Impish",
  buff: PS.Defense,
  nerf: PS.SpecialAttack,
});
const Lax = (Natures.Lax = {
  name: "Lax",
  buff: PS.Defense,
  nerf: PS.SpecialDefense,
});
const Timid = (Natures.Timid = {
  name: "Timid",
  buff: PS.Speed,
  nerf: PS.Attack,
});
const Hasty = (Natures.Hasty = {
  name: "Hasty",
  buff: PS.Speed,
  nerf: PS.Defense,
});
const Serious = (Natures.Serious = {
  name: "Serious",
  buff: PS.Speed,
  nerf: PS.Speed,
});
const Jolly = (Natures.Jolly = {
  name: "Jolly",
  buff: PS.Speed,
  nerf: PS.SpecialAttack,
});
const Naive = (Natures.Naive = {
  name: "Naive",
  buff: PS.Speed,
  nerf: PS.SpecialDefense,
});
const Modest = (Natures.Modest = {
  name: "Modest",
  buff: PS.SpecialAttack,
  nerf: PS.Attack,
});
const Mild = (Natures.Mild = {
  name: "Mild",
  buff: PS.SpecialAttack,
  nerf: PS.Defense,
});
const Quiet = (Natures.Quiet = {
  name: "Quiet",
  buff: PS.SpecialAttack,
  nerf: PS.Speed,
});
const Bashful = (Natures.Bashful = {
  name: "Bashful",
  buff: PS.SpecialAttack,
  nerf: PS.SpecialAttack,
});
const Rash = (Natures.Rash = {
  name: "Rash",
  buff: PS.SpecialAttack,
  nerf: PS.SpecialDefense,
});
const Calm = (Natures.Calm = {
  name: "Calm",
  buff: PS.SpecialDefense,
  nerf: PS.Attack,
});
const Gentle = (Natures.Gentle = {
  name: "Gentle",
  buff: PS.SpecialDefense,
  nerf: PS.Defense,
});
const Sassy = (Natures.Sassy = {
  name: "Sassy",
  buff: PS.SpecialDefense,
  nerf: PS.Speed,
});
const Careful = (Natures.Careful = {
  name: "Careful",
  buff: PS.SpecialDefense,
  nerf: PS.SpecialAttack,
});
const Quirky = (Natures.Quirky = {
  name: "Quirky",
  buff: PS.SpecialDefense,
  nerf: PS.SpecialDefense,
});

export default {
  Hardy,
  Lonely,
  Brave,
  Adamant,
  Naughty,
  Bold,
  Docile,
  Relaxed,
  Impish,
  Lax,
  Timid,
  Hasty,
  Serious,
  Jolly,
  Naive,
  Modest,
  Mild,
  Quiet,
  Bashful,
  Rash,
  Calm,
  Gentle,
  Sassy,
  Careful,
  Quirky,
};
