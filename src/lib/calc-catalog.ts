import catalog from "@/data/amari.json";
import type {
  ArmVariant,
  Balk,
  BalkType,
  Branch,
  BranchType,
  Channel,
  Flange,
  FlangeType,
  Grade,
  Metal,
  PipeProf,
  Sortament,
  SortamentField,
  CalcType,
} from "@/lib/calc-types";

export const metals = catalog.metals as Metal[];
export const sortaments = catalog.sortaments as Sortament[];
export const grades = catalog.grades as Grade[];
export const armVariants = catalog.armVariants as ArmVariant[];
export const balkTypes = catalog.balkTypes as BalkType[];
export const balks = catalog.balks as Balk[];
export const branchTypes = catalog.branchTypes as BranchType[];
export const branches = catalog.branches as Branch[];
export const channels = catalog.channels as Channel[];
export const flangeTypes = catalog.flangeTypes as FlangeType[];
export const flanges = catalog.flanges as Flange[];
export const pipeProf = catalog.pipeProf as PipeProf[];

export const METAL_I18N: Record<number, string> = {
  1: "ferrous",
  2: "stainless",
  3: "aluminum",
  4: "copper",
  5: "brass",
  6: "bronze",
  7: "titanium",
};

export function getMetal(id: number): Metal {
  return metals.find((item) => item.id === id) ?? metals[0];
}

export function sortamentsForMetal(metalId: number): Sortament[] {
  return sortaments.filter((item) => item.metall_ids.includes(metalId));
}

export function getSortament(id: number): Sortament {
  return sortaments.find((item) => item.id === id) ?? sortaments[0];
}

export function gradesForMetal(metalId: number): Grade[] {
  return grades.filter((item) => item.metall_id === metalId);
}

export function findGrade(metalId: number, title?: string): Grade {
  const list = gradesForMetal(metalId);
  return list.find((item) => item.title === title) ?? list[0];
}

export function fieldsForCalc(
  sortament: Sortament,
  calcType: CalcType,
): SortamentField[] {
  return (sortament.fields ?? []).filter(
    (field) => !field.calc_types || field.calc_types.includes(calcType),
  );
}
