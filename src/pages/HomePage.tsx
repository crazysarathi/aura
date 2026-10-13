import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { ArrowRight, HeartHandshake, Microscope, Stethoscope } from "lucide-react";
import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { organizationLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
const TreatmentIndex = lazy(() => import("@/components/home/TreatmentIndex").then((m) => ({ default: m.TreatmentIndex })));
const BeforeAfter = lazy(() => import("@/components/common/BeforeAfter").then((m) => ({ default: m.BeforeAfter })));
import { CountUp } from "@/components/common/CountUp";
import { Section, SectionHeading } from "@/components/common/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { BlogCard, DoctorCard, ServiceCard } from "@/components/common/Cards";
import { Reveal } from "@/components/common/Reveal";
import { LazyConsultationForm as ConsultationForm } from "@/components/forms/LazyConsultationForm";
import { MapEmbed } from "@/components/common/MapEmbed";
import { Button } from "@/components/ui/button";
import { aboutCopy, site } from "@/data/site";
import { services, treatmentCount } from "@/data/services";
import { doctors } from "@/data/doctors";
import { sortedPosts } from "@/data/blog-posts";
import { testimonials } from "@/data/testimonials";

const whyUs = [
  { icon: HeartHandshake, title: "Calming ambience", text: "Designed to put patients at ease, reaffirming that they are in safe hands." },
  { icon: Microscope, title: "State-of-the-art apparatus", text: "Equipped to provide the most advanced and effective treatments available." },
  { icon: Stethoscope, title: "Expert, holistic care", text: "Highly-trained dermatologists and medical staff, backed by SKS Hospital for comprehensive diagnoses." },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Aura Cosmetique – Skin, Hair & Aesthetic Clinic in Salem by SKS Hospital"
        description="Aura Cosmetique by SKS is a premier dermatology and cosmetology clinic in Salem, Tamil Nadu, offering cosmetic dermatology, hair transplantation, cosmetic gynecology, cosmetic dentistry and aesthetic surgery. Call +91 93847 48884."
        path="/"
        jsonLd={[organizationLd()]}
        preloadImage={{ key: aboutCopy.heroSlides[0].image, sizes: "100vw" }}
      />
      <Hero />

      <Section id="about" tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow="Aura" title="About Us" />
            <p className="mt-5 text-base leading-relaxed text-ink sm:mt-6 sm:text-[1.0625rem]">{aboutCopy.intro}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-base">{aboutCopy.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/about/">
                  More about the clinic <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/doctors/">Meet our doctors</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <div className="col-span-12 overflow-hidden rounded-xl shadow-card sm:col-span-8">
                <ResponsiveImage imageKey="treatments/dermatology-natural-skin" alt="Woman with clear, natural skin" sizes="(min-width: 1024px) 33vw, 66vw" className="aspect-[4/3] object-cover" />
              </div>
              <div className="col-span-12 flex flex-col justify-end sm:col-span-4">
                <div className="flex items-center gap-4 rounded-xl border border-line bg-ivory p-4 sm:block sm:text-center">
                  <ResponsiveImage imageKey="brand/nabh-patient-safety" alt="NABH Patient Safety and Quality of Care accredited badge" sizes="80px" className="w-14 shrink-0 sm:mx-auto sm:w-20" />
                  <p className="text-[13px] leading-snug text-ink-muted sm:mt-3">{site.accreditation}</p>
                </div>
              </div>
              <div className="col-span-12 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-ivory text-center">
                <div className="p-3 sm:p-4">
                  <p className="font-display text-xl text-indigo-900 sm:text-2xl"><CountUp value={services.length} /></p>
                  <p className="text-xs text-ink-muted">Specialities</p>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-display text-xl text-indigo-900 sm:text-2xl"><CountUp value={treatmentCount} suffix="+" /></p>
                  <p className="text-xs text-ink-muted">Treatments listed</p>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-display text-xl text-indigo-900 sm:text-2xl"><CountUp value={doctors.length} /></p>
                  <p className="text-xs text-ink-muted">Consultant doctors</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="services">
        <Reveal>
          <SectionHeading eyebrow="Aura Cosmetique" title="Our Services" intro={aboutCopy.servicesIntro} align="center" />
        </Reveal>
        <CardGrid preset="services" className="mt-10 sm:mt-12">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.06}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section id="treatments" tone="cream">
        <Reveal>
          <SectionHeading eyebrow="Every treatment" title="Find your treatment" intro="Browse the complete list of procedures we offer, by speciality. Each link opens the treatment's description on its service page." />
        </Reveal>
        <Reveal className="mt-10" delay={0.08}>
          <Suspense fallback={<div className="min-h-[32rem] animate-pulse rounded-xl bg-sand/60" aria-busy="true" />}>
            <TreatmentIndex />
          </Suspense>
        </Reveal>
      </Section>

      <Section id="why-us" tone="indigo">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="About Us" title="Why Us?" tone="light" />
            <p className="mt-6 leading-relaxed text-white/80">{aboutCopy.whyUs}</p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
            {whyUs.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.08} className="flex h-full gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <w.icon className="mt-0.5 size-6 shrink-0 text-copper-400" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-base font-semibold text-white">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="our-team" tone="white">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Specialists" title="Our Team" intro="Consultant dermatologists, a cosmetic gynecologist, a plastic surgeon and a maxillofacial surgeon, working together under one roof." />
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/doctors/">All doctors</Link>
          </Button>
        </Reveal>
        <CardGrid preset="doctors" className="mt-8 sm:mt-10">
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.06}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section id="transformation" className="py-0 sm:py-0 lg:py-0">
        <Reveal>
          <Suspense fallback={<div className="my-12 aspect-[4/3] animate-pulse rounded-xl bg-sand/60 sm:my-20 sm:aspect-[16/8] lg:aspect-[1920/750]" aria-busy="true" />}>
            <BeforeAfter
              before={{ key: "clinic/clinic-banner-1", alt: "Illustration: skin with acne before treatment" }}
              after={{ key: "clinic/clinic-banner-2", alt: "Illustration: clear skin after treatment" }}
              caption="Illustrative imagery from our original website — drag the handle to compare."
              className="py-12 sm:py-20"
            />
          </Suspense>
        </Reveal>
      </Section>

      <Section id="testimonials" tone="cream">
        <Reveal>
          <SectionHeading eyebrow="Patient voices" title="What our patients say" align="center" />
        </Reveal>
        <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-xl border border-line bg-white p-5 shadow-soft sm:p-7">
                <blockquote className="text-[15px] leading-relaxed text-ink sm:text-[1.0625rem]">
                  <span aria-hidden="true" className="float-left mr-2 font-display text-5xl leading-none text-copper-400">
                    “
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-indigo-900">{t.name}</span>
                  <span className="block text-xs text-ink-muted">{t.source}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="our-blog" tone="white">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Aura" title="Our Blog" intro="Guides from our specialists on skin, hair and aesthetic care." />
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/blog/">All articles</Link>
          </Button>
        </Reveal>
        <CardGrid preset="three" className="mt-8 sm:mt-10">
          {sortedPosts.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section id="book">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeading eyebrow="Appointments" title="Book a consultation" intro="Share your details and our front office will call you back to fix a convenient time with the right specialist." />
            <div className="mt-6 rounded-xl border border-line bg-white p-4 shadow-soft sm:mt-8 sm:p-8">
              <ConsultationForm idPrefix="home" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="h-full rounded-xl border border-line bg-white p-4 shadow-soft sm:p-6">
              <h3 className="text-xl">Visit us</h3>
              <address className="mt-3 text-sm not-italic leading-relaxed text-ink-muted">{site.address.full}</address>
              <dl className="mt-4 space-y-1 text-sm text-ink-muted">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt>{h.days}</dt>
                    <dd className="font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <MapEmbed className="mt-5 [&_iframe]:min-h-56" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
