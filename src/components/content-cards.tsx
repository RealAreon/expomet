import { Link } from "@/i18n/navigation";

export function ContentCards({
  crumbHome,
  crumb,
  eyebrow,
  title,
  intro,
  items,
}: {
  crumbHome: string;
  crumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: { title: string; text: string }[];
}) {
  return (
    <section className="mx-auto max-w-[1520px] px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
      <p className="text-[12px] text-[#8f99a3]">
        <Link href="/" className="hover:text-copper">
          {crumbHome}
        </Link>
        {" > "}
        {crumb}
      </p>
      <p className="mt-5 text-[11px] font-semibold tracking-[0.28em] text-copper uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-[1.85rem] font-bold text-white sm:text-[2.4rem]">{title}</h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-8 text-[#8f99a3]">{intro}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[8px] border border-copper/25 bg-[#0d141c] p-6"
          >
            <h2 className="text-[16px] font-semibold text-copper">{item.title}</h2>
            <div className="mt-2 h-px w-10 bg-copper/80" />
            <p className="mt-4 text-[14px] leading-7 text-[#c5cdd4]">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
