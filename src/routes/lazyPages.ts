import { lazy } from "react";

/**
 * Route-level code splitting: each page is its own chunk, loaded on first visit.
 */
export const HomePage = lazy(() => import("@/pages/HomePage"));
export const AboutPage = lazy(() => import("@/pages/AboutPage"));
export const ServicesIndexPage = lazy(() => import("@/pages/ServicesIndexPage"));
export const ServicePage = lazy(() => import("@/pages/ServicePage"));
export const DoctorsPage = lazy(() => import("@/pages/DoctorsPage"));
export const DoctorPage = lazy(() => import("@/pages/DoctorPage"));
export const BlogPage = lazy(() => import("@/pages/BlogPage"));
export const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
export const ConsultPage = lazy(() => import("@/pages/ConsultPage"));
export const ContactPage = lazy(() => import("@/pages/ContactPage"));
export const FeedbackPage = lazy(() => import("@/pages/FeedbackPage"));
export const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
export const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
