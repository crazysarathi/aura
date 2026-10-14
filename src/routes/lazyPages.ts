import { lazy } from "react";

/**
 * Route-level code splitting: each page is its own chunk, loaded on first visit.
 * preloadPages() fetches them all ahead of time so later navigations never wait on the network.
 */
const loaders = {
  HomePage: () => import("@/pages/HomePage"),
  AboutPage: () => import("@/pages/AboutPage"),
  ServicesIndexPage: () => import("@/pages/ServicesIndexPage"),
  ServicePage: () => import("@/pages/ServicePage"),
  DoctorsPage: () => import("@/pages/DoctorsPage"),
  DoctorPage: () => import("@/pages/DoctorPage"),
  BlogPage: () => import("@/pages/BlogPage"),
  BlogPostPage: () => import("@/pages/BlogPostPage"),
  ConsultPage: () => import("@/pages/ConsultPage"),
  ContactPage: () => import("@/pages/ContactPage"),
  FeedbackPage: () => import("@/pages/FeedbackPage"),
  PrivacyPage: () => import("@/pages/PrivacyPage"),
  NotFoundPage: () => import("@/pages/NotFoundPage"),
};

export const HomePage = lazy(loaders.HomePage);
export const AboutPage = lazy(loaders.AboutPage);
export const ServicesIndexPage = lazy(loaders.ServicesIndexPage);
export const ServicePage = lazy(loaders.ServicePage);
export const DoctorsPage = lazy(loaders.DoctorsPage);
export const DoctorPage = lazy(loaders.DoctorPage);
export const BlogPage = lazy(loaders.BlogPage);
export const BlogPostPage = lazy(loaders.BlogPostPage);
export const ConsultPage = lazy(loaders.ConsultPage);
export const ContactPage = lazy(loaders.ContactPage);
export const FeedbackPage = lazy(loaders.FeedbackPage);
export const PrivacyPage = lazy(loaders.PrivacyPage);
export const NotFoundPage = lazy(loaders.NotFoundPage);

/** Warm every page chunk. Failures are ignored: the page simply loads on demand instead. */
export function preloadPages() {
  Object.values(loaders).forEach((load) => load().catch(() => {}));
}
