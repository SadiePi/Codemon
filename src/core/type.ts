export interface Type {
  weaknesses: Type[]
  resistances: Type[]
  immunities: Type[]
}

export const None: Type = {
  weaknesses: [],
  resistances: [],
  immunities: [],
}
