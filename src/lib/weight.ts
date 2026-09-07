export type MetalId =
  | "ferrous"
  | "stainless"
  | "aluminum"
  | "copper"
  | "brass"
  | "bronze"
  | "titanium";

export type ShapeId =
  | "square"
  | "round"
  | "strip"
  | "sheet"
  | "tube-round"
  | "tube-profile"
  | "angle"
  | "hex";

export const METALS: { id: MetalId; density: number }[] = [
  { id: "ferrous", density: 7.85 },
  { id: "stainless", density: 7.9 },
  { id: "aluminum", density: 2.7 },
  { id: "copper", density: 8.96 },
  { id: "brass", density: 8.4 },
  { id: "bronze", density: 8.8 },
  { id: "titanium", density: 4.51 },
];

export const SHAPES: ShapeId[] = [
  "square",
  "round",
  "strip",
  "sheet",
  "tube-round",
  "tube-profile",
  "angle",
  "hex",
];

export const ALUMINUM_GRADES: { id: string; density: number }[] = [
  { id: "AMg", density: 2.66 },
  { id: "AD31", density: 2.7 },
  { id: "D16", density: 2.78 },
  { id: "A5", density: 2.7 },
];

function mm3ToKg(volumeMm3: number, density: number) {
  return (volumeMm3 * density) / 1_000_000;
}

export function calculateWeight(input: {
  shape: ShapeId;
  density: number;
  t: number;
  a: number;
  b: number;
  qty: number;
}) {
  const { shape, density, t, a, b, qty } = input;
  if (![t, a, b, qty, density].every((n) => Number.isFinite(n) && n > 0)) {
    return { areaM2: 0, weightKg: 0 };
  }

  let volume = 0;
  let areaM2 = 0;

  switch (shape) {
    case "sheet":
    case "strip":
      volume = t * a * b * qty;
      areaM2 = (a * b * qty) / 1_000_000;
      break;
    case "square":
      volume = a * a * b * qty;
      areaM2 = (4 * a * b * qty) / 1_000_000;
      break;
    case "round":
      volume = Math.PI * (a / 2) ** 2 * b * qty;
      areaM2 = (Math.PI * a * b * qty) / 1_000_000;
      break;
    case "hex":
      volume = ((3 * Math.sqrt(3)) / 2) * (a / 2) ** 2 * b * qty;
      areaM2 = (6 * (a / Math.sqrt(3)) * b * qty) / 1_000_000;
      break;
    case "tube-round": {
      const outer = a;
      const wall = t;
      const inner = Math.max(outer - wall * 2, 0);
      volume = Math.PI * ((outer / 2) ** 2 - (inner / 2) ** 2) * b * qty;
      areaM2 = (Math.PI * outer * b * qty) / 1_000_000;
      break;
    }
    case "tube-profile": {
      const outerArea = a * t;
      const innerW = Math.max(a - 2 * b, 0);
      const innerH = Math.max(t - 2 * b, 0);
      volume = (outerArea - innerW * innerH) * qty;
      areaM2 = (2 * (a + t) * qty) / 1_000_000;
      break;
    }
    case "angle":
      volume = (a * t + (b - t) * t) * qty * 1000;
      areaM2 = ((a + b) * qty) / 1_000_000;
      break;
    default:
      volume = t * a * b * qty;
  }

  return {
    areaM2,
    weightKg: mm3ToKg(volume, density),
  };
}

export function getMetal(id: MetalId) {
  return METALS.find((item) => item.id === id) ?? METALS[2];
}
