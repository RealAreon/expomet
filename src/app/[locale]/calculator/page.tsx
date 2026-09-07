import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { WeightCalculator } from "@/components/weight-calculator";

export default async function CalculatorRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <WeightCalculator />;
}
