import Pokedex from "../codex/pokemon/mod.ts";

function getSizeInBytes(obj: any): number {
  const visited = new WeakSet<object>();

  function sizeOf(obj: any): number {
    if (obj === null) return 0;

    // Only add objects to the WeakSet
    if (typeof obj === "object") {
      if (visited.has(obj)) {
        return 0;
      }
      visited.add(obj);
    }

    switch (typeof obj) {
      case "number":
        return 8; // 64-bit floating point number
      case "string":
        return obj.length * 2; // Each character is 2 bytes (UTF-16)
      case "boolean":
        return 4; // size of boolean
      case "object":
        if (Array.isArray(obj)) {
          return obj.map(sizeOf).reduce((acc, curr) => acc + curr, 0);
        } else {
          return Object.keys(obj)
            .map(key => sizeOf(key) + sizeOf(obj[key]))
            .reduce((acc, curr) => acc + curr, 0);
        }
      default:
        return 0;
    }
  }

  return sizeOf(obj);
}

console.log(`Pokedex size: ${getSizeInBytes(Pokedex)}`);
