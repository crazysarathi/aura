import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, pageUrl } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { DoctorCard, ServiceCard } from "@/components/common/Cards";
import { LazyConsultationForm as ConsultationForm } from "@/components/forms/LazyConsultationForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getService, legacyAnchorMap, services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { cn } from "@/lib/utils";
import type { ServiceCategory, TreatmentGroup } from "@/types/content";

/** Template for the five service category pages. Content comes from src/data/services.ts. */
export default function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  const hash = decodeURIComponent(useLocation().hash.slice(1));

  // Old mega-menu anchors like #skin-01 → new treatment ids.
  const legacy = service ? legacyAnchorMap[service.slug]?.[hash] : undefined;
  const navigate = useNavigate();
  useEffect(() => {
    if (legacy) navigate({ hash: `#${legacy}` }, { replace: true });
  }, [legacy, navigate]);

  if (!service) return <Navigate to="/services/" replace />;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Our Services", path: "/services/" },
    { name: service.name, path: service.path },
  ];
  const team = doctors.filter((d) => service.doctorIds.includes(d.id));
  const others = services.filter((s) => s.slug !== service.slug);
  const hashId = legacy ?? hash;

  const procedureLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: service.name,
    url: pageUrl(service.path),
    about: { "@type": "MedicalSpecialty", name: service.name },
    provider: { "@id": `${site.url}/#clinic` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: service.groups.flatMap((g) => g.treatments).map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name })),
    },
  };

  return (
    <>
      <Seo title={service.seo.title} description={service.seo.description} path={service.path} image={`/assets/${service.cardImage.key}-1200w.webp`} jsonLd={[breadcrumbLd(crumbs), procedureLd]} preloadImage={{ key: service.heroImage.key, sizes: "(min-width: 1024px) 40vw, 100vw" }} />
      <PageHero eyebrow="Our Services" title={service.name} intro={service.summary} crumbs={crumbs} image={service.heroImage}>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="accent">
            <Link to={{ hash: "#book" }}>Book a consultation</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/40 text-white hover:border-white hover:bg-white/10">
            <a href={`tel:${site.phones[0].tel}`}>Call {site.phones[0].display}</a>
          </Button>
        </div>
      </PageHero>

      {service.groups.length > 1 && (
        <nav aria-label="Sections" data-subnav className="sticky top-16 z-30 border-b border-line bg-ivory/95 backdrop-blur lg:top-18">
          <ul className="container-x flex gap-1 overflow-x-auto py-2 text-sm [scrollbar-width:none]">
            {service.groups.map((g) => (
              <li key={g.id} className="shrink-0">
                <Link to={{ hash: `#${g.id}` }} className={cn("inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium sm:h-9 sm:px-4 sm:text-sm text-indigo-900/80 hover:bg-indigo-50 hover:text-indigo-900", hashId === g.id && "bg-indigo-900 text-white hover:bg-indigo-800 hover:text-white")}>
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {service.groups.map((group, gi) => (
        <TreatmentGroupSection key={group.id} group={group} index={gi} service={service} hashId={hashId} />
      ))}

      {team.length > 0 && (
        <Section tone="cream">
          <SectionHeading eyebrow="Your specialists" title={`${service.shortName} team`} />
          <CardGrid preset="doctorsFour" className="mt-8 sm:mt-10">
            {team.map((d) => (
              <li key={d.id}>
                <DoctorCard doctor={d} />
              </li>
            ))}
          </CardGrid>
        </Section>
      )}

      <Section id="book" tone="white">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Appointments" title="Book a consultation" intro={`Tell us a little about yourself and we'll call you back to arrange a ${service.shortName.toLowerCase()} consultation.`} />
          </div>
          <div className="rounded-xl border border-line bg-ivory p-4 sm:p-8 lg:col-span-7">
            <ConsultationForm defaultService={service.name} idPrefix={`svc-${service.slug}`} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Explore" title="Other specialities" />
        <CardGrid preset="four" className="mt-8 sm:mt-10">
          {others.map((s) => (
            <li key={s.slug}>
              <ServiceCard service={s} />
            </li>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}

function TreatmentGroupSection({ group, index: gi, service, hashId }: { group: TreatmentGroup; index: number; service: ServiceCategory; hashId: string }) {
  // null = user closed everything; undefined = follow the URL anchor (or open the first described item).
  const [userOpen, setUserOpen] = useState<string | null | undefined>(undefined);
  const fallback = group.treatments.some((t) => t.id === hashId) ? hashId : group.treatments.find((t) => t.description)?.id;
  const open = userOpen === undefined ? fallback : (userOpen ?? undefined);
  return (
    <Section id={group.id} tone={gi % 2 === 0 ? "white" : "default"} className="scroll-mt-28 lg:scroll-mt-32">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className={cn("lg:col-span-4", gi % 2 === 1 && "lg:order-2")}>
                <div className="lg:sticky lg:top-40">
                  <SectionHeading eyebrow={service.shortName} title={group.title} intro={group.intro} as="h2" />
                  <p className="mt-3 text-sm text-ink-muted">
                    {group.treatments.length} {group.treatments.length === 1 ? "treatment" : "treatments"}
                  </p>
                  {group.image && (
                    <div className="mt-6 hidden overflow-hidden rounded-xl shadow-card lg:block">
                      <ResponsiveImage imageKey={group.image.key} alt={group.image.alt} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/5] object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-span-8">
                <Accordion type="single" collapsible value={open ?? ""} onValueChange={(v) => setUserOpen(v || null)} className="rounded-xl border border-line bg-white px-4 shadow-soft sm:px-7">
                  {group.treatments.map((t) => (
                    <AccordionItem key={t.id} value={t.id} id={t.id} className="scroll-mt-32">
                      <AccordionTrigger>
                        <span className="flex flex-col gap-0.5">
                          <span>{t.name}</span>
                          {!t.description && <span className="text-xs font-normal text-ink-muted">Available at Aura Cosmetique – ask us for details</span>}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {t.description ? <p>{t.description}</p> : <p className="text-ink-muted">Our specialists will explain this treatment, its suitability and what to expect during your consultation.</p>}
                        <Link to={`/consult/?service=${encodeURIComponent(service.name)}&treatment=${encodeURIComponent(t.name)}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-copper-700 hover:underline">
                          Enquire about {t.name} <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
    </Section>
  );
}
