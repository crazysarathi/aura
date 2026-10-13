import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { ServiceCard } from "@/components/common/Cards";
import { CtaBand } from "@/components/common/CtaBand";
import { Reveal } from "@/components/common/Reveal";
import { aboutCopy } from "@/data/site";
import { services } from "@/data/services";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Services", path: "/services/" },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Seo
        title="Our Services – Cosmetic Dermatology, Hair, Gynecology, Dentistry & Surgery | Aura Cosmetique"
        description="Explore every speciality at Aura Cosmetique, Salem: cosmetic dermatology, hair transplantation, cosmetic gynecology, cosmetic dentistry and aesthetic surgery, all under one roof."
        path="/services/"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero eyebrow="Aura Cosmetique" title="Our Services" intro={aboutCopy.servicesIntro} crumbs={crumbs} compact />
      <Section>
        <CardGrid preset="three">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>
      <CtaBand />
    </>
  );
}
