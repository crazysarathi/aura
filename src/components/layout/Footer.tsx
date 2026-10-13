import { Link } from "react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { SocialLinks } from "@/components/common/SocialLinks";
import { footerNav } from "@/data/navigation";
import { aboutCopy, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo priority={false} />
          <h2 className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">About Aura</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{aboutCopy.intro}</p>
          <SocialLinks className="mt-5" />
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Important Links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-ink-muted hover:text-copper-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Our Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.services.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-ink-muted hover:text-copper-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Contact Us</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-ink-muted">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden="true" />
              <a href={site.map.link} target="_blank" rel="noopener noreferrer" className="hover:text-copper-700">
                {site.address.full}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-copper-700">
                {site.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden="true" />
              <span>
                {site.phones.map((p, i) => (
                  <span key={p.tel}>
                    {i > 0 && " / "}
                    <a href={`tel:${p.tel}`} className="hover:text-copper-700">
                      {p.display}
                    </a>
                  </span>
                ))}
              </span>
            </p>
          </address>
          <h2 className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-indigo-900">Opening Hours</h2>
          <dl className="mt-3 space-y-1.5 text-sm text-ink-muted">
            {site.hours.map((h) => (
              <div key={h.days} className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden="true" />
                <dt className="w-32 shrink-0">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            <Link to="/privacy-policy/" className="hover:text-copper-700">
              Privacy Policy
            </Link>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            Designed by{" "}
            <a href={site.credit.href} target="_blank" rel="noopener noreferrer" className="hover:text-copper-700">
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
