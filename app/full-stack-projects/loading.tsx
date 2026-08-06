import { PageShell } from "@/components/page-shell";
import { SectionSkeletons } from "@/components/loading/section-skeletons";

export default function Loading() {
  return (
    <PageShell animated={false}>
      <SectionSkeletons
        headerLeftWidth="w-44 h-4"
        headerRightWidth="w-28 h-4"
        columnsClassName="grid gap-5"
        cards={[
          {
            titleWidth: "w-44 h-4",
            lineWidths: ["w-full h-4", "w-11/12 h-4", "w-10/12 h-4"],
            chipCount: 3,
            bodyHeightClassName: "h-44",
          },
          {
            titleWidth: "w-40 h-4",
            lineWidths: ["w-full h-4", "w-11/12 h-4", "w-10/12 h-4"],
            chipCount: 4,
            bodyHeightClassName: "h-44",
          },
        ]}
      />
    </PageShell>
  );
}
