import { Link } from "react-router";
import { Seo } from "@/components/common/Seo";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found – Aura Cosmetique" description="The page you were looking for does not exist." path="/404/" noindex />
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-4xl">We couldn't find that page</h1>
          <p className="mt-4 text-ink-muted">The link may be out of date. Try one of our specialities below, or head back to the home page.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/">Go to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact-us/">Contact us</Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={s.path} className="inline-flex h-9 items-center rounded-full border border-line bg-white px-4 text-indigo-900 hover:border-copper-400">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
