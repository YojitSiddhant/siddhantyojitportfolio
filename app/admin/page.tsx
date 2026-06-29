import type { Metadata } from "next";
import Link from "next/link";

import { readBookingRequests } from "@/lib/booking-requests";

export const metadata: Metadata = {
  title: "Admin | Booking Requests",
  description: "Booking dashboard for slot requests coming from the contact page.",
};

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function formatTime(value: string) {
  if (!value) return value;
  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;

  const period = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;
  return `${normalizedHours}:${minutesText} ${period}`;
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--accent)]">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
    </div>
  );
}

export default async function AdminPage() {
  const bookings = await readBookingRequests();
  const upcomingCount = bookings.filter((booking) => {
    const bookingDate = new Date(`${booking.preferredDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  }).length;

  const remoteCount = bookings.filter((booking) => booking.meetingMode !== "In person").length;
  const inPersonCount = bookings.filter((booking) => booking.meetingMode === "In person").length;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--background)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[var(--background)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Admin dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Booking requests
            </h1>
          </div>
          <div className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-[var(--accent-strong)]">
            Latest requests first
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total"
            value={String(bookings.length).padStart(2, "0")}
            detail="All booking requests saved from the contact page."
          />
          <StatCard
            label="Upcoming"
            value={String(upcomingCount).padStart(2, "0")}
            detail="Requests that are scheduled for today or later."
          />
          <StatCard
            label="Remote"
            value={String(remoteCount).padStart(2, "0")}
            detail="Requests asking for an online or phone meeting."
          />
          <StatCard
            label="In person"
            value={String(inPersonCount).padStart(2, "0")}
            detail="Requests asking to meet in person."
          />
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm sm:p-5 motion-reveal" style={{ animationDelay: "140ms" }}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--accent)]">Queue</p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">Incoming slot requests</h2>
            </div>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              Back to contact
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="grid place-items-center py-14 text-center">
              <div className="max-w-md rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-10">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">No requests yet</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  When a visitor books a slot from the contact page, it will show up here with their preferred time and agenda.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              {bookings.map((booking) => (
                <article
                  key={booking.id}
                  className="grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm lg:grid-cols-[1.2fr_0.8fr]"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                        New
                      </span>
                      <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--foreground)]">
                        {booking.meetingMode}
                      </span>
                      <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--foreground)]">
                        {booking.topic}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">{booking.name}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {booking.email} · {booking.phone}
                      </p>
                    </div>

                    <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
                      {booking.message}
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--foreground)]">Slot</p>
                      <p className="text-right font-medium text-[var(--foreground)]">
                        {formatDate(booking.preferredDate)} at {formatTime(booking.preferredTime)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--foreground)]">Created</p>
                      <p className="text-right font-medium text-[var(--muted)]">
                        {new Intl.DateTimeFormat("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(booking.createdAt))}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[var(--foreground)]">Reference</p>
                      <p className="font-mono text-sm font-semibold text-[var(--foreground)]">
                        {booking.id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
