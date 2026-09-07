import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CatalogGrid } from "@/components/catalog-grid";
import { CATEGORY_META, type CategorySlug } from "@/lib/catalog";

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale as Locale);
  const active = CATEGORY_META.find((item) => item.slug === category)?.slug as
    | CategorySlug
    | undefined;

  return <CatalogGrid category={active} />;
}
