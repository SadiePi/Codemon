const CATEGORIES = [
  ["abilities", "Ability"],
  ["experience", "ExperienceGroup"],
  ["genders", "Gender"],
  ["items", "Item"],
  ["locales", "Locale"],
  ["moves", "Move"],
  ["natures", "Nature"],
  ["species", "Species"],
  ["statuses", "StatusEffect"],
  ["strategies", "Strategy"],
  ["trainers", "Trainer"],
  ["types", "Type"],
  ["weathers", "Weather"],
] as const;
type CATEGORIES = typeof CATEGORIES;

interface Arceus extends Partial<Record<CATEGORIES[number][0], string[]>> {
  name: string;
  format: "nested" | "spread" | "flat";
  import?: {
    name: string;
    path: string;
  }[];
  library?: string;

  // special entries that the library needs to know about
  struggle: string; // which move to struggle with
  wild: string; // the strategy wild Pokémon use
}

const wd = Deno.cwd();
console.log(`Working directory: ${wd}`);

// check for an arceus file
try {
  Deno.statSync(`${wd}/arceus.json`);
} catch (e) {
  if (e instanceof Deno.errors.NotFound) {
    console.log("Arceus file not found");
    Deno.exit(1);
  }
  throw e;
}

console.log("Reading arceus file");
const arceus = JSON.parse(Deno.readTextFileSync(`${wd}/arceus.json`)) as Arceus;
const library = arceus.library ?? "../../src/mod.ts";
const letter = arceus.name[0].toUpperCase();

const loader = `import { ${arceus.name} } from "./mod.ts";
import { CodexBuilder } from "${arceus.library ?? "../../src/codex.ts"}";
const loader: CodexBuilder<${arceus.name}> = new CodexBuilder<${arceus.name}>();
export default loader;
`;

function header(name: string) {
  return `import { ${name} } from "${library}";
import loader from "./loader.ts";
`;
}

function entry(name: string, type: string) {
  return `export const ${name}: ${type} = loader.register<${type}>(${letter} => ({
  // placeholder
} as ${type}));  
`;
}

// create the text for each entry
const categories = CATEGORIES.map(([category, type]) => {
  return arceus[category]?.map(name => entry(name, type)) ?? [];
});

function toFileName(name: string) {
  return `${name[0].toLowerCase()}${name.slice(1)}.ts`;
}

function flatMod(): string {
  const imports = [arceus.import ?? []]
    .flat()
    .map(i => `import ${i.name} from "${i.path}";`)
    .join("\n");
  const loader = `import loader from "./loader.ts";`;

  const entries = CATEGORIES.map(([category, type]) => {
    return arceus[category]?.map(name => `${name}: ${name},`).join("\n\n");
  }).join("\n\n");

  const codex = `export const ${arceus.name} = {
  ${[arceus.import ?? []]
    .flat()
    .map(i => `...${i.name},`)
    .join(",")}`;

  return ""; // TODO complete this
}

function spreadCategoryFile(type: string, entries: string[]) {
  return `${header(type)}

${entries.join("\n")}
`;
}

function spreadMod(): string {
  return "";
}

function nestedEntryFile(type: string, entry: string) {
  return `${header(type)}

${entry}
`;
}

function nestedCategoryMod(names: string[]) {
  return names.map(n => `export { ${n} } from "./${toFileName(n)}`).join("\n");
}

function nestedMod() {
  return "";
}

function codex(name: string, categories: string[][]) {
  ("");
}

async function createNestedCategory(name: string, type: string, names: string[], entries: string[]) {
  // create the directory
  await Deno.mkdir(name);

  // create the mod.ts file
  const mod = writeFile(`${name}/mod.ts`, nestedCategoryMod(names));

  // create the entry files
  const promises = entries.map((entry, i) => {
    return writeFile(`${name}/${toFileName(names[i])}`, nestedEntryFile(type, entry));
  });

  // return promise.all
  return Promise.all([...promises, mod]);
}

// write the files

const te = new TextEncoder();
async function writeFile(name: string, text: string) {
  const file = await Deno.open(name, { create: true, write: true });
  await file.write(te.encode(text));
  file.close();
}

writeFile("loader.ts", loader);

if (arceus.format === "flat") {
  await writeFile("mod.ts", flatMod());
} else if (arceus.format === "spread") {
  await writeFile("mod.ts", spreadMod());
  await Promise.all(
    categories.map((category, i) => {
      const [name, type] = CATEGORIES[i];
      return writeFile(toFileName(name), spreadCategoryFile(type, category));
    })
  );
} else if (arceus.format === "nested") {
  await writeFile("mod.ts", spreadMod());
  await Promise.all(
    categories.map((category, i) => {
      const [name, type] = CATEGORIES[i];
      const names = arceus[name];
      if (!names) return;
      return createNestedCategory(name, type, names, category);
    })
  );
}
