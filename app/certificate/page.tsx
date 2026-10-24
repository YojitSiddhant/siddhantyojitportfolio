import Image from "next/image";
import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificate | Siddhant Yojit",
  description: "Certificates for Siddhant Yojit.",
};

const orderedCertificates = [...certificates].sort((a, b) => a.order - b.order);

export default function CertificatePage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Certificates"
        title={
          <>
            Completed <span className="serif-accent text-accent">learning</span>
          </>
        }
        aside={<HeaderStat value={String(orderedCertificates.length).padStart(2, "0")} label="certificates" />}
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {orderedCertificates.map((certificate, index) => (
          <Reveal as="li" key={certificate.title} delay={(index % 2) * 80} className="card card-interactive flex flex-col p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              {certificate.logo ? (
                <span className="logo-tile h-12 w-12 rounded-xl p-2">
                  <Image
                    src={certificate.logo}
                    alt={`${certificate.issuer} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : null}
              <span className="font-mono text-xs text-subtle">Certificate · {String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="mt-10 text-2xl tracking-tight text-foreground">{certificate.title}</h2>
            <p className="mt-2 text-muted">{certificate.issuer}</p>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}
