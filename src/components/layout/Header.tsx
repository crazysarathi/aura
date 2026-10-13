import { lazy, Suspense, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ctaLink, primaryNav, servicesNav } from "@/data/navigation";
const MegaMenu = lazy(() => import("./MegaMenu").then((m) => ({ default: m.MegaMenu })));
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative inline-flex h-10 items-center px-2.5 text-[14px] font-medium xl:px-3 xl:text-[14.5px] text-indigo-900/85 transition-colors hover:text-indigo-900 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper-600 after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive && "text-indigo-900 after:scale-x-100",
  );

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMega = () => setMegaOpen(false);

  const servicesActive = location.pathname.startsWith("/services") || servicesNav.columns.some((c) => location.pathname.startsWith(c.links[0].href));

  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          // With HashRouter a bare "#main" would be treated as a route, so move focus manually.
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus({ preventScroll: true });
          main?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-indigo-900 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      {/* Info bar scrolls away; only the main bar is sticky, so sticky offsets stay small. */}
      <div className="hidden bg-indigo-900 text-[13px] text-white/90 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <p className="truncate">{site.address.full}</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5" aria-hidden="true" /> {site.phones[0].display}
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-white/25" />
            <span>Mon – Sat · 9:00 AM – 8:00 PM</span>
          </div>
        </div>
      </div>

      <header className={cn("sticky top-0 z-40 border-b border-transparent bg-ivory/95 backdrop-blur transition-[box-shadow,border-color] duration-300", scrolled && "border-line shadow-[0_8px_24px_-16px_rgb(29_26_46/0.25)]")}>
      <div className="container-x flex h-16 items-center justify-between gap-3 lg:h-18">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center lg:flex" onMouseEnter={() => void import("./MegaMenu")} onMouseLeave={() => setMegaOpen(false)}>
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about/" className={navLinkClass}>
            About Us
          </NavLink>
          <div className="relative" onMouseEnter={() => setMegaOpen(true)}>
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls="services-mega-menu"
              onClick={() => setMegaOpen((o) => !o)}
              className={cn(navLinkClass({ isActive: servicesActive }), "gap-1")}
            >
              {servicesNav.label}
              <ChevronDown className={cn("size-4 transition-transform", megaOpen && "rotate-180")} aria-hidden="true" />
            </button>
            <Suspense fallback={null}>
              <MegaMenu open={megaOpen} onNavigate={closeMega} />
            </Suspense>
          </div>
          {primaryNav.slice(2).map((l) => (
            <NavLink key={l.href} to={l.href} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex lg:h-11 lg:px-6 lg:text-sm">
            <Link to={ctaLink.href}>{ctaLink.label}</Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="sm:hidden" aria-label={`Call ${site.phones[0].display}`}>
            <a href={`tel:${site.phones[0].tel}`}>
              <Phone />
            </a>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent title="Site navigation">
              <div className="border-b border-line px-5 py-4">
                <Logo priority={false} />
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="divide-y divide-line">
                  {primaryNav.slice(0, 2).map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <Link to={l.href} className="block py-3.5 font-medium text-indigo-900">
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  <li>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="services" className="border-b-0">
                        <AccordionTrigger className="py-3.5 font-medium">Our Services</AccordionTrigger>
                        <AccordionContent className="pr-0">
                          <SheetClose asChild>
                            <Link to="/services/" className="mb-1 block rounded-md px-3 py-2 text-sm font-semibold text-copper-800">
                              All services overview
                            </Link>
                          </SheetClose>
                          <Accordion type="multiple" className="rounded-lg border border-line bg-white px-3">
                            {services.map((s) => (
                              <AccordionItem key={s.slug} value={s.slug}>
                                <AccordionTrigger className="py-3 text-[15px]">{s.name}</AccordionTrigger>
                                <AccordionContent className="pr-0">
                                  <SheetClose asChild>
                                    <Link to={s.path} className="block py-1.5 text-sm font-semibold text-indigo-900">
                                      {s.name} overview →
                                    </Link>
                                  </SheetClose>
                                  {s.groups.map((g) => (
                                    <div key={g.id} className="mt-2">
                                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-800">{g.title}</p>
                                      <ul className="mt-1 columns-2 gap-x-4">
                                        {g.treatments.map((t) => (
                                          <li key={t.id} className="break-inside-avoid">
                                            <SheetClose asChild>
                                              <Link to={`${s.path}#${t.id}`} className="block py-1 text-[13px] leading-snug text-ink-muted">
                                                {t.name}
                                              </Link>
                                            </SheetClose>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </li>
                  {primaryNav.slice(2).map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <Link to={l.href} className="block py-3.5 font-medium text-indigo-900">
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  <li>
                    <SheetClose asChild>
                      <Link to="/feedback/" className="block py-3.5 font-medium text-indigo-900">
                        Patient Feedback
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </nav>
              <div className="space-y-3 border-t border-line px-5 py-4">
                <SheetClose asChild>
                  <Button asChild variant="accent" className="w-full">
                    <Link to={ctaLink.href}>{ctaLink.label}</Link>
                  </Button>
                </SheetClose>
                <a href={`tel:${site.phones[0].tel}`} className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-900">
                  <Phone className="size-4" aria-hidden="true" /> {site.phones[0].display}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </header>
    </>
  );
}
