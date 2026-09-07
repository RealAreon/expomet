"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator as CalcIcon, Clock3, X } from "lucide-react";

import { ShapePreview } from "@/components/shape-preview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { calcLength, calcSquare, calcWeight, isValidWeight } from "@/lib/calc";
import {
  armVariants,
  balkTypes,
  balks,
  branchTypes,
  branches,
  calcTitle,
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
} from "@/lib/catalog";
import {
  formatLength,
  formatPrice,
  formatSquare,
  formatWeight,
  parseNum,
} from "@/lib/format";
import type { CalcInput, CalcType, HistoryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const HISTORY_KEY = "amari-calc-history";

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

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

function Field({
  id,
  label,
  unit,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          inputMode="decimal"
          placeholder="0"
          value={value}
          onChange={(event) =>
            onChange(event.target.value.replace(/[^\d.,]/g, ""))
          }
          className="pr-12"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
          {unit}
        </span>
      </div>
    </div>
  );
}

type CalculatorProps = {
  initialMetalId?: number;
  initialSortId?: number;
  initialGrade?: string;
};

export function Calculator({
  initialMetalId = 3,
  initialSortId = 6,
  initialGrade = "АМг",
}: CalculatorProps) {
  const startMetal = getMetal(initialMetalId);
  const availableStart = sortamentsForMetal(startMetal.id);
  const startSort =
    availableStart.find((item) => item.id === initialSortId) ??
    getSortament(startMetal.default_sort_id);
  const startGrade = findGrade(startMetal.id, initialGrade);

  const [metalId, setMetalId] = useState(startMetal.id);
  const [sortId, setSortId] = useState(startSort.id);
  const [gradeTitle, setGradeTitle] = useState(startGrade.title);
  const [calcType, setCalcType] = useState<CalcType>("weight");
  const [values, setValues] = useState<Record<string, string>>({});
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
  const [result, setResult] = useState<null | {
    weight: number;
    length: number;
    square: number;
    calcType: CalcType;
  }>(null);
  const [showPrice, setShowPrice] = useState(false);
  const [price, setPrice] = useState("0");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const metal = getMetal(metalId);
  const sortament = getSortament(sortId);
  const grade = findGrade(metalId, gradeTitle);
  const metalSortaments = sortamentsForMetal(metalId);
  const metalGrades = gradesForMetal(metalId);
  const title = calcTitle(metal, sortament, calcType);
  const fields = fieldsForCalc(sortament, calcType);
  const filteredBalks = balks.filter((item) => item.type_id === balkTypeId);
  const filteredBranches = branches.filter(
    (item) => item.type_id === branchTypeId,
  );
  const filteredFlanges = flanges.filter(
    (item) => item.type_id === flangeTypeId,
  );

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    const list = balks.filter((item) => item.type_id === balkTypeId);
    if (!list.some((item) => item.id === balkId) && list[0]) {
      setBalkId(list[0].id);
    }
  }, [balkId, balkTypeId]);

  useEffect(() => {
    const list = branches.filter((item) => item.type_id === branchTypeId);
    if (!list.some((item) => item.id === branchId) && list[0]) {
      setBranchId(list[0].id);
    }
  }, [branchId, branchTypeId]);

  useEffect(() => {
    const list = flanges.filter((item) => item.type_id === flangeTypeId);
    if (!list.some((item) => item.id === flangeId) && list[0]) {
      setFlangeId(list[0].id);
    }
  }, [flangeId, flangeTypeId]);

  const selectedBalk = balks.find((item) => item.id === balkId);
  const selectedBranch = branches.find((item) => item.id === branchId);
  const selectedChannel = channels.find((item) => item.id === channelId);
  const selectedFlange = flanges.find((item) => item.id === flangeId);

  function resetResult() {
    setResult(null);
    setError("");
    setShowPrice(false);
    setPrice("0");
  }

  function onMetalChange(id: number) {
    const nextMetal = getMetal(id);
    const nextList = sortamentsForMetal(id);
    const nextSort =
      nextList.find((item) => item.id === sortId) ??
      getSortament(nextMetal.default_sort_id);
    const nextGrade = findGrade(id, nextMetal.default_grade);
    setMetalId(id);
    setSortId(nextSort.id);
    setGradeTitle(nextGrade.title);
    setValues({});
    setCalcType("weight");
    resetResult();
  }

  function onSortChange(id: number) {
    setSortId(id);
    setValues({});
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
    if (sortament.key === "armature") {
      input.d = parseNum(armD);
    }
    if (sortament.key === "balk" && selectedBalk) {
      input.m = selectedBalk.m;
    }
    if (sortament.key === "channel" && selectedChannel) {
      input.m = selectedChannel.m;
    }
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
    if (sortament.key === "armature") parts.push(`Ø ${input.d} мм`);
    if (sortament.key === "balk" && selectedBalk) {
      parts.push(`${balkTypes.find((item) => item.id === balkTypeId)?.title}`);
      parts.push(`№ ${selectedBalk.number}`);
    }
    if (sortament.key === "channel" && selectedChannel) {
      parts.push(`№ ${selectedChannel.number}`);
    }
    if (sortament.key === "branch" && selectedBranch) {
      parts.push(selectedBranch.size);
    }
    if (sortament.key === "flange" && selectedFlange) {
      parts.push(
        `${flangeTypes.find((item) => item.id === flangeTypeId)?.title}, Dy ${selectedFlange.dy}`,
      );
    }
    for (const field of fields) {
      const value = values[field.type];
      if (value) parts.push(`${field.label}: ${value} ${field.disp}`);
    }
    return parts.join(" · ");
  }

  function calculate() {
    const input = buildInput();
    if (calcType === "weight" && !isValidWeight(sortament.id, input)) {
      setError("Проверьте введенные данные");
      setResult(null);
      return;
    }
    const weight = calcWeight(sortament.key, input, pipeProf);
    const length = calcLength(sortament.key, input, pipeProf);
    const square = sortament.key === "list" ? calcSquare(input) : 0;
    setError("");
    setResult({ weight, length, square, calcType });

    const item: HistoryItem = {
      id: `${Date.now()}`,
      at: Date.now(),
      title,
      metal: metal.title,
      sortament: sortament.title,
      grade: sortament.has_grades ? grade.title : undefined,
      details: detailsLine(input),
      resultLabel: calcType === "length" ? "Длина" : "Вес",
      resultValue:
        calcType === "length" ? formatLength(length) : formatWeight(weight),
    };
    const nextHistory = [item, ...history].slice(0, 30);
    setHistory(nextHistory);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  }

  const total = useMemo(() => {
    if (!result || result.calcType !== "weight") return 0;
    return result.weight * parseNum(price);
  }, [price, result]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium tracking-[0.18em] text-primary uppercase">
            Металлопрокат
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Калькулятор веса
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Расчёт массы и длины по сортаменту и марке металла — те же формулы,
            что на Amari.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setHistoryOpen(true)}
          className="cursor-pointer"
        >
          <Clock3 />
          История расчетов
        </Button>
      </div>

      <Card className="grid overflow-hidden lg:grid-cols-[280px_1fr]">
        <aside className="border-b bg-muted/40 lg:border-r lg:border-b-0">
          <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-1 lg:p-5">
            <div>
              <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Металл
              </div>
              <nav className="hidden flex-col lg:flex">
                {metals.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onMetalChange(item.id)}
                    className={cn(
                      "cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors",
                      item.id === metalId
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-background",
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
              <div className="lg:hidden">
                <NativeSelect
                  value={metalId}
                  onChange={(event) => onMetalChange(Number(event.target.value))}
                >
                  {metals.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Сортамент
              </div>
              <nav className="hidden max-h-[520px] flex-col overflow-auto lg:flex">
                {metalSortaments.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSortChange(item.id)}
                    className={cn(
                      "cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors",
                      item.id === sortId
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-background",
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
              <div className="lg:hidden">
                <NativeSelect
                  value={sortId}
                  onChange={(event) => onSortChange(Number(event.target.value))}
                >
                  {metalSortaments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>
          </div>
        </aside>

        <section className="p-5 md:p-8">
          <h2 className="font-heading text-xl font-medium md:text-2xl">
            {title}
          </h2>

          {sortament.has_calc_togler ? (
            <div className="mt-5 inline-flex rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setCalcType("weight");
                  resetResult();
                }}
                className={cn(
                  "cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  calcType === "weight"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                Расчет веса
              </button>
              <button
                type="button"
                onClick={() => {
                  setCalcType("length");
                  resetResult();
                }}
                className={cn(
                  "cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  calcType === "length"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                Расчет длины
              </button>
            </div>
          ) : null}

          <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
            <ShapePreview shapeKey={sortament.key} className="hidden lg:flex" />

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                calculate();
              }}
            >
              {sortament.has_grades ? (
                <div className="space-y-2">
                  <Label htmlFor="grade">{metal.grade_title}</Label>
                  <NativeSelect
                    id="grade"
                    value={gradeTitle}
                    onChange={(event) => {
                      setGradeTitle(event.target.value);
                      resetResult();
                    }}
                  >
                    {metalGrades.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
              ) : null}

              {sortament.key === "armature" ? (
                <div className="space-y-2">
                  <Label htmlFor="arm-d">Номинальный диаметр</Label>
                  <NativeSelect
                    id="arm-d"
                    value={armD}
                    onChange={(event) => setArmD(event.target.value)}
                  >
                    {armVariants.map((item) => (
                      <option key={item.id} value={item.d}>
                        {item.d}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
              ) : null}

              {sortament.key === "balk" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="balk-type">Тип балки</Label>
                    <NativeSelect
                      id="balk-type"
                      value={balkTypeId}
                      onChange={(event) =>
                        setBalkTypeId(Number(event.target.value))
                      }
                    >
                      {balkTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balk-no">Номер балки</Label>
                    <NativeSelect
                      id="balk-no"
                      value={balkId}
                      onChange={(event) => setBalkId(Number(event.target.value))}
                    >
                      {filteredBalks.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.number}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                </>
              ) : null}

              {sortament.key === "branch" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="branch-type">Исполнение</Label>
                    <NativeSelect
                      id="branch-type"
                      value={branchTypeId}
                      onChange={(event) =>
                        setBranchTypeId(Number(event.target.value))
                      }
                    >
                      {branchTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-size">Размер</Label>
                    <NativeSelect
                      id="branch-size"
                      value={branchId}
                      onChange={(event) =>
                        setBranchId(Number(event.target.value))
                      }
                    >
                      {filteredBranches.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.size}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                  <Field
                    id="n"
                    label="Количество"
                    unit="шт."
                    value={values.n ?? ""}
                    onChange={(value) =>
                      setValues((current) => ({ ...current, n: value }))
                    }
                  />
                </>
              ) : null}

              {sortament.key === "channel" ? (
                <div className="space-y-2">
                  <Label htmlFor="channel-no">Номер швеллера</Label>
                  <NativeSelect
                    id="channel-no"
                    value={channelId}
                    onChange={(event) =>
                      setChannelId(Number(event.target.value))
                    }
                  >
                    {channels.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.number}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
              ) : null}

              {sortament.key === "flange" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="flange-type">Давление</Label>
                    <NativeSelect
                      id="flange-type"
                      value={flangeTypeId}
                      onChange={(event) =>
                        setFlangeTypeId(Number(event.target.value))
                      }
                    >
                      {flangeTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flange-dy">Условный диаметр</Label>
                    <NativeSelect
                      id="flange-dy"
                      value={flangeId}
                      onChange={(event) =>
                        setFlangeId(Number(event.target.value))
                      }
                    >
                      {filteredFlanges.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.dy}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                  <Field
                    id="n"
                    label="Количество"
                    unit="шт."
                    value={values.n ?? ""}
                    onChange={(value) =>
                      setValues((current) => ({ ...current, n: value }))
                    }
                  />
                </>
              ) : null}

              {fields.map((field) => (
                <Field
                  key={field.type}
                  id={field.type}
                  label={field.label}
                  unit={field.disp}
                  value={values[field.type] ?? ""}
                  onChange={(value) =>
                    setValues((current) => ({ ...current, [field.type]: value }))
                  }
                />
              ))}

              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}

              <Button type="submit" variant="accent" size="lg" className="w-full">
                <CalcIcon />
                Рассчитать
              </Button>
            </form>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sortament.key === "list" ? (
              <div className="rounded-xl bg-muted/60 p-4">
                <div className="text-xs tracking-wide text-muted-foreground uppercase">
                  Площадь
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {result ? formatSquare(result.square) : "0 м²"}
                </div>
              </div>
            ) : null}
            <div className="rounded-xl bg-primary p-4 text-primary-foreground">
              <div className="text-xs tracking-wide uppercase opacity-80">
                {result?.calcType === "length" ? "Длина" : "Вес"}
              </div>
              <div className="mt-1 text-2xl font-semibold">
                {result
                  ? result.calcType === "length"
                    ? formatLength(result.length)
                    : formatWeight(result.weight)
                  : calcType === "length"
                    ? "0 м."
                    : "0 кг."}
              </div>
            </div>
            {result && result.calcType === "weight" ? (
              showPrice ? (
                <>
                  <div className="rounded-xl bg-muted/60 p-4">
                    <div className="text-xs tracking-wide text-muted-foreground uppercase">
                      × Средняя цена за кг.
                    </div>
                    <div className="relative mt-2">
                      <Input
                        value={price}
                        inputMode="decimal"
                        aria-label="Средняя цена за кг"
                        onChange={(event) =>
                          setPrice(event.target.value.replace(/[^\d.,]/g, ""))
                        }
                        className="pr-14"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
                        р./кг.
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/60 p-4">
                    <div className="text-xs tracking-wide text-muted-foreground uppercase">
                      = Общая стоимость
                    </div>
                    <div className="mt-1 text-2xl font-semibold">
                      {formatPrice(total)}
                    </div>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPrice(true)}
                  className="cursor-pointer rounded-xl border border-dashed border-border p-4 text-left text-sm font-medium text-primary hover:bg-muted/40"
                >
                  Рассчитать цену
                </button>
              )
            ) : null}
          </div>
        </section>
      </Card>

      <AnimatePresence>
        {historyOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end bg-foreground/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHistoryOpen(false)}
          >
            <motion.aside
              initial={{ x: 360 }}
              animate={{ x: 0 }}
              exit={{ x: 360 }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 className="font-heading text-lg font-medium">
                  История расчетов
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setHistoryOpen(false)}
                >
                  <X />
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Пока нет сохранённых расчётов.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {history.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-xl border border-border p-4"
                      >
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {item.details}
                        </div>
                        <div className="mt-2 text-sm">
                          {item.resultLabel}:{" "}
                          <span className="font-semibold">
                            {item.resultValue}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
