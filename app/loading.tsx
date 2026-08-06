import { PageShell } from "@/components/page-shell";
import { SectionSkeletons } from "@/components/loading/section-skeletons";

export default function Loading() {
  return (
    <PageShell animated={false}>
      <SectionSkeletons
        headerLeftWidth="w-28 h-4"
        headerRightWidth="w-40 h-4"
        columnsClassName="grid gap-5 lg:grid-cols-2"
        cards={[
          {
            titleWidth: "w-full max-w-4xl h-24 sm:h-32",
            lineWidths: ["w-full max-w-3xl h-6", "w-5/6 h-4", "w-4/5 h-4"],
            chipCount: 2,
          },
          {
            titleWidth: "w-full max-w-2xl h-10",
            lineWidths: ["w-full h-4", "w-11/12 h-4", "w-9/12 h-4"],
            chipCount: 3,
          },
          {
            titleWidth: "w-40 h-4",
            lineWidths: ["w-full h-16", "w-full h-16", "w-full h-16"],
          },
          {
            titleWidth: "w-44 h-4",
            lineWidths: ["w-full h-8", "w-full h-8", "w-5/6 h-8"],
            bodyHeightClassName: "h-48",
          },
        ]}
      />
    </PageShell>
  );
}
