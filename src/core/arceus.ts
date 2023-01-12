// TODO Make this work properly

const TEST_MODE = false as const;

function writeFile(path: string, contents: string) {
  if(TEST_MODE) { console.log(contents); return }
  Deno.writeTextFileSync(path, contents);
}

alert("This script will generate boilerplate code for your codex with placeholder entries based on your arceus file. Read about arceus files here: TODO")

const workingDirectory = Deno.cwd();

let codexDirectory: string;
do {
  console.log()
  console.log(`Working directory: ${workingDirectory}`)
  codexDirectory = prompt("Enter the path from there to directory with your arceus file: ./", "") ?? ""
  if(codexDirectory[0] !== ".") codexDirectory = `./${codexDirectory}`
  if(codexDirectory.at(-1) !== "/") codexDirectory += "/"
} while(!confirm(`Is this correct? ${codexDirectory}arceus`))

let codemonDirectory: string;
do {
  console.log()
  console.log(`Codex directory: ${codexDirectory}`)
  codemonDirectory = prompt("Lastly, I need the path from there to this library's directory: ./", "") ?? ""
  if(codemonDirectory[0] !== ".") codemonDirectory = `./${codemonDirectory}`
  if(codemonDirectory.at(-1) !== "/") codemonDirectory += "/"
} while(!confirm(`Is this correct? ${codemonDirectory}index.ts`))

// TODO read existing files and note changes

const arceus = Deno.readTextFileSync(`${codexDirectory}/arceus`).split("\n")
const codexType = arceus[0];

const categories: [string, string[]][] = [];
for (let i = 1; i < arceus.length; i += 2) 
categories.push([arceus[i], arceus[i + 1].trim().split(" ")]);

console.log("Creating loader.ts");
const loader = `import CodexBuilder from "${codemonDirectory}codex.ts";
import { ${codexType} } from "./index.ts";
const loader = new CodexBuilder<${codexType}>();
export default loader;`
writeFile(`${codexDirectory}/loader.ts`, loader)


const codexEntries: [string, string][] = [];

for(const [category, entries] of categories) {
  const [directory, type, codexEntry] = category.split(" - ");
  console.log(`Creating ${codexType}.${codexEntry}`);
  codexEntries.push([codexEntry, directory]);

  try {
    Deno.mkdirSync(`${codexDirectory}/${directory}`);
  } catch (e) {
    if (!(e instanceof Deno.errors.AlreadyExists)) throw e
    // directory already exists, proceed
  }
  
  const indexExports: string[] = [];
  for(const entry of entries) {
    if(!entry) continue;
    const entryInCamelCase = entry[0].toLowerCase() + entry.slice(1);
    if(entryInCamelCase === "index") throw new Error(`Entry name ${entry} is not allowed because it would conflict with the index.ts file. Rename it to something else.`);
    indexExports.push(entryInCamelCase)

    // check if file exists and skip if it does
    try {
      Deno.statSync(`${codexDirectory}/${directory}/${entryInCamelCase}.ts`);
      // console.log(`Skipping ${entry} because ${entryInCamelCase}.ts already exists`)
      continue;
    } catch (e) {
      if (!(e instanceof Deno.errors.NotFound)) throw e
      // file doesn't exist, proceed
    }

    console.log(`Creating ${entry} in ${directory}/${entryInCamelCase}.ts`);
    const content = `import { Codex, ${type} } from "${codexDirectory[1]==="."?"":"."}${codexDirectory}index.ts";
import loader from "../loader.ts";
    
export const ${entry}: ${type} = loader.register((C: Codex) => ({} as ${type}));`
    writeFile(`${codexDirectory}/${directory}/${entryInCamelCase}.ts`, content)
  }

  console.log(`Creating ${directory}/index.ts`);
  const index = indexExports.map(entry => `export * from "./${entry}.ts";`).join("\n");
  writeFile(`${codexDirectory}${directory}/index.ts`, index)
}

console.log("Creating index.ts");
const codex = `export * from "${codemonDirectory}index.ts";
import loader from "./loader.ts";

${codexEntries.map(([entry, directory]) => `import * as ${entry} from "./${directory}/index.ts";`).join("\n")}

const C = {
${codexEntries.map(([entry])=>`  ${entry}`).join(",\n")}
} as const;
export type Codex = typeof C;

loader.build(C);

export default C;
`
writeFile(`${codexDirectory}/index.ts`, codex)

console.log(`Done! You can now import your codex as default and the codemon library from ${codexDirectory}.ts`)