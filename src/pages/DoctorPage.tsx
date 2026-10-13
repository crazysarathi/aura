import { Link, Navigate, useParams } from "react-router";
import { ArrowRight } from "lucide-react";
import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { DoctorCard, ServiceCard } from "@/components/common/Cards";
import { LazyConsultationForm as ConsultationForm } from "@/components/forms/LazyConsultationForm";
import { Button } from "@/components/ui/button";
import { doctors, getDoctor } from "@/data/doctors";
import { services } from "@/data/services";
import { site } from "@/data/site";

/** Doctor profile template. Only facts published on the old site are shown (name, degrees, designation, photo). */
export default function DoctorPage() {
  const { slug = "" } = useParams();
  const doctor = getDoctor(slug);
  if (!doctor) return <Navigate to="/doctors/" replace />;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Our Team", path: "/doctors/" },
    { name: doctor.name, path: `/doctors/${doctor.slug}/` },
  ];
  const specialties = services.filter((s) => doctor.specialties.includes(s.slug));
  const colleagues = doctors.filter((d) => d.id !== doctor.id);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    jobTitle: doctor.designation,
    image: `${site.url}/assets/${doctor.image.key}-640w.webp`,
    url: pageUrl(`/doctors/${doctor.slug}/`),
    worksFor: { "@id": `${site.url}/#clinic` },
    medicalSpecialty: specialties.map((s) => s.name),
  };

  return (
    <>
      <Seo title={`${doctor.name} – ${doctor.designation} | Aura Cosmetique Salem`} description={`${doctor.name}, ${doctor.qualifications}, ${doctor.designation} at Aura Cosmetique by SKS, Salem. Book a consultation.`} path={`/doctors/${doctor.slug}/`} image={`/assets/${doctor.image.key}-640w.webp`} jsonLd={[breadcrumbLd(crumbs), ld]} preloadImage={{ key: doctor.image.key, sizes: "(min-width: 1024px) 30vw, 100vw" }} />
      <PageHero eyebrow={doctor.designation} title={doctor.name} intro={doctor.qualifications} crumbs={crumbs} compact>
        <Button asChild variant="accent">
          <Link to={{ hash: "#book" }}>Book with {doctor.name.split(" ").slice(0, 2).join(" ")}</Link>
        </Button>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-xs overflow-hidden rounded-xl shadow-card sm:max-w-sm lg:max-w-none">
              <ResponsiveImage imageKey={doctor.image.key} alt={doctor.image.alt} sizes="(min-width: 1024px) 30vw, 100vw" priority className="aspect-[3/4] object-cover object-top" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <dl className="grid gap-5 rounded-xl border border-line bg-ivory p-4 sm:grid-cols-2 sm:gap-6 sm:p-6">
              <div>
                <dt className="eyebrow">Qualifications</dt>
                <dd className="mt-1.5 font-sans text-base font-medium text-indigo-900 sm:mt-2 sm:text-lg">{doctor.qualifications}</dd>
              </div>
              <div>
                <dt className="eyebrow">Designation</dt>
                <dd className="mt-1.5 font-sans text-base font-medium text-indigo-900 sm:mt-2 sm:text-lg">{doctor.designation}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow">Consults at</dt>
                <dd className="mt-2 text-ink-muted">
                  {site.legalName}, {site.address.full}
                </dd>
              </div>
            </dl>
            {specialties.length > 0 && (
              <div className="mt-10">
                <SectionHeading eyebrow="Areas of practice" title="Treatments led by this doctor" />
                <CardGrid preset="four" className="mt-6 lg:[--cols:2]">
                  {specialties.map((s) => (
                    <li key={s.slug}>
                      <ServiceCard service={s} />
                    </li>
                  ))}
                </CardGrid>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section id="book">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Appointments" title={`Consult ${doctor.name}`} intro="Share your details and our front office will call you back to fix an appointment." />
            <Button asChild variant="link" className="mt-4">
              <Link to="/doctors/">
                All doctors <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl border border-line bg-white p-4 shadow-soft sm:p-8 lg:col-span-7">
            <ConsultationForm defaultService={specialties[0]?.name} idPrefix={`dr-${doctor.slug}`} />
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Our Team" title="Other specialists" />
        <CardGrid preset="doctorsFour" className="mt-8 sm:mt-10">
          {colleagues.map((d) => (
            <li key={d.id}>
              <DoctorCard doctor={d} />
            </li>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
