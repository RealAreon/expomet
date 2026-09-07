import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { HeroScreen } from "@/components/hero-screen";
import { AboutCompany } from "@/components/about-company";
import { WhyChooseUs } from "@/components/why-choose-us";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <HeroScreen />
      <AboutCompany />
      <WhyChooseUs />
    </>
  );
}
