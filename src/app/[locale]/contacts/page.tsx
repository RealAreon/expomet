import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ContactsPage } from "@/components/contacts-page";

export default async function ContactsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <ContactsPage />;
}
