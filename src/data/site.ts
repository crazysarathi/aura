/**
 * Verified clinic facts. Every value here was read from https://aura.sks.clinic/
 * on 13 Oct 2026 (footer, contact page, WhatsApp widget config). Update here only.
 */
export const site = {
  name: "Aura Cosmetique",
  legalName: "Aura Cosmetique by SKS",
  tagline: "The Premier Destination for Skin, Hair and Aesthetic Wellness",
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://aura.sks.clinic",
  description:
    "Aura Cosmetique by SKS Hospital is a premier dermatology, cosmetology and aesthetic clinic in Salem, Tamil Nadu, offering cosmetic dermatology, hair transplantation, cosmetic gynecology, cosmetic dentistry and aesthetic surgery.",
  parent: "SKS Hospital",
  address: {
    street: "Ground Floor, Sri Varanya Towers, Brindavan Rd",
    locality: "Salem",
    region: "Tamil Nadu",
    postalCode: "636004",
    country: "IN",
    full: "Ground Floor, Sri Varanya Towers, Brindavan Rd, Salem, Tamil Nadu – 636004",
  },
  phones: [
    { display: "+91 93847 48884", tel: "+919384748884" },
    { display: "0427 403 3577", tel: "+914274033577" },
  ],
  whatsapp: { number: "919384748884", href: "https://wa.me/919384748884" },
  email: "aura@sksh.ac.in",
  hours: [
    { days: "Monday – Friday", time: "09:00 AM – 08:00 PM" },
    { days: "Saturday", time: "09:00 AM – 08:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/auracosmetique/" },
    { label: "Twitter", href: "https://twitter.com/auracosmetique" },
    { label: "Instagram", href: "https://www.instagram.com/auracosmetiquebysks/" },
  ],
  map: {
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3553973040453!2d78.1434846!3d11.6692057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf16645408779%3A0xfc9a2ad1d875a0d3!2sAura%20Cosmetique%20by%20SKS!5e0!3m2!1sen!2sin!4v1697439115176!5m2!1sen!2sin",
    link: "https://www.google.com/maps/search/?api=1&query=Aura%20Cosmetique%20by%20SKS%2C%20Brindavan%20Rd%2C%20Salem",
    geo: { lat: 11.6692057, lng: 78.1434846 },
  },
  credit: { label: "The Art Brew", href: "https://theartbrew.co" },
  /** Shown on the old home page beside the NABH badge. Reproduced as stated by the clinic. */
  accreditation: "South India's first NABH accredited center for cosmetic care.",
} as const;

export const aboutCopy = {
  intro:
    "SKS Hospital—the precursor of Multi-speciality hospitals in Salem, brings to you Aura Cosmetique, a premier dermatology and cosmetology destination that offers cutting-edge solutions for all your cosmetic, dermatological and aesthetic needs.",
  body:
    "Our commitment to excellence is exemplified by our exceptional team of expert doctors and professionals who have a profound understanding of the art and science of beauty and healthcare. It is our holistic approach to treatment that sets us apart as the leading skin clinic in Salem. In close collaboration with SKS Hospital, we extend our services to provide comprehensive medical diagnoses for underlying health issues, apart from offering aesthetic treatments.",
  servicesIntro:
    "Aura Cosmetique offers a wide range of specialized services to cater to your dermatological, gynecological, and dental needs. Our multidisciplinary approach ensures that you receive the best expert care possible, all under one roof.",
  whyUs:
    "The calming ambience at Aura Cosmetique is designed to put the patients at ease, reaffirming that they are in safe hands. We are equipped with state-of-the-art apparatus to provide the most advanced and effective treatments available. Our highly-trained dermatologists and medical staff are skilled to assist you towards your well-being in a holistic sense. The perfect blend of ambience, cutting-edge apparatus and expert assistance at Aura Cosmetique transforms your skin and boosts your confidence.",
  heroSlides: [
    { heading: "The Premier Destination for Skin, Hair and Aesthetic Wellness", image: "hero/hero-skin-wellness", alt: "Woman with clear, healthy skin resting her hands on her face" },
    { heading: "Cutting-edge solutions for all your cosmetic, dermatological and aesthetic needs.", image: "hero/hero-facial-treatment", alt: "Cosmetologist performing a facial treatment on a patient at a clinic" },
  ],
} as const;
