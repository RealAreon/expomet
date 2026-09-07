export type CategorySlug =
  | "aluminum"
  | "brass"
  | "copper"
  | "bronze"
  | "lead"
  | "solder"
  | "nichrome"
  | "motors";

export type SpecTable = {
  headers: string[];
  rows: string[][];
};

export type Product = {
  id: string;
  slug: string;
  category: CategorySlug;
  name: { en: string; uk: string };
  form: { en: string; uk: string };
  thicknessMm: string;
  widthMm: string;
  inStock: boolean;
  popularity: number;
  image: string;
  specImages: string[];
  spec?: SpecTable;
};

export const CATEGORY_META: {
  slug: CategorySlug;
  image: string;
}[] = [
  { slug: "aluminum", image: "/categories/aluminum.png" },
  { slug: "brass", image: "/categories/brass.png" },
  { slug: "copper", image: "/categories/copper.png" },
  { slug: "bronze", image: "/categories/bronze.png" },
  { slug: "lead", image: "/categories/copper.png" },
  { slug: "solder", image: "/categories/brass.png" },
  { slug: "nichrome", image: "/categories/bronze.png" },
  { slug: "motors", image: "/categories/motors.png" },
];

const SHEET_HEADERS = ["Сплав", "Стан", "Товщина, мм", "Розмір, мм"];

function item(
  partial: Omit<Product, "inStock" | "image" | "specImages"> & {
    specImages?: string[];
  },
): Product {
  return {
    inStock: true,
    ...partial,
    image: `/catalog/photos/${partial.slug}.png`,
    specImages: partial.specImages ?? [`/catalog/specs/${partial.slug}.png`],
  };
}

export const PRODUCTS: Product[] = [
  item({
    id: "alyuminiy-lyst",
    slug: "alyuminiy-lyst",
    category: "aluminum",
    name: { uk: "Алюміній лист", en: "Aluminum sheet" },
    form: { uk: "Лист", en: "Sheet" },
    thicknessMm: "0,5 – 150",
    widthMm: "1200×3000",
    popularity: 100,
    spec: {
      headers: SHEET_HEADERS,
      rows: [
        ["АД1, А5, Д16", "М, Н2, Н, Т, М", "0,5 – 150", "1200×3000, 1500×3000, 1500×4000"],
        ["АМц", "Н111, Н24", "0,5 – 10", "1200×3000, 1500×3000, 1500×4000"],
        ["АМг1, АМг2, АМг3", "Н111, Н24", "0,5 – 10", "1200×3000, 1500×3000, 1500×4000"],
        ["АМг5, АМг6", "Н111, Н24", "0,5 – 60", "1200×3000, 1500×3000, 1500×4000"],
      ],
    },
  }),
  item({
    id: "alyuminiy-plyta",
    slug: "alyuminiy-plyta",
    category: "aluminum",
    name: { uk: "Алюміній плита", en: "Aluminum plate" },
    form: { uk: "Плита", en: "Plate" },
    thicknessMm: "8 – 150",
    widthMm: "1200×3000",
    popularity: 92,
  }),
  item({
    id: "alyuminiy-shyna",
    slug: "alyuminiy-shyna",
    category: "aluminum",
    name: { uk: "Алюміній шина", en: "Aluminum busbar" },
    form: { uk: "Шина", en: "Busbar" },
    thicknessMm: "3 – 20",
    widthMm: "20 – 120",
    popularity: 78,
  }),
  item({
    id: "dyuralyuminiy-lyst",
    slug: "dyuralyuminiy-lyst",
    category: "aluminum",
    name: { uk: "Дюралюміній лист", en: "Duralumin sheet" },
    form: { uk: "Лист", en: "Sheet" },
    thicknessMm: "0,5 – 10",
    widthMm: "1200×3000",
    popularity: 80,
  }),
  item({
    id: "dyuralyuminiy-plyta",
    slug: "dyuralyuminiy-plyta",
    category: "aluminum",
    name: { uk: "Дюралюміній плита", en: "Duralumin plate" },
    form: { uk: "Плита", en: "Plate" },
    thicknessMm: "8 – 80",
    widthMm: "1200×3000",
    popularity: 74,
  }),
  item({
    id: "dyuralyuminiy-prutok",
    slug: "dyuralyuminiy-prutok",
    category: "aluminum",
    name: { uk: "Дюралюміній пруток", en: "Duralumin bar" },
    form: { uk: "Пруток", en: "Bar" },
    thicknessMm: "8 – 200",
    widthMm: "—",
    popularity: 70,
  }),
  item({
    id: "bronza-prutok",
    slug: "bronza-prutok",
    category: "bronze",
    name: { uk: "Бронза пруток", en: "Bronze bar" },
    form: { uk: "Пруток", en: "Bar" },
    thicknessMm: "10 – 200",
    widthMm: "—",
    popularity: 66,
  }),
  item({
    id: "svynets-lyst",
    slug: "svynets-lyst",
    category: "lead",
    name: { uk: "Свинець лист", en: "Lead sheet" },
    form: { uk: "Лист", en: "Sheet" },
    thicknessMm: "0,5 – 20",
    widthMm: "500×1000",
    popularity: 40,
  }),
  item({
    id: "svynets-chushka",
    slug: "svynets-chushka",
    category: "lead",
    name: { uk: "Свинець чушка", en: "Lead ingot" },
    form: { uk: "Чушка", en: "Ingot" },
    thicknessMm: "—",
    widthMm: "—",
    popularity: 36,
  }),
  item({
    id: "latun-drit",
    slug: "latun-drit",
    category: "brass",
    name: { uk: "Латунь дріт", en: "Brass wire" },
    form: { uk: "Дріт", en: "Wire" },
    thicknessMm: "0,2 – 8",
    widthMm: "—",
    popularity: 58,
  }),
  item({
    id: "latun-lyst",
    slug: "latun-lyst",
    category: "brass",
    name: { uk: "Латунь лист", en: "Brass sheet" },
    form: { uk: "Лист", en: "Sheet" },
    thicknessMm: "0,4 – 40",
    widthMm: "600×1500",
    popularity: 88,
    spec: {
      headers: SHEET_HEADERS,
      rows: [["Л63, ЛС59", "Т, М, ПТВ", "0,4 – 40", "600×1500, 1000×2000"]],
    },
  }),
  item({
    id: "latun-plyta",
    slug: "latun-plyta",
    category: "brass",
    name: { uk: "Латунь плита", en: "Brass plate" },
    form: { uk: "Плита", en: "Plate" },
    thicknessMm: "10 – 80",
    widthMm: "600×1500",
    popularity: 72,
  }),
  item({
    id: "latun-prutok",
    slug: "latun-prutok",
    category: "brass",
    name: { uk: "Латунь пруток", en: "Brass rod" },
    form: { uk: "Пруток", en: "Rod" },
    thicknessMm: "6 – 80",
    widthMm: "—",
    popularity: 84,
  }),
  item({
    id: "latun-strichka",
    slug: "latun-strichka",
    category: "brass",
    name: { uk: "Латунь стрічка", en: "Brass strip" },
    form: { uk: "Стрічка", en: "Strip" },
    thicknessMm: "0,1 – 2",
    widthMm: "10 – 300",
    popularity: 54,
  }),
  item({
    id: "latun-truba",
    slug: "latun-truba",
    category: "brass",
    name: { uk: "Латунь труба", en: "Brass tube" },
    form: { uk: "Труба", en: "Tube" },
    thicknessMm: "1 – 12 wall",
    widthMm: "6 – 54 Ø",
    popularity: 76,
  }),
  item({
    id: "mid-drit",
    slug: "mid-drit",
    category: "copper",
    name: { uk: "Мідь дріт", en: "Copper wire" },
    form: { uk: "Дріт", en: "Wire" },
    thicknessMm: "0,2 – 8",
    widthMm: "—",
    popularity: 62,
  }),
  item({
    id: "mid-lyst",
    slug: "mid-lyst",
    category: "copper",
    name: { uk: "Мідь лист", en: "Copper sheet" },
    form: { uk: "Лист", en: "Sheet" },
    thicknessMm: "0,4 – 80",
    widthMm: "600×1500",
    popularity: 94,
    spec: {
      headers: SHEET_HEADERS,
      rows: [["М1, М2", "ПТВ, М, Т", "0,4 – 80", "600×1500, 1000×2000"]],
    },
  }),
  item({
    id: "mid-plyta",
    slug: "mid-plyta",
    category: "copper",
    name: { uk: "Мідь плита", en: "Copper plate" },
    form: { uk: "Плита", en: "Plate" },
    thicknessMm: "10 – 80",
    widthMm: "600×1500",
    popularity: 71,
  }),
  item({
    id: "mid-prutok",
    slug: "mid-prutok",
    category: "copper",
    name: { uk: "Мідь пруток", en: "Copper bar" },
    form: { uk: "Пруток", en: "Bar" },
    thicknessMm: "6 – 120",
    widthMm: "—",
    popularity: 82,
  }),
  item({
    id: "mid-strichka",
    slug: "mid-strichka",
    category: "copper",
    name: { uk: "Мідь стрічка", en: "Copper strip" },
    form: { uk: "Стрічка", en: "Strip" },
    thicknessMm: "0,1 – 3",
    widthMm: "10 – 400",
    popularity: 60,
  }),
  item({
    id: "mid-truba",
    slug: "mid-truba",
    category: "copper",
    name: { uk: "Мідь труба", en: "Copper tube" },
    form: { uk: "Труба", en: "Tube" },
    thicknessMm: "0,8 – 3 wall",
    widthMm: "6 – 54 Ø",
    popularity: 77,
  }),
  item({
    id: "mid-shyna",
    slug: "mid-shyna",
    category: "copper",
    name: { uk: "Мідь шина", en: "Copper busbar" },
    form: { uk: "Шина", en: "Busbar" },
    thicknessMm: "3 – 20",
    widthMm: "20 – 120",
    popularity: 86,
  }),
  item({
    id: "prypiy-drit",
    slug: "prypiy-drit",
    category: "solder",
    name: { uk: "Припій дріт", en: "Solder wire" },
    form: { uk: "Дріт", en: "Wire" },
    thicknessMm: "1 – 4",
    widthMm: "—",
    popularity: 34,
  }),
  item({
    id: "nikhrom-drit",
    slug: "nikhrom-drit",
    category: "nichrome",
    name: { uk: "Ніхром дріт", en: "Nichrome wire" },
    form: { uk: "Дріт", en: "Wire" },
    thicknessMm: "0,2 – 6",
    widthMm: "—",
    popularity: 42,
  }),
  item({
    id: "fekhral-drit",
    slug: "fekhral-drit",
    category: "nichrome",
    name: { uk: "Фехраль дріт", en: "Fechral wire" },
    form: { uk: "Дріт", en: "Wire" },
    thicknessMm: "0,2 – 6",
    widthMm: "—",
    popularity: 38,
  }),
  item({
    id: "elektrodvyhuny",
    slug: "elektrodvyhuny",
    category: "motors",
    name: { uk: "Електродвигуни", en: "Electric motors" },
    form: { uk: "Двигун", en: "Motor" },
    thicknessMm: "0,55 – 315 kW",
    widthMm: "IEC 80 – 355",
    popularity: 68,
    specImages: [
      "/catalog/specs/elektrodvyhuny-750.png",
      "/catalog/specs/elektrodvyhuny-1000.png",
      "/catalog/specs/elektrodvyhuny.png",
      "/catalog/specs/elektrodvyhuny-3000.png",
    ],
  }),
];

export function getProductsByCategory(slug: CategorySlug) {
  return PRODUCTS.filter((item) => item.category === slug);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((item) => item.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORY_META.find((item) => item.slug === slug);
}
