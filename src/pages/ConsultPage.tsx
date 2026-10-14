import { useSearchParams } from "react-router";
import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { ServiceCard } from "@/components/common/Cards";
import { LazyConsultationForm as ConsultationForm } from "@/components/forms/LazyConsultationForm";
import { MapEmbed } from "@/components/common/MapEmbed";
import { Reveal } from "@/components/common/Reveal";
import { aboutCopy, site } from "@/data/site";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Consult", path: "/consult/" },
];

/** Rebuild of /consult/: services overview, testimonials, map and the booking form. */
export default function ConsultPage() {
  const [params] = useSearchParams();
  const service = params.get("service") ?? undefined;
  const treatment = params.get("treatment");
  return (
    <>
      <Seo title="Book a Consultation – Aura Cosmetique, Salem" description="Request an appointment with the dermatologist, cosmetic gynecologist, plastic surgeon and maxillofacial surgeon at Aura Cosmetique by SKS, Salem. Call +91 93847 48884 or send your details." path="/consult/" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero eyebrow="Appointments" title="Book a consultation" intro="Share your details and our front office will call you back to fix a convenient time with the right specialist." crumbs={crumbs} compact />

      <Section tone="white" id="book">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {treatment && (
              <p className="mb-5 rounded-lg border border-copper-200 bg-copper-50 px-4 py-3 text-sm text-indigo-900">
                Enquiring about <strong>{treatment}</strong>
                {service ? ` (${service})` : ""}. Mention it in your message or we'll note it from this page.
              </p>
            )}
            <div className="rounded-xl border border-line bg-ivory p-4 sm:p-8">
              <ConsultationForm defaultService={service} idPrefix="consult" />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-ivory p-4 sm:p-6">
              <h2 className="text-xl">Prefer to call?</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                {site.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="font-medium text-indigo-900 hover:text-copper-700">
                      {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-900 hover:text-copper-700">
                    WhatsApp +91 93847 48884
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="font-medium text-indigo-900 hover:text-copper-700">
                    {site.email}
                  </a>
                </li>
              </ul>
              <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Opening hours</h3>
              <dl className="mt-2 space-y-1 text-sm text-ink-muted">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt>{h.days}</dt>
                    <dd className="font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <MapEmbed className="mt-5 [&_iframe]:min-h-56" />
            </div>
          </aside>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Aura Cosmetique" title="Our Services" intro={aboutCopy.servicesIntro} align="center" />
        </Reveal>
        <CardGrid preset="services" className="mt-8 sm:mt-10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Testimonial" title="What our patients say" align="center" />
        <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="h-full rounded-xl border border-line bg-white p-5 shadow-soft sm:p-7">
                <blockquote className="leading-relaxed text-ink">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-indigo-900">{t.name}</span>
                  <span className="block text-xs text-ink-muted">{t.source}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
