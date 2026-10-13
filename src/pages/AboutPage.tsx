import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, organizationLd } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { BeforeAfter } from "@/components/common/BeforeAfter";
import { DoctorCard, ServiceCard } from "@/components/common/Cards";
import { CtaBand } from "@/components/common/CtaBand";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { aboutCopy, site } from "@/data/site";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about/" },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Aura Cosmetique – Dermatology & Aesthetic Clinic by SKS Hospital, Salem"
        description="Aura Cosmetique is SKS Hospital's premier dermatology and cosmetology destination in Salem: expert doctors, a calming ambience and state-of-the-art equipment for skin, hair, dental, gynecological and aesthetic care."
        path="/about/"
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Aura" title="About Us" intro={aboutCopy.intro} crumbs={crumbs} image={{ key: "treatments/dermatology-skin-care", alt: "Skin care consultation at Aura Cosmetique" }} />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeading eyebrow="Our approach" title="The art and science of beauty and healthcare" />
            <div className="prose-aura mt-6">
              <p>{aboutCopy.body}</p>
              <p>{aboutCopy.servicesIntro}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-xl border border-line bg-ivory p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <ResponsiveImage imageKey="brand/nabh-patient-safety" alt="NABH Patient Safety and Quality of Care accredited badge" sizes="96px" className="w-20 shrink-0" />
                <p className="text-[15px] leading-snug text-indigo-900">{site.accreditation}</p>
              </div>
              <h3 className="mt-6 text-lg">Part of SKS Hospital</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">In close collaboration with SKS Hospital, Aura extends its services to comprehensive medical diagnoses for underlying health issues, apart from offering aesthetic treatments.</p>
              <h3 className="mt-6 text-lg">Find us</h3>
              <address className="mt-2 text-sm not-italic leading-relaxed text-ink-muted">{site.address.full}</address>
              <Button asChild variant="link" className="mt-2">
                <Link to="/contact-us/">
                  Directions and hours <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <Reveal>
          <SectionHeading eyebrow="About Us" title="Why Us?" intro={aboutCopy.whyUs} />
        </Reveal>
        <Reveal className="mt-10">
          <BeforeAfter
            before={{ key: "clinic/clinic-banner-1", alt: "Illustration: skin with acne before treatment" }}
            after={{ key: "clinic/clinic-banner-2", alt: "Illustration: clear skin after treatment" }}
            caption="Illustrative imagery from our original website — drag the handle to compare."
          />
        </Reveal>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHeading eyebrow="Specialities" title="What we treat" align="center" />
        </Reveal>
        <CardGrid preset="services" className="mt-8 sm:mt-10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Specialists" title="Our Team" />
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/doctors/">All doctors</Link>
          </Button>
        </Reveal>
        <CardGrid preset="doctors" className="mt-8 sm:mt-10">
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.05}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>
      <CtaBand />
    </>
  );
}
