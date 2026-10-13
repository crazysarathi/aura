import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { DoctorCard } from "@/components/common/Cards";
import { CtaBand } from "@/components/common/CtaBand";
import { Reveal } from "@/components/common/Reveal";
import { doctors } from "@/data/doctors";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Team", path: "/doctors/" },
];

export default function DoctorsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: doctors.map((d, i) => ({ "@type": "ListItem", position: i + 1, url: pageUrl(`/doctors/${d.slug}/`), name: d.name })),
  };
  return (
    <>
      <Seo
        title="Our Doctors – Dermatologists, Cosmetic Gynecologist, Plastic & Maxillofacial Surgeons | Aura Cosmetique Salem"
        description="Meet the consultant team at Aura Cosmetique, Salem: Dr. Priyadharshini K, Dr. Harish Prasanna, Dr. Kavitha, Dr. Senthil Kumaran M and Dr. Nagappan AR."
        path="/doctors/"
        jsonLd={[breadcrumbLd(crumbs), ld]}
      />
      <PageHero eyebrow="Specialists" title="Our Team" intro="Our commitment to excellence is exemplified by our exceptional team of expert doctors and professionals who have a profound understanding of the art and science of beauty and healthcare." crumbs={crumbs} compact />
      <Section>
        <CardGrid preset="doctors" className="xl:[--cols:3]">
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.05}>
              <DoctorCard doctor={d} headingLevel="h2" />
            </Reveal>
          ))}
        </CardGrid>
      </Section>
      <CtaBand title="Consult a specialist" text="Not sure which doctor to see? Share your concern and our front office will match you with the right consultant." />
    </>
  );
}
