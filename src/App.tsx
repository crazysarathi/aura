import { Route, Routes } from "react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LegacyRedirect } from "@/routes/LegacyRedirect";
import {
  AboutPage,
  BlogPage,
  BlogPostPage,
  ConsultPage,
  ContactPage,
  DoctorPage,
  DoctorsPage,
  FeedbackPage,
  HomePage,
  PrivacyPage,
  ServicePage,
  ServicesIndexPage,
} from "@/routes/lazyPages";
import { services } from "@/data/services";

/**
 * Root component: the full route tree. Every page renders inside SiteLayout
 * (header, footer, floating actions). The HashRouter is supplied by main.tsx.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />

        <Route path="services" element={<ServicesIndexPage />} />
        {/* Service categories keep their original top-level WordPress URLs. */}
        {services.map((s) => (
          <Route key={s.slug} path={s.slug} element={<ServicePage slug={s.slug} />} />
        ))}

        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="doctors/:slug" element={<DoctorPage />} />

        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />

        <Route path="consult" element={<ConsultPage />} />
        <Route path="contact-us" element={<ContactPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />

        <Route path="*" element={<LegacyRedirect />} />
      </Route>
    </Routes>
  );
}
