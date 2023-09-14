import { Codex } from "./codex.ts";

type Formats = "flat" | "spread" | "nested";

interface Format {
  generateCategory: (category: Category, arceus: ArceusFile, path: string) => void;
  generateImports: () => string;
}

const formats: Record<Formats, Format> = {
  flat: {
    generateCategory: generateFlatCategory,
    generateImports: () => `import { ${Object.keys(categoryMap).join(", ")} } from "./mod.ts";`,
  },
  spread: {
    generateCategory: generateSpreadCategory,
    generateImports: () =>
      Object.keys(categoryMap)
        .map(category => `import * as ${category[0].toUpperCase()}${category.slice(1)} from "./${category}.ts";`)
        .join("\n"),
  },
  nested: {
    generateCategory: generateNestedCategory,
    generateImports: () =>
      Object.keys(categoryMap)
        .map(category => `import * as ${category[0].toUpperCase()}${category.slice(1)} from "./${category}/mod.ts";`)
        .join("\n"),
  },
};

type Category = Lowercase<keyof Codex>;

type CategoryMap = Record<
  Category,
  {
    type: string;
    useLoader: boolean;
  }
>;

const categoryMap: CategoryMap = {
  abilities: { type: "Ability", useLoader: true },
  experience: { type: "ExperienceGroup", useLoader: false },
  genders: { type: "Gender", useLoader: false },
  items: { type: "Item", useLoader: true },
  // locales: { type: "Locale", useLoader: false },
  moves: { type: "Move", useLoader: true },
  natures: { type: "Nature", useLoader: false },
  species: { type: "Species", useLoader: true },
  statuses: { type: "StatusEffect", useLoader: true },
  strategies: { type: "Strategy", useLoader: true },
  trainers: { type: "Trainer", useLoader: true },
  types: { type: "Type", useLoader: true },
  weathers: { type: "Weather", useLoader: true },
};

type ArceusFile = {
  [K in keyof CategoryMap]?: string[];
} & {
  name: string;
  letter: string;
  format: Formats;
  import?: string[];
  lib?: string;
  // config: Partial<typeof config>;

  // special entries that the library needs to know about
  struggle: string; // which move to struggle with
  wild: string; // the strategy wild Pokémon use
};

function readArceusFile(path: string): ArceusFile {
  // Deno.statSync(`${path}/arceus.json`);
  console.log("Reading arceus file");
  const arceus = JSON.parse(Deno.readTextFileSync(`${path}/arceus.json`));
  if (verifyArceusFile(arceus)) return arceus;
  throw new Error("Invalid arceus file");
}

function verifyArceusFile(_file: unknown): _file is ArceusFile {
  return true;
} // big fat TODO

function generateLoaderFile(arceus: ArceusFile, path: string): void {
  const localDexImport = `import { ${arceus.name} } from "./mod.ts";`;
  const libDexImport = `import codex from "${arceus.lib}/codex.ts";`;
  const loaderCreation = `const loader = codex<${arceus.name}>();`;
  const loaderExport = `export default loader;`;
  const loader = [localDexImport, libDexImport, loaderCreation, loaderExport].join("\n");
  Deno.writeTextFileSync(`${path}/loader.ts`, loader);
}

function generateModFile(arceus: ArceusFile, path: string): void {
  // TODO codex imports
  const libExport = `export * from "${arceus.lib}/mod.ts";`;
  const libImport = `import { Codex } from "${arceus.lib}/mod.ts";`;
  const loaderImport = `import loader from "./loader.ts";`;
  const lib = [libExport, libImport, loaderImport].join("\n");

  const categoryImports = formats[arceus.format].generateImports();

  const dexConst = `const ${arceus.name} = { ${Object.keys(categoryMap)
    .map(c => `${c[0].toUpperCase()}${c.slice(1)}`)
    .join(", ")} } as const satisfies Codex;`;
  const dexExport = `export type ${arceus.name} = typeof ${arceus.name};`;
  const dex = [dexConst, dexExport].join("\n");

  const loaderBuild = `loader.build(${arceus.name});`; // TODO include config

  const exportDefault = `export default ${arceus.name};`;

  const mod = [lib, categoryImports, dex, loaderBuild, exportDefault].join("\n\n");
  Deno.writeTextFileSync(`${path}/mod.ts`, mod);
}

function generateFlatCategory(category: Category, arceus: ArceusFile, path: string) {
  // if path/codex.ts doesn't exist, create it and write imports.
  // then, append category to path/codex.ts

  try {
    Deno.statSync(`${path}/codex.ts`);
  } catch (e) {
    if (e instanceof Deno.errors.NotFound)
      Deno.writeTextFileSync(`${path}/codex.ts`, `${categoryImports(arceus, category)}\n\n`);
    else throw e;
  }

  const entries = generateEntries(category, arceus);
  const entryDefinitions = Object.values(entries).join("\n\n");
  const categoryExport = `export const ${category} = { ${Object.keys(entries)
    .map(e => `"${e}"`)
    .join(",")} } `;

  const categorySection = [entryDefinitions, categoryExport].join("\n\n");
  Deno.writeTextFileSync(`${path}/codex.ts`, categorySection, { append: true });
}

function generateSpreadCategory(category: Category, arceus: ArceusFile, path: string): void {
  const imports = categoryImports(arceus, category);

  const entries = generateEntries(category, arceus);
  if (Object.keys(entries).length === 0) return;

  const entryDefinitions = Object.values(entries).join("\n\n");

  const categoryFile = [imports, entryDefinitions].join("\n\n");
  Deno.writeTextFileSync(`${path}/${category}.ts`, categoryFile);
}

function generateNestedCategory(category: Category, arceus: ArceusFile, path: string): void {
  const imports = categoryImports(arceus, category);
  const entries = generateEntries(category, arceus);
  if (Object.keys(entries).length === 0) return;

  Deno.mkdirSync(`${path}/${category}`);
  Object.entries(entries).forEach(([name, entry]) => {
    Deno.writeTextFileSync(`${path}/${category}/${name}.ts`, [imports, entry].join("\n\n"));
  });

  const modFile = Object.keys(entries)
    .map(name => `export * from "./${name}.ts";`)
    .join("\n");
  Deno.writeTextFileSync(`${path}/${category}/mod.ts`, modFile);
}

function categoryImports(arceus: ArceusFile, ...categories: Category[]): string {
  const imports = `import { ${categories.map(c => categoryMap[c].type).join(", ")} } from "${
    arceus.format === "nested" ? "." : ""
  }./mod.ts";`;
  if (!categories.map(c => categoryMap[c].useLoader).includes(true)) return imports;
  const loader = `import loader from "../loader.ts"`;
  return [imports, loader].join("\n");
}

function generateEntries(category: Category, arceus: ArceusFile): Record<string, string> {
  const entryNames = arceus[category];
  if (!entryNames) return {};
  return Object.fromEntries(entryNames.map(name => [name, generateEntry(name, category, arceus)]));
}

function generateEntry(name: string, category: Category, arceus: ArceusFile): string {
  return `export const ${name}: ${categoryMap[category].type} = loader.register(${arceus.letter} => ({ name: "${name}" } as ${categoryMap[category].type}));`;
}

function generateCodex(path: string): void {
  const arceus = readArceusFile(path);
  // TODO check for existing and orphaned entries
  // TODO confirm with the user

  generateLoaderFile(arceus, path);
  generateModFile(arceus, path);
  const generator = formats[arceus.format].generateCategory;
  Object.keys(categoryMap).forEach(category => generator(category as Category, arceus, path));

  // TODO generate README.md explaining how to use the new codex
}

const { args } = Deno;
if (args.length === 0) {
  console.log("Usage: deno run --allow-read --allow-write .../arceus.ts [path]");
  Deno.exit(1);
}
const confirm = prompt(`This will bulldoze any existing codex in ${args[0]}. Proceed? [y/N]`);
if (confirm?.toLowerCase() !== "y") Deno.exit(0);
generateCodex(args[0]);
