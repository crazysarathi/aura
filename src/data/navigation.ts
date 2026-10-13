import type { NavGroup, NavLink } from "@/types/content";
import { services } from "./services";

/**
 * Header navigation. Mirrors the old site's menu (Home · About Us · Our Services ·
 * Our Team · Our Blog · Contact Us · Book Now) with the services mega-menu generated
 * from the services data so it can never drift from the pages.
 */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Our Team", href: "/doctors/" },
  { label: "Our Blog", href: "/blog/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export const servicesNav: NavGroup = {
  label: "Our Services",
  href: "/services/",
  columns: services.map((s) => ({
    title: s.shortName,
    links: [
      { label: `All ${s.shortName}`, href: s.path },
      ...s.groups.map((g) => ({ label: g.title, href: `${s.path}#${g.id}` })),
    ],
  })),
};

export const ctaLink: NavLink = { label: "Book Now", href: "/consult/" };

export const footerNav = {
  services: services.map((s) => ({ label: s.shortName, href: s.path })),
  links: [
    { label: "About Us", href: "/about/" },
    { label: "Our Services", href: "/services/" },
    { label: "Our Team", href: "/doctors/" },
    { label: "Our Blog", href: "/blog/" },
    { label: "Book a Consultation", href: "/consult/" },
    { label: "Patient Feedback", href: "/feedback/" },
    { label: "Contact Us", href: "/contact-us/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
  ],
};
