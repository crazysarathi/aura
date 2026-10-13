import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { BlogCard } from "@/components/common/Cards";
import { CtaBand } from "@/components/common/CtaBand";
import { Reveal } from "@/components/common/Reveal";
import { sortedPosts } from "@/data/blog-posts";
import { site } from "@/data/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
];

export default function BlogPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    url: pageUrl("/blog/"),
    blogPost: sortedPosts.map((p) => ({ "@type": "BlogPosting", headline: p.title, datePublished: p.date, url: pageUrl(`/blog/${p.slug}/`) })),
  };
  return (
    <>
      <Seo title="Blog – Skin, Hair & Aesthetic Care Guides | Aura Cosmetique Salem" description="Articles from the specialists at Aura Cosmetique, Salem: skin lightening, fine lines, PRP therapy, laser hair reduction and skin rejuvenation treatments." path="/blog/" jsonLd={[breadcrumbLd(crumbs), ld]} />
      <PageHero eyebrow="Aura" title="Our Blog" intro="Guides from our specialists on skin, hair and aesthetic care." crumbs={crumbs} compact />
      <Section>
        {sortedPosts.length === 0 ? (
          <p className="text-ink-muted">No articles have been published yet.</p>
        ) : (
          <CardGrid preset="three">
            {sortedPosts.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.05}>
                <BlogCard post={p} headingLevel="h2" />
              </Reveal>
            ))}
          </CardGrid>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
