export type CalcType = "weight" | "length";

export type SortamentField = {
  label: string;
  type: string;
  disp: string;
  calc_types?: CalcType[];
};

export type Metal = {
  id: number;
  title: string;
  default_grade: string;
  form_title: string;
  grade_title: string;
  default_sort_id: number;
};

export type Sortament = {
  id: number;
  key: string;
  title: string;
  metall_ids: number[];
  form_title: string;
  metall_title_end: string;
  fields?: SortamentField[];
  has_grades: boolean;
  has_calc_togler?: boolean;
  icon: string;
  props?: string[];
};

export type Grade = {
  id: number;
  title: string;
  p: number;
  metall_id: number;
};

export type ArmVariant = { id: number; d: number; m: number };
export type BalkType = { id: number; title: string };
export type Balk = {
  id: number;
  type_id: number;
  number: string;
  h: number;
  b: number;
  s: number;
  t: number;
  m: number;
};
export type BranchType = { id: number; title: string };
export type Branch = {
  id: number;
  type_id: number;
  size: string;
  dy: number;
  dh: number;
  w: number;
  m: number;
};
export type Channel = {
  id: number;
  number: string;
  type_id: number;
  h: number;
  b: number;
  s: number;
  t: number;
  m: number;
};
export type FlangeType = { id: number; title: string };
export type Flange = {
  id: number;
  type_id: number;
  dy: number;
  d: number;
  d1: number;
  dv: number;
  b: number;
  dxn: number;
  n: number;
  m: number;
};
export type PipeProf = { a: number; b: number; t: number; m: number };

export type CalcInput = {
  metallId: number;
  a: number;
  b: number;
  d: number;
  t: number;
  l: number;
  n: number;
  p: number;
  m: number;
  M: number;
};

export type HistoryItem = {
  id: string;
  at: number;
  title: string;
  metal: string;
  sortament: string;
  grade?: string;
  details: string;
  resultLabel: string;
  resultValue: string;
};
