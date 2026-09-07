import { Calculator } from "@/components/calculator";

type PageProps = {
  searchParams: Promise<{ m?: string; s?: string; p?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const metalId = Number(params.m) || 3;
  const sortId = Number(params.s) || 6;
  const grade = params.p || "АМг";

  return (
    <main className="min-h-screen px-4 py-10 md:px-8 md:py-14">
      <Calculator
        initialMetalId={metalId}
        initialSortId={sortId}
        initialGrade={grade}
      />
    </main>
  );
}
