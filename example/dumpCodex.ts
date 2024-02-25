import C from "../codex/pokemon/mod.ts";

// Hmm... this probably needs better support

for (const codexKey of Object.keys(C)) {
  console.log(codexKey);
  for (const entryKey of Object.keys(C[codexKey as keyof typeof C])) {
    // deno-lint-ignore ban-types
    const entry = C[codexKey as keyof typeof C][entryKey as keyof (typeof C)[keyof typeof C]] as {}; // jfc
    if (typeof entry === "object" && Object.keys(entry).length === 0) continue;
    console.log(`\t${entryKey}`);
  }
}
