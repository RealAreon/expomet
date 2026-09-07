import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { LegalDoc } from "@/content/legal";

export function LegalArticle({
  homeLabel,
  doc,
  actions,
}: {
  homeLabel: string;
  doc: LegalDoc;
  actions?: ReactNode;
}) {
  return (
    <section className="surface-mottled-soft relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[920px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <p className="text-[12px] text-[#8f99a3]">
          <Link href="/" className="transition-colors hover:text-copper">
            {homeLabel}
          </Link>
          {" > "}
          {doc.crumb}
        </p>
        <p className="mt-6 text-[11px] font-semibold tracking-[0.28em] text-copper uppercase">
          {doc.eyebrow}
        </p>
        <h1 className="mt-3 text-[1.85rem] font-bold tracking-[-0.03em] text-white sm:text-[2.4rem]">
          {doc.title}
        </h1>
        <p className="mt-5 text-[15px] leading-8 text-[#c5cdd4]">{doc.intro}</p>
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}

        <div className="mt-10 space-y-10">
          {doc.sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-[18px] font-semibold text-copper sm:text-[20px]">
                {section.title}
              </h2>
              <div className="mt-2 h-px w-12 bg-copper/70" />
              <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#c5cdd4]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 border-t border-white/[0.08] pt-6 text-[13px] leading-7 text-[#8f99a3]">
          {doc.sourceNote}
        </p>
      </div>
    </section>
  );
}
