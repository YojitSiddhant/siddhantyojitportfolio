"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";
import { CloseIcon } from "@/components/ui/icons";

const orderedExperience = [...experience].sort((a, b) => a.order - b.order);
const gharpayyWorkstreams = [
  ["CRM & lead operations", "Built Facebook lead ingestion, CRM lead flows, attribution, coverage workflows, and Super Local Auto Sync with durable CRM history and analytics."],
  ["Bookings & property operations", "Connected owner bookings, visits, inventory, reservations, move-out history, notifications, property zones, and booking handoffs."],
  ["Finance & data accuracy", "Improved payment reconciliation, finance workflows, revenue KPIs, reservation finance, settlement batches, occupancy projections, and schema mappings."],
  ["Dashboards & performance", "Delivered Property Command Center, Owners Compare, Team Performance, Performance Dashboard, employee surveillance KPIs, leaderboard, and daily progress views."],
  ["Tours & internal tools", "Improved Tour Dash, My Tours, Arena, booking simulations, filters, loading states, chat timeline ordering, and live data bridges."],
  ["Exports, UI & quality", "Added Excel/PDF exports, responsive UI improvements, Google Maps integration, zone labels, regression tests, and production issue fixes."],
] as const;

const gharpayyCommitHighlights = [
  ["78a6ffa", "Nov 15, 2026", "Leaderboard employee-tour calculations, daily progress connected to MongoDB schemas, and quotation tracking corrected."],
  ["e79780f", "Nov 15, 2026", "Completed Team Performance dashboard with accurate KPIs, MongoDB integration, zone mapping, and drill-downs."],
  ["577b234", "Nov 15, 2026", "Improved employee booking surveillance KPIs, filters, attribution, and backend data accuracy."],
  ["6c945ac", "Nov 14, 2026", "Improved Owners Compare, property inventory, booking details, and KPI drill-downs."],
  ["5070c58", "Nov 14, 2026", "Fixed Property Command Center inventory, revenue KPIs, booking zones, and occupancy projection."],
  ["5e138c4", "Nov 13, 2026", "Improved Performance Dashboard accuracy, Master Owners, and Google Maps integration."],
  ["ab0b5bf", "Nov 13, 2026", "Fixed Performance Dashboard data accuracy and Arena V2 chat timeline ordering."],
  ["f60b0f9", "Nov 13, 2026", "Fixed owner booking detail crash when payment information was missing."],
  ["6714658", "Nov 12, 2026", "Fixed booking mappings, finance KPIs, revenue schema connections, and booking information."],
  ["a280dbd", "Nov 12, 2026", "Fixed owner booking and PG owner portal workflows using the current schema."],
  ["24b0e14", "Nov 12, 2026", "Fixed owner booking and PG owner portal workflows on the parallel feature branch."],
  ["cfc4e37", "Nov 12, 2026", "Fixed filters, history duplication, split-screen cropping, and responsive UI."],
  ["8da9ba4", "Nov 11, 2026", "Fixed analytics polling interval."],
  ["d8d0d6f", "Nov 11, 2026", "Optimized admin leads data loading and live data bridges."],
  ["503c61f", "Nov 11, 2026", "Fixed leads and revenue data flows, exports, and live UI updates."],
  ["14ab36b", "Nov 9, 2026", "Improved My Tours filters and tour layout."],
  ["3943d71", "Nov 9, 2026", "Fixed bookings pages, request loading, and live booking bridges."],
  ["47aff1e", "Nov 9, 2026", "Fixed Tour Dash and My Tours simulation issues."],
  ["e682e45", "Nov 7, 2026", "Finalized Tour Dash and My Tours updates across routes and services."],
  ["148bf3c", "Nov 7, 2026", "Improved Arena and My Tours actions."],
  ["c49a45c", "Nov 6, 2026", "Fixed My Tours and export data flows."],
  ["2441d09", "Nov 6, 2026", "Fixed Arena dashboard data and UI."],
  ["651aa5a", "Nov 5, 2026", "Fixed admin export data and formatting."],
  ["ace035b", "Nov 5, 2026", "Fixed booking flows, Coverage OS, and exports."],
  ["bc9d0e5", "Nov 5, 2026", "Added zone colours to Movement customer badges."],
  ["1e438ff", "Nov 4, 2026", "Fixed payment reconciliation and booking detail displays."],
  ["8b708b2", "Nov 4, 2026", "Linked owner properties to zones and updated property details."],
  ["b120e26", "Nov 4, 2026", "Added property owner analytics to booking information."],
  ["b27ba30", "Nov 2, 2026", "Improved move-out history, visit closure, notifications, and attribution labels."],
  ["10f9178", "Nov 2, 2026", "Improved property details and inventory visibility; added Operations finance tab."],
  ["7de5805", "Nov 2, 2026", "Improved booking handoff summaries, PDF downloads, and Excel exports."],
  ["114892a", "Nov 1, 2026", "Fixed inventory capacity, property cache sync, activity, and added finance backend."],
  ["45fa170", "Nov 1, 2026", "Connected owner property, visit, and booking workflows; fixed inventory tracking."],
  ["1995f30", "Nov 1, 2026", "Refined Movement customer attribution and timestamp layout."],
  ["a662937", "Oct 31, 2026", "Restored the Impact analytics helper and fixed missing imports."],
  ["573bdb6", "Oct 31, 2026", "Connected Super Local Analytics and fixed update counts, zones, and attribution."],
  ["75ba930", "Oct 31, 2026", "Improved Coverage attribution and Excel export; refined Auto Sync history."],
  ["72c1ed8", "Oct 31, 2026", "Connected Coverage OS reads, fixed zone labels and filters, and added regression tests."],
  ["43ecc97", "Oct 30, 2026", "Saved Super Local submissions directly to CRM with durable history."],
  ["3e6cf86", "Oct 30, 2026", "Integrated database zones into Super Local Auto Sync."],
  ["11fe507", "Oct 30, 2026", "Updated Super Local Auto Sync integration, batching, and navigation."],
] as const;

export function ExperienceTimeline() {
  const [isGharpayySummaryOpen, setIsGharpayySummaryOpen] = useState(false);

  useEffect(() => {
    if (!isGharpayySummaryOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setIsGharpayySummaryOpen(false); };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [isGharpayySummaryOpen]);

  return (
    <>
      <ol className="relative grid gap-0">
        <div aria-hidden="true" className="absolute left-5 top-2 bottom-2 w-px bg-border sm:left-6" />
        {orderedExperience.map((item, index) => {
          const highlights = item.description.split(/\r?\n/).map((highlight) => highlight.trim()).filter(Boolean);
          const technologies = "technologies" in item && Array.isArray(item.technologies) ? (item.technologies as string[]) : [];
          const isCurrent = /present/i.test(item.duration);
          return (
            <Reveal as="li" key={`${item.role}-${item.company}`} delay={index * 80} className="relative pb-10 pl-14 last:pb-0 sm:pl-16">
              <span className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background sm:h-12 sm:w-12 ${isCurrent ? "border-accent" : "border-border-strong"}`}>
                {item.logo ? <Image src={item.logo} alt={`${item.company} logo`} width={28} height={28} className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7" /> : <span className={`h-2.5 w-2.5 rounded-full ${isCurrent ? "bg-accent" : "bg-subtle"}`} />}
              </span>
              <article className={isCurrent ? "card p-6 sm:p-8" : "border-b border-border pb-10 last:border-b-0"}>
                <p className="flex items-center gap-2 font-mono text-xs text-subtle">{isCurrent ? <span className="status-dot" aria-hidden="true" /> : null}{item.duration}</p>
                <h3 className="mt-3 text-2xl tracking-tight text-foreground sm:text-[1.7rem]">
                  {item.role}<span className="text-muted"> · </span><span className="text-accent">{item.company}</span>
                  {item.company === "GHARPAYY" ? <button type="button" aria-label="Open GHARPAYY work summary" aria-haspopup="dialog" onClick={() => setIsGharpayySummaryOpen(true)} className="ml-3 inline-flex h-3 w-3 translate-y-[-0.12em] rounded-full bg-orange-500 align-middle shadow-[0_0_0_4px_rgba(249,115,22,0.12)] transition-transform hover:scale-125 focus-visible:outline-orange-500" /> : null}
                </h3>
                {"summary" in item && item.summary ? <p className="mt-4 text-[0.98rem] text-foreground/90">{item.summary}</p> : null}
                <ul className="mt-5 grid gap-3">{highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm text-muted sm:text-[0.95rem]"><span aria-hidden="true" className="mt-[0.65em] h-0.5 w-2.5 shrink-0 rounded-full bg-accent/80" /><span>{highlight}</span></li>)}</ul>
                {technologies.length > 0 ? <ul className="mt-5 flex flex-wrap gap-2">{technologies.map((technology) => <li key={`${item.company}-${technology}`} className="chip">{technology}</li>)}</ul> : null}
              </article>
            </Reveal>
          );
        })}
      </ol>

      {isGharpayySummaryOpen ? createPortal(<div className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-black/35 p-4 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsGharpayySummaryOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="gharpayy-summary-title" className="summary-scrollbar card max-h-[min(720px,calc(100dvh-2rem))] w-full max-w-4xl rounded-[2rem] overflow-y-auto p-6 shadow-2xl sm:p-8">
          <div className="flex items-start justify-between gap-6"><div><p className="eyebrow eyebrow-accent">Work summary</p><h2 id="gharpayy-summary-title" className="mt-3 text-3xl tracking-tight sm:text-4xl">GHARPAYY -OS</h2><p className="mt-2 font-mono text-xs text-subtle">Aug 2026 – Present · through the latest commit</p></div><div className="flex shrink-0 items-start gap-3"><div className="rounded-xl border border-accent/20 bg-accent-soft px-4 py-2 text-right"><p className="font-mono text-2xl leading-none text-accent">81</p><p className="mt-1 text-[0.68rem] uppercase tracking-wider text-muted">total commits</p></div><button type="button" aria-label="Close GHARPAYY work summary" onClick={() => setIsGharpayySummaryOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-hover hover:text-foreground"><CloseIcon className="h-5 w-5" /></button></div></div>
          <p className="mt-6 text-base leading-7 text-foreground/85">Full-stack work across GHARPAYY’s internal CRM and operations platform, connecting production workflows, data accuracy, analytics, and frontend experiences.</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">{gharpayyWorkstreams.map(([title, description]) => <article key={title} className="border-t border-border pt-4"><h3 className="text-lg text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}</div>
          <div className="mt-10 border-t border-border pt-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow eyebrow-accent">Detailed delivery history</p><h3 className="mt-2 text-2xl tracking-tight text-foreground">Your GHARPAYY commit record</h3></div>
              <p className="font-mono text-xs text-subtle">41 feature/fix commits · Oct 30 – Nov 15, 2026</p>
            </div>
            <ol className="mt-5 divide-y divide-border rounded-2xl border border-border">
              {gharpayyCommitHighlights.map(([hash, date, description]) => <li key={hash} className="grid gap-2 p-4 sm:grid-cols-[7rem_1fr] sm:gap-5"><div className="font-mono text-xs text-subtle"><span className="text-accent">{hash}</span><br />{date}</div><p className="text-sm leading-6 text-foreground/85">{description}</p></li>)}
            </ol>
          </div>
          <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm text-foreground/85"><span className="font-medium text-accent">Scope:</span> 41 authored feature/fix commits across frontend, backend, MongoDB schemas, APIs, analytics, exports, and automated regression tests.</div>
        </section>
      </div>, document.body) : null}
    </>
  );
}
