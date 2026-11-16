import type { GitHubContributionCalendar, GitHubContributionDay } from "@/lib/github";

const levelClasses: Record<GitHubContributionDay["contributionLevel"], string> = {
  NONE: "bg-[#ebedf0]",
  FIRST_QUARTILE: "bg-[#9be9a8]",
  SECOND_QUARTILE: "bg-[#40c463]",
  THIRD_QUARTILE: "bg-[#30a14e]",
  FOURTH_QUARTILE: "bg-[#216e39]",
};

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

function monthLabel(date: string, previousMonth: number | null) {
  const currentMonth = new Date(`${date}T00:00:00Z`).getUTCMonth();
  return currentMonth !== previousMonth
    ? new Intl.DateTimeFormat("en-IN", { month: "short" }).format(new Date(`${date}T00:00:00Z`))
    : "";
}

export function GitHubHeatmap({ calendar }: { calendar: GitHubContributionCalendar }) {
  return (
    <section aria-labelledby="github-activity-title" className="border-t border-border py-8">
      <div className="rounded-xl border border-[#d0d7de] bg-white p-5 text-[#24292f] shadow-sm sm:p-7">
        <div className="overflow-x-auto rounded-lg border border-[#d0d7de] p-4 sm:p-5" tabIndex={0} aria-label="Scrollable GitHub contribution heat map">
          <div className="flex min-w-[58rem] gap-3">
            <div className="grid w-10 shrink-0 grid-rows-[1.25rem_repeat(7,0.8rem)] gap-1.5 text-xs font-medium text-[#1d1d1f]">
              <span />
              {weekdayLabels.map((label, index) => <span key={`${label}-${index}`} className="flex items-center">{label}</span>)}
            </div>

            <div className="grid min-w-0 flex-1 grid-flow-col auto-cols-fr gap-1.5">
              {calendar.weeks.map((week, weekIndex) => {
                const firstDay = week.contributionDays[0];
                const previousDay = calendar.weeks[weekIndex - 1]?.contributionDays[0];
                const previousMonth = previousDay ? new Date(`${previousDay.date}T00:00:00Z`).getUTCMonth() : null;
                const label = firstDay ? monthLabel(firstDay.date, previousMonth) : "";

                return (
                  <div key={weekIndex} className="grid grid-rows-[1.25rem_repeat(7,0.8rem)] gap-1.5">
                    <span className="text-xs font-medium text-[#1d1d1f]">{label}</span>
                    {week.contributionDays.map((day) => (
                      <span key={day.date} title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatDate(day.date)}`} aria-label={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatDate(day.date)}`} className={`h-3.5 w-3.5 rounded-[3px] ${levelClasses[day.contributionLevel]}`} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 text-sm text-[#1d1d1f]">
            <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-your-profile/adding-an-achievements-section-to-your-profile" target="_blank" rel="noreferrer" className="hover:text-[#24292f]">
              Learn how we count contributions
            </a>
            <div className="flex shrink-0 items-center gap-1.5">
              <span>Less</span>
              {(["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"] as const).map((level) => <span key={level} className={`h-3.5 w-3.5 rounded-[3px] ${levelClasses[level]}`} aria-hidden="true" />)}
              <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
