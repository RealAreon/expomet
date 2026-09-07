import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { hasLocale, NextIntlClientProvider, type Locale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteShell } from "@/components/site-shell";
import { Toaster } from "sonner";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${montserrat.variable} dark antialiased`}
    >
      <body className="bg-background font-sans text-foreground">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <SiteShell>{children}</SiteShell>
          </SmoothScroll>
          <Toaster theme="dark" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
