import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalArticle } from "@/components/legal-article";
import { privacyContent } from "@/content/legal";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "uk" ? "uk" : "en";
  return { title: privacyContent[lang].title };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("legal");
  const lang = locale === "uk" ? "uk" : "en";

  return (
    <LegalArticle
      homeLabel={t("crumbHome")}
      doc={privacyContent[lang]}
      actions={
        <Link
          href="/cookies"
          className="inline-flex h-12 items-center justify-center rounded-[4px] border border-copper px-5 text-[14px] font-medium text-copper hover:bg-copper/10"
        >
          {t("toCookies")}
        </Link>
      }
    />
  );
}
