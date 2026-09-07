"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Check,
  Calculator as CalcIcon,
  Clock,
  Target,
  ShieldCheck,
  Layers,
  FileText,
  Trash2,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DarkSelect } from "@/components/dark-select";
import { ShapePreview } from "@/components/shape-preview";
import { calcLength, calcSquare, calcWeight, isValidWeight } from "@/lib/calc-engine";
import {
  METAL_I18N,
  armVariants,
  balkTypes,
  balks,
  branchTypes,
  branches,
  channels,
  fieldsForCalc,
  findGrade,
  flangeTypes,
  flanges,
  getMetal,
  getSortament,
  gradesForMetal,
  metals,
  pipeProf,
  sortamentsForMetal,
} from "@/lib/calc-catalog";
import { parseNum } from "@/lib/calc-format";
import type { CalcInput, CalcType, HistoryItem } from "@/lib/calc-types";
import {
  CALC_HISTORY_KEY,
  CONSENT_CHANGE_EVENT,
  canStoreFunctionalData,
} from "@/lib/cookie-consent";

const SPECIFIC_FIELDS = new Set([
  "square.a",
  "circle.d",
  "ribbon.a",
  "ribbon.t",
  "ribbon.b",
  "list.t",
  "list.a",
  "list.b",
  "pipeCircle.d",
  "pipeCircle.t",
  "pipeProf.a",
  "pipeProf.b",
  "pipeProf.t",
  "corner.a",
  "corner.b",
  "corner.t",
  "hexahedron.a",
]);

type StoredHistory = HistoryItem & {
  metalId: number;
  sortId: number;
  gradeTitle: string;
  calcType: CalcType;
  values: Record<string, string>;
  armD: string;
  balkTypeId: number;
  balkId: number;
  branchTypeId: number;
  branchId: number;
  channelId: number;
  flangeTypeId: number;
  flangeId: number;
  weight: number;
  length: number;
  square: number;
};

function emptyInput(metallId: number, p: number): CalcInput {
  return {
    metallId,
    a: 0,
    b: 0,
    d: 0,
    t: 0,
    l: 0,
    n: 0,
    p,
    m: 0,
    M: 0,
  };
}

function loadHistory(): StoredHistory[] {
  if (typeof window === "undefined" || !canStoreFunctionalData()) return [];
  try {
    const raw = window.localStorage.getItem(CALC_HISTORY_KEY);
    return raw ? (JSON.parse(raw) as StoredHistory[]) : [];
  } catch {
    return [];
  }
}

function metalKey(id: number): string {
  return METAL_I18N[id] ?? "aluminum";
}

function unitFromDisp(disp: string): "mm" | "m" | "kg" | "pcs" {
  if (disp.includes("шт")) return "pcs";
  if (disp.includes("кг")) return "kg";
  if (disp.includes("мм")) return "mm";
  if (disp.startsWith("м")) return "m";
  return "mm";
}

function fieldMessageKey(sortKey: string, type: string): string {
  const specific = `${sortKey}.${type}`;
  if (SPECIFIC_FIELDS.has(specific)) return `fields.${specific}`;
  if (type === "l" || type === "M" || type === "n") return `fields.${type}`;
  return `fields.${type}`;
}

function formatResult(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return (0).toFixed(decimals);
  return value.toFixed(decimals);
}

function formatMoney(value: number): string {
  const rounded = Math.round(Number.isFinite(value) ? value : 0);
  return rounded.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

export function WeightCalculator() {
  const t = useTranslations("calculator");
  const startMetal = getMetal(3);
  const startSort = getSortament(6);
  const startGrade = findGrade(startMetal.id, "АМг");

  const [metalId, setMetalId] = useState(startMetal.id);
  const [sortId, setSortId] = useState(startSort.id);
  const [gradeTitle, setGradeTitle] = useState(startGrade.title);
  const [calcType, setCalcType] = useState<CalcType>("weight");
  const [values, setValues] = useState<Record<string, string>>({ n: "1" });
  const [armD, setArmD] = useState(String(armVariants[0].d));
  const [balkTypeId, setBalkTypeId] = useState(2);
  const [balkId, setBalkId] = useState(
    balks.find((item) => item.type_id === 2)?.id ?? balks[0].id,
  );
  const [branchTypeId, setBranchTypeId] = useState(2);
  const [branchId, setBranchId] = useState(
    branches.find((item) => item.type_id === 2)?.id ?? branches[0].id,
  );
  const [channelId, setChannelId] = useState(channels[0].id);
  const [flangeTypeId, setFlangeTypeId] = useState(1);
  const [flangeId, setFlangeId] = useState(
    flanges.find((item) => item.type_id === 1)?.id ?? flanges[0].id,
  );
  const [error, setError] = useState("");
  const [result, setResult] = useState({ weight: 0, length: 0, square: 0, calcType: "weight" as CalcType });
  const [didCalculate, setDidCalculate] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [price, setPrice] = useState("0");
  const [history, setHistory] = useState<StoredHistory[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const metal = getMetal(metalId);
  const sortament = getSortament(sortId);
  const grade = findGrade(metalId, gradeTitle);
  const metalSortaments = sortamentsForMetal(metalId);
  const metalGrades = gradesForMetal(metalId);
  const fields = fieldsForCalc(sortament, calcType);
  const filteredBalks = balks.filter((item) => item.type_id === balkTypeId);
  const filteredBranches = branches.filter((item) => item.type_id === branchTypeId);
  const filteredFlanges = flanges.filter((item) => item.type_id === flangeTypeId);
  const selectedBalk = balks.find((item) => item.id === balkId);
  const selectedBranch = branches.find((item) => item.id === branchId);
  const selectedChannel = channels.find((item) => item.id === channelId);
  const selectedFlange = flanges.find((item) => item.id === flangeId);
  const currentMetalKey = metalKey(metalId);
  const [sortListRef] = useAutoAnimate({ duration: 280 });

  useEffect(() => {
    setMounted(true);
    setHistory(loadHistory());
    const onConsent = () => {
      if (!canStoreFunctionalData()) setHistory([]);
      else setHistory(loadHistory());
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsent);
  }, []);

  useEffect(() => {
    const list = balks.filter((item) => item.type_id === balkTypeId);
    if (!list.some((item) => item.id === balkId) && list[0]) setBalkId(list[0].id);
  }, [balkId, balkTypeId]);

  useEffect(() => {
    const list = branches.filter((item) => item.type_id === branchTypeId);
    if (!list.some((item) => item.id === branchId) && list[0]) setBranchId(list[0].id);
  }, [branchId, branchTypeId]);

  useEffect(() => {
    const list = flanges.filter((item) => item.type_id === flangeTypeId);
    if (!list.some((item) => item.id === flangeId) && list[0]) setFlangeId(list[0].id);
  }, [flangeId, flangeTypeId]);

  function resetResult() {
    setResult({ weight: 0, length: 0, square: 0, calcType: "weight" });
    setError("");
    setDidCalculate(false);
    setShowPrice(false);
    setPrice("0");
  }

  const totalCost = useMemo(() => {
    if (result.calcType !== "weight") return 0;
    return result.weight * parseNum(price);
  }, [price, result]);

  function onMetalChange(id: number) {
    const nextMetal = getMetal(id);
    const nextList = sortamentsForMetal(id);
    const nextSort =
      nextList.find((item) => item.id === sortId) ?? getSortament(nextMetal.default_sort_id);
    const nextGrade = findGrade(id, nextMetal.default_grade);
    setMetalId(id);
    setSortId(nextSort.id);
    setGradeTitle(nextGrade.title);
    setValues({ n: "1" });
    setCalcType("weight");
    resetResult();
  }

  function onSortChange(id: number) {
    setSortId(id);
    setValues({ n: "1" });
    setCalcType("weight");
    resetResult();
  }

  function buildInput(): CalcInput {
    const input = emptyInput(metalId, grade.p);
    for (const [key, value] of Object.entries(values)) {
      if (key in input) {
        (input as Record<string, number>)[key] = parseNum(value);
      }
    }
    if (sortament.key === "armature") input.d = parseNum(armD);
    if (sortament.key === "balk" && selectedBalk) input.m = selectedBalk.m;
    if (sortament.key === "channel" && selectedChannel) input.m = selectedChannel.m;
    if (sortament.key === "branch" && selectedBranch) {
      input.m = selectedBranch.m;
      input.n = parseNum(values.n);
    }
    if (sortament.key === "flange" && selectedFlange) {
      input.m = selectedFlange.m;
      input.n = parseNum(values.n);
    }
    return input;
  }

  function detailsLine(input: CalcInput): string {
    const parts: string[] = [];
    if (sortament.has_grades) parts.push(grade.title);
    if (sortament.key === "armature") parts.push(`Ø ${input.d} ${t("units.mm")}`);
    if (sortament.key === "balk" && selectedBalk) {
      parts.push(t(`balkTypes.${balkTypeId}`));
      parts.push(`№ ${selectedBalk.number}`);
    }
    if (sortament.key === "channel" && selectedChannel) {
      parts.push(`№ ${selectedChannel.number}`);
    }
    if (sortament.key === "branch" && selectedBranch) parts.push(selectedBranch.size);
    if (sortament.key === "flange" && selectedFlange) {
      parts.push(`${t(`flangeTypes.${flangeTypeId}`)}, DN ${selectedFlange.dy}`);
    }
    for (const field of fields) {
      const value = values[field.type];
      if (value) {
        parts.push(
          `${t(fieldMessageKey(sortament.key, field.type))}: ${value} ${t(`units.${unitFromDisp(field.disp)}`)}`,
        );
      }
    }
    return parts.join(" · ");
  }

  function calculate() {
    const input = buildInput();
    if (calcType === "weight" && !isValidWeight(sortament.id, input)) {
      setError(t("invalidData"));
      setResult({ weight: 0, length: 0, square: 0, calcType });
      return;
    }
    const weight = calcWeight(sortament.key, input, pipeProf);
    const length = calcLength(sortament.key, input, pipeProf);
    const square = sortament.key === "list" ? calcSquare(input) : 0;
    setError("");
    setDidCalculate(true);
    setShowPrice(false);
    setPrice("0");
    setResult({ weight, length, square, calcType });

    const heading =
      calcType === "length"
        ? `${t("headingLength")} ${t(`metals.${currentMetalKey}`)} ${t(`sortaments.${sortament.key}`)}`
        : `${t("heading")} ${t(`metals.${currentMetalKey}`)} ${t(`sortaments.${sortament.key}`)}`;

    const item: StoredHistory = {
      id: `${Date.now()}`,
      at: Date.now(),
      title: heading,
      metal: t(`metals.${currentMetalKey}`),
      sortament: t(`sortaments.${sortament.key}`),
      grade: sortament.has_grades ? grade.title : undefined,
      details: detailsLine(input),
      resultLabel: calcType === "length" ? t("resultLength") : t("weight"),
      resultValue:
        calcType === "length"
          ? `${formatResult(length, 3)} ${t("units.m")}`
          : `${formatResult(weight, 3)} ${t("units.kg")}`,
      metalId,
      sortId,
      gradeTitle,
      calcType,
      values,
      armD,
      balkTypeId,
      balkId,
      branchTypeId,
      branchId,
      channelId,
      flangeTypeId,
      flangeId,
      weight,
      length,
      square,
    };
    const nextHistory = [item, ...history].slice(0, 30);
    setHistory(nextHistory);
    if (canStoreFunctionalData()) {
      window.localStorage.setItem(CALC_HISTORY_KEY, JSON.stringify(nextHistory));
    }
  }

  function restore(row: StoredHistory) {
    setMetalId(row.metalId);
    setSortId(row.sortId);
    setGradeTitle(row.gradeTitle);
    setCalcType(row.calcType);
    setValues(row.values ?? { n: "1" });
    setArmD(row.armD);
    setBalkTypeId(row.balkTypeId);
    setBalkId(row.balkId);
    setBranchTypeId(row.branchTypeId);
    setBranchId(row.branchId);
    setChannelId(row.channelId);
    setFlangeTypeId(row.flangeTypeId);
    setFlangeId(row.flangeId);
    setResult({
      weight: row.weight,
      length: row.length,
      square: row.square,
      calcType: row.calcType,
    });
    setError("");
    setDidCalculate(true);
    setShowPrice(false);
    setPrice("0");
    setHistoryOpen(false);
  }

  function clearHistory() {
    setHistory([]);
    window.localStorage.removeItem(CALC_HISTORY_KEY);
  }

  return (
    <section className="surface-mottled-soft surface-grain-soft surface-glow relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <p className="text-[12px] text-[#8f99a3]">
        <Link href="/" className="transition-colors duration-300 hover:text-copper">
          {t("crumbHome")}
        </Link>
        {" > "}
        {t("crumb")}
      </p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[1.85rem] font-bold text-white sm:text-[2.4rem]">{t("title")}</h1>
          <p className="mt-2 max-w-xl text-[#8f99a3]">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[4px] border border-white/15 px-4 text-[13px] text-white transition-colors duration-300 hover:border-copper hover:bg-copper/15 hover:text-copper sm:w-auto"
          onClick={() => setHistoryOpen(true)}
        >
          <Clock className="size-4 text-copper" />
          {t("history")}
        </button>
      </div>

      <div className="mt-8 grid min-w-0 overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#0c1218] md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="overflow-x-hidden border-b border-white/[0.08] p-4 md:border-r md:border-b-0">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-copper uppercase">
            {t("metal")}
          </p>
          <ul className="mt-3">
            {metals.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onMetalChange(item.id)}
                  className={`flex w-full cursor-pointer items-center justify-between border-b border-white/[0.06] px-2 py-2.5 text-left text-[13px] transition-colors duration-300 ${
                    metalId === item.id ? "text-copper" : "text-white/80 transition-colors duration-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {t(`metals.${metalKey(item.id)}`)}
                  {metalId === item.id ? <Check className="size-4" /> : null}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.2em] text-copper uppercase">
            {t("shape")}
          </p>
          <ul ref={sortListRef} className="mt-3">
            {metalSortaments.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSortChange(item.id)}
                  className={`flex w-full cursor-pointer items-center justify-between border-b border-white/[0.06] px-2 py-2.5 text-left text-[13px] transition-colors duration-300 ${
                    sortId === item.id ? "bg-copper/15 text-copper" : "text-white/80 transition-colors duration-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {t(`sortaments.${item.key}`)}
                  {sortId === item.id ? <Check className="size-4" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 p-5 sm:p-8">
          <h2 className="text-[18px] leading-snug text-white sm:text-[20px]">
            {calcType === "length" ? t("headingLength") : t("heading")}{" "}
            <span className="text-copper">
              {t(`metals.${currentMetalKey}`).toLowerCase()}{" "}
              {t(`sortaments.${sortament.key}`).toLowerCase()}
            </span>
          </h2>

          {sortament.has_calc_togler ? (
              <div className="mt-5 inline-flex max-w-full flex-wrap rounded-[4px] border border-white/10 p-1">
              {(["weight", "length"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setCalcType(type);
                    resetResult();
                  }}
                  className={`cursor-pointer rounded-[3px] px-4 py-2 text-[13px] font-medium transition-colors ${
                    calcType === type ? "bg-copper/15 text-copper" : "text-white/70 transition-colors duration-300 hover:text-white"
                  }`}
                >
                  {t(`calcType.${type}`)}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
          >
            <div className="grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="flex items-center justify-center">
                <ShapePreview shapeKey={sortament.key} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {sortament.has_grades ? (
                  <label className="block text-[12px] text-[#8f99a3] sm:col-span-2">
                    {t(`gradeTitles.${currentMetalKey}`)}
                    <DarkSelect
                      value={gradeTitle}
                      onChange={(value) => {
                        setGradeTitle(value);
                        resetResult();
                      }}
                      className="mt-1.5 bg-[#070d13]"
                      options={metalGrades.map((item) => ({
                        value: item.title,
                        label: item.title,
                      }))}
                    />
                  </label>
                ) : null}

                {sortament.key === "armature" ? (
                  <label className="block text-[12px] text-[#8f99a3] sm:col-span-2">
                    {t("armDiameter")}
                    <DarkSelect
                      value={armD}
                      onChange={setArmD}
                      className="mt-1.5 bg-[#070d13]"
                      options={armVariants.map((item) => ({
                        value: String(item.d),
                        label: String(item.d),
                      }))}
                    />
                  </label>
                ) : null}

                {sortament.key === "balk" ? (
                  <>
                    <label className="block text-[12px] text-[#8f99a3] sm:col-span-2">
                      {t("balkType")}
                      <DarkSelect
                        value={String(balkTypeId)}
                        onChange={(value) => setBalkTypeId(Number(value))}
                        className="mt-1.5 bg-[#070d13]"
                        options={balkTypes.map((item) => ({
                          value: String(item.id),
                          label: t(`balkTypes.${item.id}`),
                        }))}
                      />
                    </label>
                    <label className="block text-[12px] text-[#8f99a3] sm:col-span-2">
                      {t("balkNumber")}
                      <DarkSelect
                        value={String(balkId)}
                        onChange={(value) => setBalkId(Number(value))}
                        className="mt-1.5 bg-[#070d13]"
                        options={filteredBalks.map((item) => ({
                          value: String(item.id),
                          label: item.number,
                        }))}
                      />
                    </label>
                  </>
                ) : null}

                {sortament.key === "branch" ? (
                  <>
                    <label className="block text-[12px] text-[#8f99a3]">
                      {t("branchType")}
                      <DarkSelect
                        value={String(branchTypeId)}
                        onChange={(value) => setBranchTypeId(Number(value))}
                        className="mt-1.5 bg-[#070d13]"
                        options={branchTypes.map((item) => ({
                          value: String(item.id),
                          label: t(`branchTypes.${item.id}`),
                        }))}
                      />
                    </label>
                    <label className="block text-[12px] text-[#8f99a3]">
                      {t("branchSize")}
                      <DarkSelect
                        value={String(branchId)}
                        onChange={(value) => setBranchId(Number(value))}
                        className="mt-1.5 bg-[#070d13]"
                        options={filteredBranches.map((item) => ({
                          value: String(item.id),
                          label: item.size,
                        }))}
                      />
                    </label>
                  </>
                ) : null}

                {sortament.key === "channel" ? (
                  <label className="block text-[12px] text-[#8f99a3] sm:col-span-2">
                    {t("channelNumber")}
                    <DarkSelect
                      value={String(channelId)}
                      onChange={(value) => setChannelId(Number(value))}
                      className="mt-1.5 bg-[#070d13]"
                      options={channels.map((item) => ({
                        value: String(item.id),
                        label: item.number,
                      }))}
                    />
                  </label>
                ) : null}

                {sortament.key === "flange" ? (
                  <>
                    <label className="block text-[12px] text-[#8f99a3]">
                      {t("flangePressure")}
                      <DarkSelect
                        value={String(flangeTypeId)}
                        onChange={(value) => setFlangeTypeId(Number(value))}
                        className="mt-1.5 bg-[#070d13]"
                        options={flangeTypes.map((item) => ({
                          value: String(item.id),
                          label: t(`flangeTypes.${item.id}`),
                        }))}
                      />
                    </label>
                    <label className="block text-[12px] text-[#8f99a3]">
                      {t("flangeDy")}
                      <DarkSelect
                        value={String(flangeId)}
                        onChange={(value) => setFlangeId(Number(value))}
                        className="mt-1.5 bg-[#070d13]"
                        options={filteredFlanges.map((item) => ({
                          value: String(item.id),
                          label: String(item.dy),
                        }))}
                      />
                    </label>
                  </>
                ) : null}

                {fields.map((field) =>
                  field.type === "n" ? (
                    <QtyField
                      key={field.type}
                      label={t("fields.n")}
                      value={values.n ?? "1"}
                      onChange={(value) => setValues((current) => ({ ...current, n: value }))}
                    />
                  ) : (
                    <Field
                      key={field.type}
                      label={t(fieldMessageKey(sortament.key, field.type))}
                      suffix={t(`units.${unitFromDisp(field.disp)}`)}
                      value={values[field.type] ?? ""}
                      onChange={(value) =>
                        setValues((current) => ({ ...current, [field.type]: value }))
                      }
                      placeholder={t("enterValue")}
                    />
                  ),
                )}
              </div>
            </div>

            {error ? <p className="mt-4 text-[13px] text-red-400">{error}</p> : null}

            <button
              type="submit"
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_50%,#d9965c_100%)] text-[14px] font-semibold text-white sm:w-auto sm:px-10"
            >
              {t("calculate")}
              <CalcIcon className="size-4" />
            </button>
          </form>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {sortament.key === "list" ? (
              <ResultBox
                label={t("area")}
                value={formatResult(result.square, 4)}
                unit={t("units.m2")}
              />
            ) : null}
            {calcType === "length" ? (
              <ResultBox
                label={t("resultLength")}
                value={formatResult(result.length, 3)}
                unit={t("units.m")}
              />
            ) : (
              <ResultBox
                label={t("weight")}
                value={formatResult(result.weight, 3)}
                unit={t("units.kg")}
              />
            )}
            {didCalculate && result.calcType === "weight" ? (
              showPrice ? (
                <>
                  <div className="rounded-[6px] border border-white/[0.08] bg-[#070d13] px-5 py-4">
                    <p className="text-[11px] tracking-[0.16em] text-[#8f99a3] uppercase">
                      {t("pricePerKg")}
                    </p>
                    <span className="mt-2 flex h-11 overflow-hidden rounded-[4px] border border-white/10">
                      <input
                        value={price}
                        inputMode="decimal"
                        aria-label={t("pricePerKg")}
                        onChange={(e) => setPrice(e.target.value.replace(/[^\d.,]/g, ""))}
                        className="w-full bg-transparent px-3 text-[14px] text-white outline-none"
                      />
                      <span className="flex items-center px-3 text-[12px] text-[#8f99a3]">
                        {t("units.perKg")}
                      </span>
                    </span>
                  </div>
                  <ResultBox
                    label={t("totalCost")}
                    value={formatMoney(totalCost)}
                    unit={t("units.currency")}
                  />
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPrice(true)}
                  className="rounded-[6px] border border-dashed border-copper/45 px-5 py-4 text-left text-[14px] font-medium text-copper transition-colors duration-200 hover:border-copper hover:bg-copper/[0.08]"
                >
                  {t("calculatePrice")}
                </button>
              )
            ) : null}
          </div>
          <p className="mt-4 text-[12px] text-[#8f99a3]">{t("disclaimer")}</p>
        </div>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {historyOpen ? (
                <motion.div
                  className="fixed inset-x-0 bottom-0 top-[calc(72px+env(safe-area-inset-top))] z-[80] flex justify-end bg-black/55 sm:top-[calc(80px+env(safe-area-inset-top))]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setHistoryOpen(false)}
                >
                  <motion.aside
                    initial={{ x: 420 }}
                    animate={{ x: 0 }}
                    exit={{ x: 420 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    data-lenis-prevent=""
                    className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0c1218] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-semibold text-white">
                        {t("history")}
                      </h3>
                      <button
                        type="button"
                        className="cursor-pointer text-white/70 transition-colors duration-300 hover:text-white"
                        onClick={() => setHistoryOpen(false)}
                        aria-label="Close"
                      >
                        <X className="size-5" />
                      </button>
                    </div>
                    {history.length === 0 ? (
                      <p className="mt-8 text-[14px] text-[#8f99a3]">
                        {t("historyEmpty")}
                      </p>
                    ) : (
                      <>
                      <ul
                        data-lenis-prevent=""
                        className="mt-6 min-h-0 flex-1 overflow-auto overscroll-contain"
                      >
                        {history.map((row) => (
                          <li key={row.id} className="border-b border-white/[0.07]">
                            <button
                              type="button"
                              className="w-full cursor-pointer rounded-[6px] px-3 py-3 text-left transition-colors duration-300 hover:bg-copper/15"
                              onClick={() => restore(row)}
                            >
                              <p className="text-[14px] text-white">
                                {row.metal} · {row.sortament}
                              </p>
                              {row.details ? (
                                <p className="mt-1 text-[12px] text-[#8f99a3]">
                                  {row.details}
                                </p>
                              ) : null}
                              <p className="mt-1 text-[12px] text-copper">
                                {row.resultLabel}: {row.resultValue}
                              </p>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={clearHistory}
                        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-white/15 text-[13px] text-white/85 transition-colors duration-300 hover:border-copper/50 hover:text-copper"
                      >
                        <Trash2 className="size-4" strokeWidth={1.8} />
                        {t("clearHistory")}
                      </button>
                      </>
                    )}
                  </motion.aside>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}

      <div className="mt-8 grid gap-px overflow-hidden rounded-[6px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
        {[
          { icon: Target, key: "accuracy" as const },
          { icon: ShieldCheck, key: "density" as const },
          { icon: Layers, key: "metals" as const },
          { icon: Clock, key: "history" as const },
          { icon: FileText, key: "pdf" as const },
        ].map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-center gap-3 bg-[#0c1218] px-4 py-4">
            <Icon className="size-4 shrink-0 text-copper" />
            <span className="text-[12px] text-white/90">{t(`trust.${key}`)}</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function Field({
  label,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block text-[12px] text-[#8f99a3]">
      {label}
      <span className="mt-1.5 flex h-11 overflow-hidden rounded-[4px] border border-white/10">
        <input
          value={value}
          inputMode="decimal"
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ""))}
          placeholder={placeholder}
          className="w-full bg-[#070d13] px-3 text-[14px] text-white outline-none"
        />
        <span className="flex items-center px-3 text-[12px] text-[#8f99a3]">{suffix}</span>
      </span>
    </label>
  );
}

function QtyField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const qty = Math.max(1, parseNum(value) || 1);
  return (
    <label className="block text-[12px] text-[#8f99a3]">
      {label}
      <span className="mt-1.5 flex h-11 overflow-hidden rounded-[4px] border border-white/10">
        <button
          type="button"
          className="w-11 cursor-pointer text-white"
          onClick={() => onChange(String(Math.max(1, qty - 1)))}
        >
          −
        </button>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
          className="w-full bg-[#070d13] text-center text-[14px] text-white outline-none"
        />
        <button
          type="button"
          className="w-11 cursor-pointer text-white"
          onClick={() => onChange(String(qty + 1))}
        >
          +
        </button>
      </span>
    </label>
  );
}

function ResultBox({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="rounded-[6px] border border-white/[0.08] bg-[#070d13] px-5 py-4">
      <p className="text-[11px] tracking-[0.16em] text-[#8f99a3] uppercase">{label}</p>
      <p className="mt-1 text-[28px] font-semibold text-white">
        {value} <span className="text-[14px] font-normal text-copper">{unit}</span>
      </p>
    </div>
  );
}
