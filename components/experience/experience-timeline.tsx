"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon, BriefcaseIcon, CodeIcon, CloseIcon } from "@/components/ui/icons";

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

const autoSyncCommitHighlights = [
  ["24c2216", "Oct 22, 2026", "Added the clear capture button."],
  ["4d2a205", "Oct 21, 2026", "Prepared FastAPI Docker deployment for Render."],
  ["6c76c5b", "Oct 21, 2026", "Prepared production deployment configuration."],
  ["972c2e4", "Oct 21, 2026", "Updated UI changes and typography."],
  ["7a50548", "Oct 21, 2026", "Fixed label issues and duplicate messages."],
  ["4dd2d52", "Oct 21, 2026", "Added correct business-label message capture with badges."],
  ["4f28ada", "Oct 21, 2026", "Fixed message capture issues with labels."],
  ["3f7e1cb", "Oct 21, 2026", "Improved message extraction."],
  ["cfd4849", "Oct 21, 2026", "Improved the working capture flow."],
  ["bcdb793", "Oct 21, 2026", "Fixed issues and removed old files."],
  ["1c80fa1", "Oct 20, 2026", "Improved OCR processing."],
  ["2090cf4", "Oct 20, 2026", "Fixed the missing Analytics page button."],
  ["7c1afbc", "Oct 20, 2026", "Added the Analytics page."],
  ["0e8ce21", "Oct 20, 2026", "Removed the login page from the workflow."],
  ["d037b38", "Oct 20, 2026", "Fixed login page UI."],
  ["58581db", "Oct 20, 2026", "Completed final security and end-to-end verification."],
  ["4394bf2", "Oct 20, 2026", "Added Super Admin OCR review and ML analytics."],
  ["ca258cd", "Oct 20, 2026", "Added cross-zone duplicate phone-number detection."],
  ["18c87da", "Oct 20, 2026", "Secured Auto Sync capture sessions and zone selection."],
  ["d6a44bc", "Oct 20, 2026", "Added Super Admin zone and user management."],
  ["7e57e72", "Oct 20, 2026", "Added backend RBAC and screenshot isolation."],
  ["a3dcadd", "Oct 20, 2026", "Added authentication, users, zones, and sessions."],
  ["b02b8d5", "Oct 20, 2026", "Fixed the final frontend lifecycle and verification flow."],
  ["55772af", "Oct 20, 2026", "Completed remaining Phase 9E work."],
  ["8c93081", "Oct 20, 2026", "Investigated real screenshot OCR and targeted accuracy fixes."],
  ["db35554", "Oct 20, 2026", "Added real-world ML evaluation."],
  ["62eecbf", "Oct 20, 2026", "Added model registry and controlled promotion."],
  ["1beda10", "Oct 20, 2026", "Added a human-verified learning dataset."],
  ["4b8f7ea", "Oct 20, 2026", "Integrated FastAPI in shadow mode."],
  ["f7abd7a", "Oct 20, 2026", "Trained the first ML model."],
  ["9e4ee52", "Oct 20, 2026", "Added the OCR baseline."],
  ["4e2fb35", "Oct 20, 2026", "Measured existing OCR accuracy."],
  ["8eecdc4", "Oct 20, 2026", "Added the ML foundation."],
  ["d0f82a6", "Oct 20, 2026", "Improved capture and UI changes."],
  ["5d4d680", "Oct 20, 2026", "Implemented Tower Auto Sync and PR-based CI."],
  ["a6302e7", "Oct 20, 2026", "Hardened Auto Sync security, storage, concurrency, and performance."],
  ["fc659f1", "Oct 20, 2026", "Improved Auto Sync reliability and stabilized CI tests."],
  ["060049e", "Oct 20, 2026", "Connected the UI to the source."],
  ["23f134e", "Oct 20, 2026", "Finalized local MySQL development setup."],
  ["0ad81da", "Oct 20, 2026", "Completed local development environment setup."],
  ["b8b3ffe", "Oct 20, 2026", "Set up the Next.js, FastAPI, and MySQL project foundation."],
  ["e9e7cc8", "Oct 20, 2026", "Created the initial Next.js project."],
] as const;

const autoSyncWorkstreams = [
  ["Screenshot capture & OCR", "Implemented WhatsApp screenshot capture, English OCR extraction, message parsing, and improved OCR accuracy through baseline measurement and targeted fixes."],
  ["Message intelligence", "Added business labels, badges, duplicate-message handling, clear-capture controls, and more reliable message extraction workflows."],
  ["Security & administration", "Built authentication, sessions, RBAC, zone selection, Super Admin user and zone management, and screenshot isolation."],
  ["ML & analytics", "Added OCR review tooling, ML foundations, human-verified learning data, model evaluation, model registry, controlled promotion, and analytics."],
  ["Duplicate detection", "Implemented cross-zone duplicate phone-number detection to improve lead quality and reduce repeated records."],
  ["Deployment & reliability", "Prepared FastAPI Docker and Render deployment, hardened storage and concurrency, stabilized CI tests, and completed end-to-end verification."],
] as const;

const opsWorkstreams = [
  ["Auto Sync & OCR", "Built continuous screenshot capture, OCR extraction, WhatsApp coverage, recovery flows, OCR diagnostics, and Super Local Auto Sync controls."],
  ["Owner portals & bookings", "Delivered PG owner booking, property inventory, visit requests, finance, move-in approvals, settlements, payment flows, and mobile workflows."],
  ["Operations dashboards", "Improved Founder Admin, Supply Hub, Watchtower, Command Center, Movement OS, Total Vision, and operational reporting dashboards."],
  ["Analytics & exports", "Added zone summaries, lead drill-downs, KPI reporting, Excel exports, call-connected reporting, activity timelines, and analytics accuracy improvements."],
  ["Security & reliability", "Fixed authentication refresh, rate limiting, RBAC, role-based visibility, data consistency, loading performance, and production workflow reliability."],
  ["Search & workflow quality", "Improved global phone search, owner attribution, lead deduplication, filters, responsive UI, navigation, copy controls, and booking lifecycle states."],
] as const;

const aiListingWorkstreams = [
  ["Multi-source ingestion", "Integrated Facebook and social listing ingestion through Apify, SocialCrawl, and ScrapeCreators provider workflows."],
  ["Listing cleaning & fallback", "Added listing cleaning, fallback handling, provider selection, transient retry behavior, and safer ingestion recovery."],
  ["Persistence & controls", "Implemented ingestion persistence, bulk listing selection, delete workflows, settings management, and stable database-backed operations."],
  ["Dashboard & analytics", "Added post-fetch statistics, production dashboard routing, static frontend serving, and clearer listing source visualizations."],
  ["Authentication & testing", "Built authentication and added regression coverage for providers, auth, persistence, cleaning, static serving, and retry behavior."],
  ["Deployment preparation", "Prepared Kubernetes deployment configuration and production-oriented backend/frontend structure for the ingestion platform."],
] as const;

const aiListingCommitHighlights = [
  ["4224be0", "Sep 12, 2026", "Added colors to represent different listing sources."],
  ["2df9a81", "Sep 12, 2026", "Added transient provider request retry handling."],
  ["6812fed", "Sep 12, 2026", "Fixed auto-fetch timing."],
  ["6413324", "Sep 12, 2026", "Improved auto-fetch timing."],
  ["d5b1286", "Sep 12, 2026", "Added bulk listing selection and delete workflows."],
  ["bca7824", "Sep 12, 2026", "Fixed production dashboard routing."],
  ["48c6a61", "Sep 12, 2026", "Prepared the application for Kubernetes deployment."],
  ["00084af", "Sep 12, 2026", "Added authentication."],
  ["3b8a8fd", "Sep 12, 2026", "Added post-fetch statistics card."],
  ["59ffdda", "Sep 12, 2026", "Removed the settings button from the main flow."],
  ["5b4c9f5", "Sep 12, 2026", "Added a third-party social crawl service."],
  ["23f71e3", "Sep 12, 2026", "Removed an unused resource."],
  ["a77f35f", "Sep 12, 2026", "Added data-fetching sources."],
  ["7540eee", "Sep 12, 2026", "Added multiple data-fetching resources."],
  ["9ca4908", "Sep 12, 2026", "Improved settings page and fixed bugs."],
  ["6d75b16", "Sep 11, 2026", "Improved application speed."],
  ["948d0cb", "Sep 11, 2026", "Added multiple data sources."],
  ["14d216b", "Sep 11, 2026", "Improved ingestion persistence speed."],
  ["e0e2e2e", "Sep 11, 2026", "Fixed bugs and added new features."],
  ["aebf73d", "Sep 11, 2026", "Added settings page."],
  ["d4a0535", "Sep 11, 2026", "Added listing detail popup feature."],
  ["0b48f5c", "Sep 11, 2026", "Saved cleaned Needs Review listings during ingestion."],
  ["1ef4c39", "Sep 11, 2026", "Applied UI changes."],
  ["bbb3028", "Sep 11, 2026", "Built the Gharpayy AI Listing Ingestion prototype."],
] as const;
const opsCommitHighlights = [
  ["8b584776", "2026-08-23", "sync main with user stats"],
  ["08c570d1", "2026-08-23", "restore feat/siddhant feature pages"],
  ["33020818", "2026-08-23", "add tour dash and user stat into the sidebar"],
  ["be401818", "2026-08-23", "pages issue fixed"],
  ["09a3dc10", "2026-08-24", "Add live Founder Admin with zone-based desk"],
  ["ed57afe6", "2026-08-24", "Make Arena dashboard date-aware"],
  ["b9b89e9e", "2026-08-25", "Polish founder admin and sheet flows"],
  ["e09f2135", "2026-08-25", "Keep live leads bridge fast and complete"],
  ["dbf5be9b", "2026-08-25", "Keep founder admin live and add Watchtower"],
  ["9984f53c", "2026-08-25", "Fix founder admin live metrics and joins"],
  ["8f6d9267", "2026-08-25", "Refine founder admin people desk"],
  ["81c92b9d", "2026-08-25", "Add founder admin shell entry"],
  ["fd236239", "2026-08-25", "Polish Watchtower live zone league"],
  ["ebfd8ddd", "2026-08-26", "Polish founder admin copy summaries"],
  ["354c60f9", "2026-08-26", "Fix pace copy text"],
  ["1c1ea5b8", "2026-08-26", "Fix people desk row copy text"],
  ["427d0fc8", "2026-08-26", "Polish app shell layout"],
  ["bc6ac16f", "2026-08-26", "Scope Watchtower pace copy to filters"],
  ["70349301", "2026-08-26", "Tidy Watchtower CSV lead export"],
  ["98aa4c3e", "2026-08-26", "Humanize Watchtower zone league copy"],
  ["d841281c", "2026-08-26", "Humanize Sheet PDF currency export"],
  ["1e649a7f", "2026-08-26", "Humanize founder admin lead labels"],
  ["7f9cb8e3", "2026-08-26", "Make founder admin drill popups feel solid"],
  ["9d23da1f", "2026-08-26", "Fix admin supreme merge and payload shape"],
  ["399482f2", "2026-08-27", "Humanize command center live data"],
  ["d73ab9ed", "2026-08-27", "Humanize remaining app changes"],
  ["0b8b4d13", "2026-08-27", "command center"],
  ["00b1987a", "2026-08-27", "supply-hub new features"],
  ["83e81850", "2026-08-27", "conflict fixed"],
  ["175ecfa4", "2026-08-27", "conflict resolved"],
  ["707dc285", "2026-08-27", "conflict resolved"],
  ["bdfb12c9", "2026-08-27", "resolved"],
  ["23e80bea", "2026-08-27", "resolved"],
  ["564701cf", "2026-08-27", "resolved"],
  ["dc47e2fe", "2026-08-29", "restore supply hub detail and origin handling changes"],
  ["d239f49b", "2026-08-29", "update supply hub changes"],
  ["a757109f", "2026-08-30", "founder desk watchtower sheet"],
  ["6b9adf6c", "2026-08-30", "ops page live timeline insights"],
  ["6c15ec4e", "2026-08-31", "ops-console page foun der's admin"],
  ["c89c538a", "2026-08-31", "fix supply hub conversion data sync and reload"],
  ["f24e5ccc", "2026-08-31", "fixed the mismatch data"],
  ["7440b10f", "2026-09-01", "fix global lead phone search"],
  ["985c7aa4", "2026-09-02", "add accurate enabled KPI to supply hub"],
  ["8bffd191", "2026-09-02", "fix control tower close drop lead persistence"],
  ["15aca99a", "2026-09-02", "name not comming in the dispatch lead search"],
  ["600a2365", "2026-09-02", "fix dispatch lead owner dedupe by member id"],
  ["e444d8d9", "2026-09-03", "make founder ops stack and queue live"],
  ["e78c9bd3", "2026-09-03", "nav-bar added percentage add property issue fixed"],
  ["4aa61c42", "2026-09-05", "fix property creation permission for visit scheduling"],
  ["06ed201a", "2026-09-05", "add user stats funnel view and export improvements"],
  ["4545ddd1", "2026-09-06", "fix global exact phone lead search"],
  ["3963cebd", "2026-09-06", "fix duplicate lead current owner display"],
  ["a597ec2c", "2026-09-06", "some ui changes in the supply hub"],
  ["8402d380", "2026-09-06", "impact queue founder-admin"],
  ["78d4b950", "2026-09-07", "add Top 10 property copy controls"],
  ["6c65f82a", "2026-09-07", "seach bar for the burger menu and copy control option's removed for some user"],
  ["2251c250", "2026-09-07", " copy button issue for the super-admin"],
  ["3632b527", "2026-09-07", "improve call script completion and activity save reliability"],
  ["691080cd", "2026-09-07", "fix flow ops settings access"],
  ["33cca353", "2026-09-08", "fix impact queue date filters"],
  ["cc05576b", "2026-09-08", "add calls connected admin reporting"],
  ["4bc7d375", "2026-09-08", "improve calls connected reporting accuracy"],
  ["20e7fd02", "2026-09-10", "impact queue property info"],
  ["75f97178", "2026-09-10", "improve impact property list controls and copy format"],
  ["789b2933", "2026-09-12", "complete property owner CRM integration and reliability fixes"],
  ["7a6ff2e2", "2026-09-13", "stabilize property owner booking workflow and portal"],
  ["f3323c29", "2026-09-13", "polish property owner portal responsive UI"],
  ["7442f2e3", "2026-09-15", "implement reservation control tower and booking lifecycle"],
  ["02d80e49", "2026-09-16", "finalize reservation tower fixes and finance reliability"],
  ["e42a03d1", "2026-09-16", "improve reservation tower loading performance"],
  ["b9c733ca", "2026-09-17", "fix user password reset"],
  ["0b0f6f0e", "2026-09-17", "reservation tower issues"],
  ["b76f068a", "2026-09-17", "fix reservation cross-portal consistency and access issues"],
  ["48cda7d6", "2026-09-19", "fix intelligence page crash"],
  ["1ef65131", "2026-09-19", "remaining bug's of reservation tower"],
  ["4c69f7d6", "2026-09-19", "untracked files on feat/yojitsid: 1ef65131 remaining bug's of reservation tower"],
  ["6fe4c6c2", "2026-09-19", "index on feat/yojitsid: 1ef65131 remaining bug's of reservation tower"],
  ["ab3b19b4", "2026-09-19", "add vision analytics and admin control"],
  ["e3f329ea", "2026-09-20", "add M-Power Call to booking flow"],
  ["228a4059", "2026-09-20", "add M-Power Call tools and update button label"],
  ["0504e79a", "2026-09-20", "fix final moment pool fill and lock confirmation"],
  ["5708c79a", "2026-09-20", "fix pool claim MongoDB update conflict"],
  ["0c17289c", "2026-09-21", "add WhatsApp Coverage OS"],
  ["bcd89c45", "2026-09-21", "improve WhatsApp Coverage OS filters and observed metrics"],
  ["eddbaf76", "2026-09-22", "add super admin movement analytics dashboard"],
  ["bc363605", "2026-09-23", "Update Movement OS header layout"],
  ["72d83a9f", "2026-09-23", "feat: add Movement OS lead removal and closed leads history"],
  ["7591fa53", "2026-09-23", "feat: add Total Vision zone breakdown and lead drill-down"],
  ["9f6b2468", "2026-09-23", "fix: restrict Total Vision zone breakdown by user role"],
  ["0375ab71", "2026-09-24", "fix: enable role-based zone lead drilldown and counts"],
  ["6ef8ccfb", "2026-09-24", "Add Movement OS dashboard reporting and UI improvements"],
  ["d89b6255", "2026-09-24", "login issue"],
  ["bffecc04", "2026-09-26", "add Excel export functionality"],
  ["b1b66279", "2026-09-27", "fix owner bookings and improve owner portal responsiveness"],
  ["b4c610f1", "2026-09-30", "feat: improve owner booking inventory and room management"],
  ["bedae27a", "2026-10-02", "feat: complete property owner portal workflows"],
  ["6a55b594", "2026-10-02", "fix owner visit history and property hydration"],
  ["803e0450", "2026-10-03", "fix owner booking reliability and payment flows"],
  ["152fc090", "2026-10-03", "Add Founder Admin bookings info page"],
  ["ef8982a4", "2026-10-04", "Add manual room booking and owner unallocated room flow"],
  ["28e50d95", "2026-10-04", "Add Tour Slot Locked WhatsApp copy and improve owner sidebar icons"],
  ["313ce699", "2026-10-04", "Fix owner booking property visibility and loading performance"],
  ["c7990c50", "2026-10-04", "Polish PG owner portal mobile UI and booking error states"],
  ["b51cf377", "2026-10-07", "Implement PG Owner Portal reference features and settlement workflows"],
  ["1da2800f", "2026-10-07", "Improve PG owner portal booking and finance workflows"],
  ["be2968b8", "2026-10-07", "Improve PG owner portal mobile responsiveness"],
  ["e9ab8b8f", "2026-10-08", "feat: enhance PG owner visit requests and booking workflows"],
  ["719a8c9a", "2026-10-08", "feat: refine PG owner portal UI and move-in approval workflow"],
  ["43d1a4aa", "2026-10-10", "feat: add booking inventory holds and owner approval capacity protection"],
  ["79c7e3e0", "2026-10-10", "fix: resolve auth refresh, rate limiting and owner bookings loading issues"],
  ["3919b813", "2026-10-12", "Improve WhatsApp Coverage OS"],
  ["578f2d63", "2026-10-13", "Polish WhatsApp Coverage OS UI"],
  ["9b0cc2d5", "2026-10-13", "Implement feature X to enhance user experience and fix bug Y in module Z"],
  ["40dbf4b3", "2026-10-14", "Improve Movement OS stage row scroll visibility"],
  ["d94d6519", "2026-10-14", "Improve workspace activity timeline and visit workflows"],
  ["83b465f2", "2026-10-15", "Improve Coverage OS export lead history and stage counts"],
  ["4dabe662", "2026-10-15", "Improve Coverage OS filter clarity and sidebar icon"],
  ["ee7009d0", "2026-10-17", "Add Auto Sync capture and floating timer"],
  ["6ad512e4", "2026-10-18", "Improve Movement OS Auto Sync continuous capture and screenshot processing"],
  ["ce8ee34e", "2026-10-18", "feat: improve Workspace V1 UI and workflows"],
  ["da28b3b2", "2026-10-22", "improve Auto Sync capture, automatic OCR and settings persistence"],
  ["5eac244d", "2026-10-23", "feat: implement Super Local Auto Sync with OCR and secure pool integration"],
  ["16a3c6d4", "2026-10-23", "fix: improve Super Local WhatsApp OCR extraction accuracy"],
  ["a07d99df", "2026-10-24", "feat: improve Super Local Auto Sync capture and OCR accuracy"],
  ["5edfb4ab", "2026-10-24", "feat: enhance Super Local UI, bulk trash and OCR diagnostics"],
  ["6e513336", "2026-10-24", "improve super local OCR accuracy and WhatsApp confirmation UI"],
  ["9d2e5357", "2026-10-25", "improve super local auto sync ingestion and submission history"],
  ["06a732b2", "2026-10-25", "remove super local submission feature flags"],
  ["5fe5d0a9", "2026-10-25", "add super local analytics dashboard and fix sidebar navigation"],
  ["c98efdc8", "2026-10-26", "feat: enhance super local auto sync and founder admin analytics"],
  ["85230de1", "2026-10-26", "feat: improve super local continuous capture and issue monitoring"],
  ["bb3c73ec", "2026-10-26", "fix: resolve super local auto sync capture recovery error"],
  ["45f1b66f", "2026-10-26", "feat: improve super local analytics accuracy and drilldowns"],
  ["827b2436", "2026-10-28", "Improve Super Local Analytics UI, Excel exports, sorting and zone summaries"],
  ["b6af9d31", "2026-10-29", "Fix Super Local Auto Sync pause/resume and simplify save controls"],
  ["36f04dcd", "2026-10-29", "Improve Super Local Auto Sync controls and add crop suggestions with auto-start"],
  ["16fec8cb", "2026-10-29", "Improve Auto Sync layout and add five-screenshot batches with two-minute cooldown"],
  ["243e37e1", "2026-10-30", "feat: show OCR WhatsApp message previews in analytics lead cards"],
] as const;

export function ExperienceTimeline() {
  const [isGharpayySummaryOpen, setIsGharpayySummaryOpen] = useState(false);
  const [activeSummaryIndex, setActiveSummaryIndex] = useState(0);

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
                  {item.company === "GHARPAYY" || item.company === "GHARPAYY Local Auto Sync 100X" || item.company === "Gharpayy-Ops" || item.company === "Gharpayy AI Listing Ingestion" ? <button type="button" aria-label={`Open ${item.company} work summary`} aria-haspopup="dialog" onClick={() => { setActiveSummaryIndex(item.company === "GHARPAYY" ? 0 : item.company === "GHARPAYY Local Auto Sync 100X" ? 1 : item.company === "Gharpayy-Ops" ? 2 : 3); setIsGharpayySummaryOpen(true); }} className="ml-3 inline-flex h-3 w-3 translate-y-[-0.12em] rounded-full bg-orange-500 align-middle shadow-[0_0_0_4px_rgba(249,115,22,0.12)] transition-transform hover:scale-125 focus-visible:outline-orange-500" /> : null}
                </h3>
                {"summary" in item && item.summary ? <p className="mt-4 text-[0.98rem] text-foreground">{item.summary}</p> : null}
                <ul className="mt-5 grid gap-3">{highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm text-muted sm:text-[0.95rem]"><span aria-hidden="true" className="mt-[0.65em] h-0.5 w-2.5 shrink-0 rounded-full bg-accent/80" /><span>{highlight}</span></li>)}</ul>
                {technologies.length > 0 ? <ul className="mt-5 flex flex-wrap gap-2">{technologies.map((technology) => <li key={`${item.company}-${technology}`} className="chip">{technology}</li>)}</ul> : null}
              </article>
            </Reveal>
          );
        })}
      </ol>

      {isGharpayySummaryOpen ? createPortal(<div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsGharpayySummaryOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="gharpayy-summary-title" className="summary-scrollbar card max-h-[min(720px,100%)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl p-5 shadow-2xl sm:rounded-[2rem] sm:p-8 short:rounded-2xl short:p-5">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"><div className="min-w-0"><p className="eyebrow eyebrow-accent">Work summary</p><h2 id="gharpayy-summary-title" className="mt-3 text-2xl tracking-tight sm:text-4xl short:text-2xl">{activeSummaryIndex === 0 ? "GHARPAYY -OS" : activeSummaryIndex === 1 ? "GHARPAYY Local Auto Sync 100X" : activeSummaryIndex === 2 ? "Gharpayy-Ops" : "Gharpayy AI Listing Ingestion"}</h2><p className="mt-2 font-mono text-xs text-subtle">{activeSummaryIndex === 0 ? "Aug 2026 – Present · through the latest commit" : activeSummaryIndex === 1 ? "Oct 2026 · through the latest commit" : activeSummaryIndex === 2 ? "Aug 2026 – Oct 2026 · through the latest commit" : "Sep 2026 · through the latest commit"}</p></div><div className="flex shrink-0 items-start justify-between gap-3"><div className="whitespace-nowrap rounded-xl border border-accent/20 bg-accent-soft px-3 py-2 sm:px-4 sm:py-3"><p className="font-mono text-sm text-accent"><span className="text-2xl leading-none">{activeSummaryIndex === 0 ? "81" : activeSummaryIndex === 1 ? "71" : activeSummaryIndex === 2 ? "249" : "24"}</span><span className="ml-2 text-xs uppercase tracking-wider text-muted">total commits</span></p></div><button type="button" aria-label="Close work summary" onClick={() => setIsGharpayySummaryOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-hover hover:text-foreground"><CloseIcon className="h-5 w-5" /></button></div></div>
          <div className="mt-6 flex items-center justify-between border-y border-border py-3"><button type="button" disabled={activeSummaryIndex === 0} onClick={() => setActiveSummaryIndex((index) => Math.max(0, index - 1))} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent/30 hover:bg-accent-soft hover:text-accent disabled:pointer-events-none disabled:opacity-30"><span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-hover"><ArrowRightIcon className="h-4 w-4 rotate-180 text-accent" /></span> Previous</button><span className="font-mono text-xs text-subtle">{activeSummaryIndex + 1} / 4</span><button type="button" disabled={activeSummaryIndex === 3} onClick={() => setActiveSummaryIndex((index) => Math.min(3, index + 1))} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent/30 hover:bg-accent-soft hover:text-accent disabled:pointer-events-none disabled:opacity-30">Next <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-hover"><ArrowRightIcon className="h-4 w-4 text-accent" /></span></button></div>
          {activeSummaryIndex === 0 ? <>
          <p className="mt-6 text-base leading-7 text-foreground">Full-stack work across GHARPAYY’s internal CRM and operations platform, connecting production workflows, data accuracy, analytics, and frontend experiences.</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">{gharpayyWorkstreams.map(([title, description], index) => <article key={title} className="border-t border-border pt-4"><h3 className="flex items-center gap-2 text-lg text-foreground">{index % 2 === 0 ? <CodeIcon className="h-5 w-5 shrink-0 text-accent" /> : <BriefcaseIcon className="h-5 w-5 shrink-0 text-accent" />}{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}</div>
          <div className="mt-10 border-t border-border pt-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow eyebrow-accent">Detailed delivery history</p><h3 className="mt-2 text-2xl tracking-tight text-foreground">Your GHARPAYY commit record</h3></div>
              <p className="font-mono text-xs text-subtle">41 feature/fix commits · Oct 30 – Nov 15, 2026</p>
            </div>
            <ol className="mt-5 divide-y divide-border rounded-2xl border border-border">
              {gharpayyCommitHighlights.map(([hash, date, description]) => <li key={hash} className="grid gap-2 p-4 sm:grid-cols-[7rem_1fr] sm:gap-5"><div className="font-mono text-xs text-subtle"><span className="text-accent">{hash}</span><br />{date}</div><p className="text-sm leading-6 text-foreground">{description}</p></li>)}
            </ol>
          </div>
          <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm text-foreground"><span className="font-medium text-accent">Scope:</span> 41 authored feature/fix commits across frontend, backend, MongoDB schemas, APIs, analytics, exports, and automated regression tests.</div>
          </> : activeSummaryIndex === 1 ? <>
            <p className="mt-6 text-base leading-7 text-foreground">A local-first operations system combining a Next.js frontend, FastAPI backend, and MySQL persistence for secure WhatsApp screenshot capture, OCR review, analytics, and Auto Sync workflows.</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">{autoSyncWorkstreams.map(([title, description], index) => <article key={title} className="border-t border-border pt-4"><h3 className="flex items-center gap-2 text-lg text-foreground">{index % 2 === 0 ? <CodeIcon className="h-5 w-5 shrink-0 text-accent" /> : <BriefcaseIcon className="h-5 w-5 shrink-0 text-accent" />}{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}</div>
            <div className="mt-8 flex flex-wrap gap-2">{["Next.js", "TypeScript", "FastAPI", "MySQL", "OCR", "Docker"].map((technology) => <span key={technology} className="chip">{technology}</span>)}</div>
            <div className="mt-10 border-t border-border pt-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow eyebrow-accent">Detailed delivery history</p><h3 className="mt-2 text-2xl tracking-tight text-foreground">Your Auto Sync commit record</h3></div><p className="font-mono text-xs text-subtle">44 feature/fix commits · Oct 20 – Oct 22, 2026</p></div><ol className="mt-5 divide-y divide-border rounded-2xl border border-border">{autoSyncCommitHighlights.map(([hash, date, description]) => <li key={hash} className="grid gap-2 p-4 sm:grid-cols-[7rem_1fr] sm:gap-5"><div className="font-mono text-xs text-subtle"><span className="text-accent">{hash}</span><br />{date}</div><p className="text-sm leading-6 text-foreground">{description}</p></li>)}</ol></div>
            <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm text-foreground"><span className="font-medium text-accent">Scope:</span> 44 authored feature/fix commits across frontend, backend, OCR, ML foundations, security, analytics, deployment, and CI.</div>
          </> : activeSummaryIndex === 2 ? <>
            <p className="mt-6 text-base leading-7 text-foreground">Contributed to GHARPAYY’s production operations platform across Auto Sync, OCR, owner portals, booking workflows, founder analytics, and operational control towers.</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">{opsWorkstreams.map(([title, description], index) => <article key={title} className="border-t border-border pt-4"><h3 className="flex items-center gap-2 text-lg text-foreground">{index % 2 === 0 ? <CodeIcon className="h-5 w-5 shrink-0 text-accent" /> : <BriefcaseIcon className="h-5 w-5 shrink-0 text-accent" />}{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}</div>
            <div className="mt-10 border-t border-border pt-7"><p className="eyebrow eyebrow-accent">Detailed delivery history</p><h3 className="mt-2 text-2xl tracking-tight text-foreground">Your Gharpayy-Ops commit record</h3><p className="mt-2 font-mono text-xs text-subtle">249 authored commits · 138 feature/fix commits · Aug 23 – Oct 30, 2026</p></div>
            <ol className="mt-5 divide-y divide-border rounded-2xl border border-border">{opsCommitHighlights.map(([hash, date, description]) => <li key={hash} className="grid gap-2 p-4 sm:grid-cols-[7rem_1fr] sm:gap-5"><div className="font-mono text-xs text-subtle"><span className="text-accent">{hash}</span><br />{date}</div><p className="text-sm leading-6 text-foreground">{description}</p></li>)}</ol>
            <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm text-foreground"><span className="font-medium text-accent">Scope:</span> 249 authored commits total, including 138 feature/fix commits and 111 merge commits.</div>
          </> : <>
            <p className="mt-6 text-base leading-7 text-foreground">Built an AI-assisted rental listing ingestion prototype with provider integrations, listing cleaning, authentication, persistence, analytics, and deployment preparation.</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">{aiListingWorkstreams.map(([title, description], index) => <article key={title} className="border-t border-border pt-4"><h3 className="flex items-center gap-2 text-lg text-foreground">{index % 2 === 0 ? <CodeIcon className="h-5 w-5 shrink-0 text-accent" /> : <BriefcaseIcon className="h-5 w-5 shrink-0 text-accent" />}{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}</div>
            <div className="mt-10 border-t border-border pt-7"><p className="eyebrow eyebrow-accent">Detailed delivery history</p><h3 className="mt-2 text-2xl tracking-tight text-foreground">Your AI Listing Ingestion commit record</h3><p className="mt-2 font-mono text-xs text-subtle">24 authored commits · Sep 11 – Sep 12, 2026</p></div>
            <ol className="mt-5 divide-y divide-border rounded-2xl border border-border">{aiListingCommitHighlights.map(([hash, date, description]) => <li key={hash} className="grid gap-2 p-4 sm:grid-cols-[7rem_1fr] sm:gap-5"><div className="font-mono text-xs text-subtle"><span className="text-accent">{hash}</span><br />{date}</div><p className="text-sm leading-6 text-foreground">{description}</p></li>)}</ol>
            <div className="mt-8 rounded-xl border border-accent/20 bg-accent-soft p-4 text-sm text-foreground"><span className="font-medium text-accent">Scope:</span> 24 authored feature commits covering ingestion, providers, cleaning, security, persistence, analytics, testing, and deployment.</div>
          </>}
        </section>
      </div>, document.body) : null}
    </>
  );
}
