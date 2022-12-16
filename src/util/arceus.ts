function create_entries(dir: string, type: string) {
  prompt(
    `This will create files with placeholder exports for entries in ${Deno.cwd()}/${dir}/arceus. Also rewrites index.ts. Press enter to continue.`
  );
  let index = "";
  for (const line of Deno.readTextFileSync(`./${dir}/arceus`).split("\n")) {
    const lineInPascalCase = line[0].toLowerCase() + line.slice(1);
    index += `export * from "./${lineInPascalCase}.ts";\n`;
    // try {
    //   Deno.statSync(`${dir}/${lineInPascalCase}.ts`);
    // } catch (e) {
    //   if (e instanceof Deno.errors.NotFound) {
    console.log(`Creating ${lineInPascalCase}.ts`);
    const content = `import { ${type} } from "../index.ts"; export const ${line}: ${type} = {} as ${type};`;
    Deno.writeTextFileSync(`${dir}/${lineInPascalCase}.ts`, content);
    //   }
    // }
  }
  console.log(`Creating index.ts`);
  Deno.writeTextFileSync(`${dir}/index.ts`, index);
}

function transfer_entries(dir: string, source: string) {
  prompt(`This will transfer entries from ${Deno.cwd()}/${source} to ${Deno.cwd()}/${dir}. Press enter to continue.`);
  const file = Deno.readTextFileSync(`./${source}`);
  const entries = file.split("\n\n");
  const header = `import C, { Move } from "../index.ts";\n\n`;
  for (const entry of entries) {
    // the first line of real entries is "export const Name: Type = {"
    if (entry.slice(0, 2) !== "ex") continue;
    // extract name
    const name = entry.split(":")[0].split(" ")[2];
    const nameInCamelCase = name[0].toLowerCase() + name.slice(1);
    const filename = `${dir}/${nameInCamelCase}.ts`;
    console.log(`Writing ${filename}`);
    Deno.writeTextFileSync(filename, header + entry);
  }
}

transfer_entries("moves", "moves.ts");
