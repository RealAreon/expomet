"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Banknote,
  Calculator,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  Package,
  RotateCcw,
  Search,
  Truck,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CATEGORY_META,
  PRODUCTS,
  type CategorySlug,
  type Product,
} from "@/lib/catalog";
import { DarkSelect } from "@/components/dark-select";
import { cn } from "@/lib/utils";

type SortKey = "popularity" | "name";
type LocaleKey = "en" | "uk";

const PAGE_SIZE = 12;

export function CatalogGrid({ category }: { category?: CategorySlug }) {
  const t = useTranslations("catalog");
  const tc = useTranslations("categories.items");
  const locale = (useLocale() === "uk" ? "uk" : "en") as LocaleKey;

  const [materials, setMaterials] = useState<CategorySlug[]>(
    category ? [category] : [],
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popularity");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [details, setDetails] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    return Object.fromEntries(
      CATEGORY_META.map((item) => [
        item.slug,
        PRODUCTS.filter((product) => product.category === item.slug).length,
      ]),
    ) as Record<CategorySlug, number>;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = PRODUCTS.filter((product) => {
      if (materials.length && !materials.includes(product.category)) return false;
      if (inStockOnly && !product.inStock) return false;
      if (
        q &&
        !`${product.name.en} ${product.name.uk} ${product.form.en} ${product.form.uk} ${product.thicknessMm} ${product.widthMm}`
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }
      return true;
    });

    return items.sort((a, b) => {
      if (sort === "name") return a.name[locale].localeCompare(b.name[locale]);
      return b.popularity - a.popularity;
    });
  }, [materials, inStockOnly, query, sort, locale]);

  useEffect(() => {
    setPage(1);
  }, [materials, inStockOnly, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageFrom = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageTo = Math.min(currentPage * PAGE_SIZE, filtered.length);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (next: number) => {
    const clamped = Math.min(Math.max(1, next), totalPages);
    if (clamped === currentPage) return;
    setPage(clamped);
    window.dispatchEvent(
      new CustomEvent("expomet:scroll-to", { detail: { id: "catalog-results" } }),
    );
  };

  const openDetails = async (product: Product) => {
    if (!product.spec) {
      await Promise.all(product.specImages.map(preloadImage));
    }
    setDetails(product);
  };

  const clearFilters = () => {
    setMaterials([]);
    setInStockOnly(false);
    setQuery("");
    setSort("popularity");
  };

  const toggleMaterial = (slug: CategorySlug) => {
    setMaterials((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  return (
    <div className="surface-mottled relative bg-[#0a0e14]">
      <div className="relative z-10 mx-auto max-w-[1520px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16">
        <button
          type="button"
          onClick={() => setFiltersOpen((value) => !value)}
          aria-expanded={filtersOpen}
          className="mb-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] border border-white/15 text-[14px] text-white/90 transition-colors hover:border-copper/50 hover:text-copper md:hidden"
        >
          <Filter className="size-4" strokeWidth={1.8} />
          {t("filters")}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-300",
              filtersOpen && "rotate-180",
            )}
          />
        </button>
      <div className="grid min-w-0 gap-8 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[380px_minmax(0,1fr)]">
        <aside
          className={cn(
            "h-fit rounded-[18px] border border-white/[0.1] bg-[#0c1218] p-5 shadow-[0_22px_48px_rgb(0_0_0_/_0.32)] sm:p-8",
            !filtersOpen && "max-md:hidden",
          )}
        >
          <p className="flex items-center gap-3 text-[14px] font-semibold tracking-[0.24em] text-copper uppercase">
            <Filter className="size-[18px]" strokeWidth={1.9} />
            {t("filters")}
          </p>
          <div className="mt-5 h-px bg-white/[0.1]" />

          <FilterSection
            title={t("materialType")}
            open={openMaterial}
            onToggle={() => setOpenMaterial((value) => !value)}
          >
            <ul className="space-y-4">
              {CATEGORY_META.map((item) => {
                const checked = materials.includes(item.slug);
                return (
                  <li key={item.slug}>
                    <label className="flex cursor-pointer items-center gap-3.5 text-[15px] text-white/92">
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-[5px] border transition-colors",
                          checked
                            ? "border-copper bg-copper"
                            : "border-white/28 bg-transparent",
                        )}
                      >
                        {checked ? (
                          <Check className="size-3.5 text-white" strokeWidth={3} />
                        ) : null}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMaterial(item.slug)}
                        className="sr-only"
                      />
                      <span>{tc(item.slug)}</span>
                      <span className="ml-auto text-[14px] text-[#8f99a3]">
                        {counts[item.slug]}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </FilterSection>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.1] pt-7">
            <div>
              <p className="text-[15px] text-white">{t("inStock")}</p>
              <p className="mt-1.5 text-[13px] leading-5 text-[#8f99a3]">
                {t("inStockHint")}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={inStockOnly}
              onClick={() => setInStockOnly((value) => !value)}
              className={cn(
                "relative h-8 w-[52px] shrink-0 rounded-full transition-colors",
                inStockOnly ? "bg-copper" : "bg-white/14",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 left-1 size-6 rounded-full bg-white shadow-sm transition-transform",
                  inStockOnly && "translate-x-[20px]",
                )}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/20 text-[15px] text-white/90 transition-colors hover:border-copper hover:text-copper"
          >
            <RotateCcw className="size-[18px]" strokeWidth={1.8} />
            {t("clear")}
          </button>
        </aside>

        <div className="min-w-0">
          <p className="text-[12px] text-[#8f99a3]">
            <Link href="/" className="transition-colors duration-300 hover:text-copper">
              {t("crumbHome")}
            </Link>
            {" > "}
            {t("crumb")}
          </p>
          <h1 className="mt-3 text-[1.85rem] font-bold tracking-[-0.03em] text-white sm:text-[2.2rem] lg:text-[2.6rem]">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[#8f99a3]">
            {t("subtitle")}
          </p>

          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8f99a3]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("search")}
                className="h-11 w-full rounded-[6px] border border-white/10 bg-[#10151c] pr-3 pl-10 text-[14px] text-white outline-none placeholder:text-[#6d7782]"
              />
            </label>
            <DarkSelect
              value={sort}
              onChange={setSort}
              aria-label={t("sortPopularity")}
              className="lg:w-[220px]"
              options={[
                { value: "popularity", label: t("sortPopularity") },
                { value: "name", label: t("sortName") },
              ]}
            />
          </div>

          <div id="catalog-results" className="mt-4 flex scroll-mt-24 items-center justify-between gap-3">
            <p className="min-w-0 text-[12px] leading-5 text-[#8f99a3]">
              {t("showing", {
                from: pageFrom,
                to: pageTo,
                total: filtered.length,
              })}
            </p>
            <div className="relative isolate flex h-9 shrink-0 overflow-hidden rounded-[6px] border border-white/10">
              <motion.span
                aria-hidden
                className="absolute top-0 left-0 size-9 bg-copper"
                animate={{ x: view === "grid" ? 0 : 36 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
              <button
                type="button"
                onClick={() => setView("grid")}
                className={cn(
                  "relative z-10 inline-flex size-9 items-center justify-center transition-colors duration-300",
                  view === "grid" ? "text-white" : "text-white/70",
                )}
                aria-label={t("gridView")}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={cn(
                  "relative z-10 inline-flex size-9 items-center justify-center transition-colors duration-300",
                  view === "list" ? "text-white" : "text-white/70",
                )}
                aria-label={t("listView")}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${view}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "mt-5 grid min-w-0 gap-4",
                view === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                  : "grid-cols-1",
              )}
            >
            {paged.map((product) => (
              <article
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => void openDetails(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    void openDetails(product);
                  }
                }}
                className={cn(
                  "hover-glow group cursor-pointer rounded-[12px] border border-white/[0.08] bg-[#12181f] text-left hover:border-copper/25 hover:bg-[#161d25]",
                  view === "list" && "grid min-w-0 gap-4 sm:grid-cols-[220px_minmax(0,1fr)]",
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-[#0b1016]",
                    view === "grid" ? "h-[168px]" : "h-[168px] sm:h-full",
                    view === "grid" && "rounded-t-[12px]",
                    view === "list" && "rounded-[12px] sm:rounded-l-[12px] sm:rounded-r-none",
                  )}
                >
                  <Image
                    src={product.image}
                    alt={product.name[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col p-4">
                  <h2 className="text-[16px] font-semibold text-white">
                    {product.name[locale]}
                  </h2>
                  <dl className="mt-3 space-y-1.5 text-[13px] text-[#8f99a3]">
                    <div className="flex justify-between gap-3">
                      <dt>{t("thickness")}</dt>
                      <dd className="text-white/85">{product.thicknessMm}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>{t("width")}</dt>
                      <dd className="text-white/85">{product.widthMm}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 grid min-w-0 grid-cols-2 gap-2">
                    <span className="inline-flex h-9 min-w-0 items-center justify-center rounded-[4px] border border-white/20 px-1 text-center text-[12px] text-white/90 transition-[border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-copper/40 group-hover:text-copper">
                      {t("details")}
                    </span>
                    <Link
                      href="/contacts"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-9 min-w-0 items-center justify-center rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_100%)] px-1 text-center text-[12px] font-medium text-white"
                    >
                      {t("request")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 ? (
            <nav
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
              aria-label={t("pagination")}
            >
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
                className="inline-flex h-10 items-center gap-1 rounded-[6px] border border-white/12 px-3 text-[13px] text-white/85 transition-colors duration-300 hover:border-copper/40 hover:text-copper disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft className="size-4" />
                {t("prevPage")}
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => goToPage(number)}
                    aria-current={number === currentPage ? "page" : undefined}
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-[6px] border text-[13px] transition-colors duration-300",
                      number === currentPage
                        ? "border-copper bg-copper/20 text-copper"
                        : "border-white/12 text-white/80 hover:border-copper/40 hover:text-copper",
                    )}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="inline-flex h-10 items-center gap-1 rounded-[6px] border border-white/12 px-3 text-[13px] text-white/85 transition-colors duration-300 hover:border-copper/40 hover:text-copper disabled:pointer-events-none disabled:opacity-35"
              >
                {t("nextPage")}
                <ChevronRight className="size-4" />
              </button>
            </nav>
          ) : null}
        </div>
      </div>
      </div>

      <AnimatePresence>
        {details ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-3 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setDetails(null)}
          >
            <motion.div
              className="mb-[env(safe-area-inset-bottom)] flex max-h-[min(92dvh,90vh)] w-full max-w-4xl flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#07090c] shadow-[0_24px_80px_rgb(0_0_0_/_0.55)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
            <div className="flex shrink-0 items-start justify-between gap-3 px-4 pt-4 sm:gap-4 sm:px-7 sm:pt-7">
              <h3 className="min-w-0 text-[18px] font-semibold text-white sm:text-[24px]">
                {details.name[locale]}
              </h3>
              <button
                type="button"
                onClick={() => setDetails(null)}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-[4px] border border-white/15 text-white/80 hover:text-white"
                aria-label={t("close")}
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-7 sm:py-5">
              <p className="text-[12px] font-semibold tracking-[0.2em] text-white uppercase">
                {t("parameters")}
              </p>

              {details.spec ? (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left text-[13px] text-white sm:text-[14px]">
                    <thead>
                      <tr>
                        {details.spec.headers.map((header) => (
                          <th
                            key={header}
                            className="border border-white/30 px-3 py-2.5 font-semibold tracking-[0.06em] uppercase"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {details.spec.rows.map((row, index) => (
                        <tr key={index}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={`${index}-${cellIndex}`}
                              className="border border-white/30 px-3 py-2.5 align-top"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-3 space-y-4">
                  {details.specImages.map((src) => (
                    <SpecSheet key={src} src={src} />
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-0.5">
                <ProductInfoRow
                  icon={Banknote}
                  title={t("info.paymentTitle")}
                  text={t("info.paymentText")}
                />
                <ProductInfoRow
                  icon={Truck}
                  title={t("info.deliveryTitle")}
                  text={t("info.deliveryText")}
                />
                <ProductInfoRow
                  icon={Package}
                  title={t("info.packagingTitle")}
                  text={t("info.packagingText")}
                />
              </div>
            </div>

            <div className="flex shrink-0 flex-col-reverse justify-end gap-3 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:px-7">
              <Link
                href="/calculator"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[5px] border border-white/25 px-6 text-[14px] font-medium text-white transition-colors hover:border-copper hover:text-copper sm:w-auto"
              >
                <Calculator className="size-4" strokeWidth={1.8} />
                {t("calculate")}
              </Link>
              <Link
                href="/contacts"
                className="inline-flex h-11 w-full items-center justify-center rounded-[5px] bg-[#c47c54] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#d08960] sm:w-auto"
              >
                {t("request")}
              </Link>
            </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

function SpecSheet({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-[4px] border border-white/20 bg-[#07090c]">
      {/* native img so the preloaded spec sheet paints immediately */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="block h-auto w-full bg-[#07090c]" />
    </div>
  );
}

function ProductInfoRow({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4 py-3.5">
      <Icon className="mt-0.5 size-6 shrink-0 text-white sm:size-8" strokeWidth={1.45} />
      <div className="min-w-0">
        <p className="text-[16px] font-semibold text-white">{title}</p>
        <p className="mt-1 text-[14px] leading-6 text-[#9aa3ad]">{text}</p>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 pt-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-[14px] font-semibold tracking-[0.16em] text-white uppercase"
      >
        {title}
        <ChevronDown
          className="size-5 text-copper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          strokeWidth={1.8}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="filter-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
