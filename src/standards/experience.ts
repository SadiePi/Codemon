export const slow = (l: number) => (5 * Math.pow(l, 3)) / 4

export const medSlow = (l: number) =>
  (6 * Math.pow(l, 3)) / 5 - 15 * Math.pow(l, 2) + 100 * l - 140

export const medFast = (l: number) => Math.pow(l, 3)

export const fast = (l: number) => (4 * Math.pow(l, 3)) / 5

export const erratic = function (l: number) {
  if (l <= 50) return (Math.pow(l, 3) * (100 - l)) / 50
  else if (l <= 68) return (Math.pow(l, 3) * (150 - l)) / 100
  else if (l <= 98) return (Math.pow(l, 3) * ((1911 - 10 * l) / 3)) / 500
  else if (l <= 100) return (Math.pow(l, 3) * (160 - l)) / 100
  return Number.POSITIVE_INFINITY
}

export const fluctuating = function (l: number) {
  if (l <= 15) return (Math.pow(l, 3) * ((l + 1) / 3 + 24)) / 50
  if (l <= 36) return (Math.pow(l, 3) * (l + 14)) / 50
  if (l <= 100) return (Math.pow(l, 3) * (l / 2 + 32)) / 50
  return Number.POSITIVE_INFINITY
}

export default {
  slow,
  medSlow,
  medFast,
  fast,
  erratic,
  fluctuating,
}
