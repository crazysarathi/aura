import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { CardGrid } from "@/components/common/CardGrid";
import { Seo } from "@/components/common/Seo";
import { breadcrumbLd, pageUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { ContentBlocks } from "@/components/common/ContentBlocks";
import { BlogCard } from "@/components/common/Cards";
import { Section, SectionHeading } from "@/components/common/Section";
import { CtaBand } from "@/components/common/CtaBand";
import { Button } from "@/components/ui/button";
import { getPost, sortedPosts } from "@/data/blog-posts";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  if (!post) return <Navigate to="/blog/" replace />;

  const path = `/blog/${post.slug}/`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path },
  ];
  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}/assets/blog/${post.image}-1200w.webp`,
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${site.url}/#clinic` },
    mainEntityOfPage: pageUrl(path),
  };

  return (
    <>
      <Seo title={`${post.title} | Aura Cosmetique`} description={post.excerpt} path={path} type="article" image={`/assets/blog/${post.image}-1200w.webp`} article={{ published: post.date, modified: post.modified, author: post.author }} jsonLd={[breadcrumbLd(crumbs), ld]} />
      <article>
        <header className="bg-white">
          <div className="container-x max-w-4xl py-8 sm:py-14">
            <Breadcrumbs items={crumbs.slice(0, 2)} />
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="mt-3 text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-muted sm:mt-5 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-copper-600" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4 text-copper-600" aria-hidden="true" /> By {post.author}
              </span>
            </p>
          </div>
        </header>
        <div className="container-x max-w-4xl">
          <div className="-mt-0 overflow-hidden rounded-xl shadow-card sm:-mt-2">
            <ResponsiveImage imageKey={`blog/${post.image}`} alt={post.imageAlt} sizes="(min-width: 1024px) 56rem, 100vw" priority className="aspect-video object-cover" />
          </div>
          <div className="prose-aura mx-auto max-w-3xl py-8 sm:py-14">
            <ContentBlocks blocks={post.blocks} />
          </div>
          <div className="mx-auto max-w-3xl border-t border-line py-6">
            <Button asChild variant="link">
              <Link to="/blog/">
                <ArrowLeft aria-hidden="true" /> Back to all articles
              </Link>
            </Button>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Keep reading" title="More from the blog" />
          <CardGrid preset="three" className="mt-8 sm:mt-10">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </CardGrid>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
