import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ServicesPage } from "@/components/services-page";

export default async function ServicesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <ServicesPage />;
}
