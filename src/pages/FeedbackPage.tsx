import { Seo } from "@/components/common/Seo";
import { breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Feedback", path: "/feedback/" },
];

export default function FeedbackPage() {
  return (
    <>
      <Seo title="Patient Feedback – Aura Cosmetique, Salem" description="Tell us about your visit to Aura Cosmetique. Your feedback on waiting time, cleanliness, staff, consultation and treatment helps us improve." path="/feedback/" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero eyebrow="Your experience" title="Feedback" intro="Thank you for visiting Aura Cosmetique. This short survey takes about three minutes and helps us keep improving the care we provide." crumbs={crumbs} compact />
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <FeedbackForm />
        </div>
      </Section>
    </>
  );
}
