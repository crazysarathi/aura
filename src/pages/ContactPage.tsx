import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, organizationLd } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { LazyConsultationForm as ConsultationForm } from "@/components/forms/LazyConsultationForm";
import { MapEmbed } from "@/components/common/MapEmbed";
import { SocialLinks } from "@/components/common/SocialLinks";
import { site } from "@/data/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact-us/" },
];

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact Aura Cosmetique – Brindavan Road, Salem | Phone, WhatsApp, Map" description={`Visit Aura Cosmetique by SKS at ${site.address.full}. Call ${site.phones[0].display} or 0427 403 3577, email ${site.email}. Open Mon–Sat 9 AM to 8 PM.`} path="/contact-us/" jsonLd={[breadcrumbLd(crumbs), organizationLd()]} />
      <PageHero eyebrow="Get in touch" title="Contact Us" intro="We're on Brindavan Road, Salem. Call, message us on WhatsApp, or send your details and we'll call you back." crumbs={crumbs} compact />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="divide-y divide-line rounded-xl border border-line bg-ivory">
              <li className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-copper-600" aria-hidden="true" />
                <div>
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Address</h2>
                  <address className="mt-1 not-italic leading-relaxed text-ink">{site.address.full}</address>
                  <a href={site.map.link} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-copper-700 underline underline-offset-4">
                    Get directions
                  </a>
                </div>
              </li>
              <li className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                <Phone className="mt-0.5 size-5 shrink-0 text-copper-600" aria-hidden="true" />
                <div>
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Phone</h2>
                  <ul className="mt-1 space-y-0.5">
                    {site.phones.map((p) => (
                      <li key={p.tel}>
                        <a href={`tel:${p.tel}`} className="text-ink hover:text-copper-700">
                          {p.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-copper-600" aria-hidden="true" />
                <div>
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">WhatsApp</h2>
                  <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-ink hover:text-copper-700">
                    +91 93847 48884
                  </a>
                </div>
              </li>
              <li className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                <Mail className="mt-0.5 size-5 shrink-0 text-copper-600" aria-hidden="true" />
                <div>
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Email</h2>
                  <a href={`mailto:${site.email}`} className="mt-1 inline-block text-ink hover:text-copper-700">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                <Clock className="mt-0.5 size-5 shrink-0 text-copper-600" aria-hidden="true" />
                <div>
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Opening hours</h2>
                  <dl className="mt-1 space-y-0.5 text-ink">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex gap-3">
                        <dt className="w-32 shrink-0 text-ink-muted">{h.days}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
              <li className="p-4 sm:p-5">
                <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Follow us on</h2>
                <SocialLinks className="mt-3" />
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed className="h-full [&_iframe]:min-h-72 sm:[&_iframe]:min-h-96 [&_iframe]:lg:h-[calc(100%-1.5rem)]" />
          </div>
        </div>
      </Section>

      <Section id="book">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Appointments" title="Book a consultation" intro="Share your details and our front office will call you back to fix a convenient time." />
          </div>
          <div className="rounded-xl border border-line bg-white p-4 shadow-soft sm:p-8 lg:col-span-7">
            <ConsultationForm idPrefix="contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
