import type { GitHubContributionWeek } from "@/lib/github";

export function GitHubContributionCard({ weeks, year, total }: { weeks: GitHubContributionWeek[]; year: number; total: number }) {
  const labels = weeks.map((week) => {
    const first = week.contributionDays.find((day) => day.date.slice(8) === "01");
    return first ? new Date(`${first.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short" }) : "";
  });
  return (
    <section className="mt-5 rounded-[1.25rem] border border-border bg-[#0d1117] p-5 text-[#e6edf3] shadow-card sm:p-6" aria-labelledby="github-contribution-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="font-mono text-[10px] uppercase tracking-widest text-[#8b949e]">GitHub activity</p><h2 id="github-contribution-title" className="mt-2 text-xl font-medium tracking-tight">{total} contributions in {year}</h2></div>
        <a href="https://github.com/YojitSiddhant" target="_blank" rel="noreferrer" className="text-xs font-medium text-[#58a6ff] hover:text-white">View profile ↗</a>
      </div>
      <div className="mt-5 overflow-x-auto pb-1"><div className="min-w-[720px]"><div className="mb-2 ml-7 grid grid-cols-[repeat(53,minmax(0,1fr))] gap-1 text-[10px] text-[#8b949e]">{labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}</div><div className="flex gap-1"><div className="grid w-6 grid-rows-7 gap-1 text-[9px] leading-3 text-[#8b949e]"><span /><span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span /></div><div className="flex gap-1">{weeks.map((week, weekIndex) => <div key={weekIndex} className="grid grid-rows-7 gap-1">{week.contributionDays.map((day) => { const level = day.contributionLevel === "NONE" ? "bg-[#161b22]" : day.contributionLevel === "FIRST_QUARTILE" ? "bg-[#0e4429]" : day.contributionLevel === "SECOND_QUARTILE" ? "bg-[#006d32]" : day.contributionLevel === "THIRD_QUARTILE" ? "bg-[#26a641]" : "bg-[#39d353]"; return <div key={day.date} title={`${day.contributionCount} contributions on ${day.date}`} className={`h-3 w-3 rounded-[3px] ${level}`} />; })}</div>)}</div></div></div></div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-[#8b949e]"><span>Learn how GitHub counts contributions</span><span className="flex items-center gap-1.5">Less <i className="h-3 w-3 rounded-[3px] bg-[#161b22]" /><i className="h-3 w-3 rounded-[3px] bg-[#0e4429]" /><i className="h-3 w-3 rounded-[3px] bg-[#006d32]" /><i className="h-3 w-3 rounded-[3px] bg-[#26a641]" /><i className="h-3 w-3 rounded-[3px] bg-[#39d353]" /> More</span></div>
    </section>
  );
}
