import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { LegalArticle } from "@/components/legal-article";
import { cookiesContent } from "@/content/legal";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "uk" ? "uk" : "en";
  return { title: cookiesContent[lang].title };
}

export default async function CookiesPage({
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
      doc={cookiesContent[lang]}
      actions={
        <>
          <CookieSettingsButton />
          <Link
            href="/privacy"
            className="inline-flex h-12 items-center justify-center rounded-[4px] border border-white/20 px-5 text-[14px] font-medium text-white hover:border-copper hover:text-copper"
          >
            {t("toPrivacy")}
          </Link>
        </>
      }
    />
  );
}
