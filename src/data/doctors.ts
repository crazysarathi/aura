import type { Doctor } from "@/types/content";

/** Team as listed in the "Our Team" section of https://aura.sks.clinic/ (names, degrees and titles verbatim). */
export const doctors: Doctor[] = [
  {
    id: "priyadharshini-k",
    slug: "dr-priyadharshini-k",
    name: "Dr. Priyadharshini K",
    qualifications: "MBBS., MD Dermatology",
    designation: "Consultant Dermatologist and Cosmetologist",
    image: { key: "doctors/dr-priyadharshini-k", alt: "Dr. Priyadharshini K, Consultant Dermatologist and Cosmetologist at Aura Cosmetique" },
    specialties: ["cosmetic-dermatology", "hair-transplantation"],
  },
  {
    id: "harish-prasanna",
    slug: "dr-harish-prasanna",
    name: "Dr. Harish Prasanna",
    qualifications: "MBBS, MD, DVL",
    designation: "Consultant Dermatologist, Cosmetologist & Dermatosurgeon",
    image: { key: "doctors/dr-harish-prasanna", alt: "Dr. Harish Prasanna, Consultant Dermatologist, Cosmetologist and Dermatosurgeon at Aura Cosmetique" },
    specialties: ["cosmetic-dermatology", "hair-transplantation"],
  },
  {
    id: "kavitha",
    slug: "dr-kavitha",
    name: "Dr. Kavitha",
    qualifications: "MD., MRCOG., MICG",
    designation: "Consultant Cosmetic Gynecologist",
    image: { key: "doctors/dr-kavitha", alt: "Dr. Kavitha, Consultant Cosmetic Gynecologist at Aura Cosmetique" },
    specialties: ["cosmetic-gynecology"],
  },
  {
    id: "senthil-kumaran-m",
    slug: "dr-senthil-kumaran-m",
    name: "Dr. Senthil Kumaran M",
    qualifications: "MS., M.Ch (Plastic Surgery)",
    designation: "Consultant Plastic Reconstructive & Cosmetic Surgery",
    image: { key: "doctors/dr-senthil-kumaran-m", alt: "Dr. Senthil Kumaran M, Consultant Plastic Reconstructive and Cosmetic Surgeon at Aura Cosmetique" },
    specialties: ["aesthetic-surgery"],
  },
  {
    id: "nagappan-ar",
    slug: "dr-nagappan-ar",
    name: "Dr. Nagappan AR",
    qualifications: "MDS., IFFID",
    designation: "Consultant Maxillofacial Surgeon & Implantologist",
    image: { key: "doctors/dr-nagappan-ar", alt: "Dr. Nagappan AR, Consultant Maxillofacial Surgeon and Implantologist at Aura Cosmetique" },
    specialties: ["cosmetic-dentistry"],
  },
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);

/**
 * Doctor options exactly as they appear in the old WPForms feedback form (id 5505).
 * Kept unchanged so submissions stay comparable; the clinic should confirm this list.
 */
export const feedbackDoctorOptions = [
  "Dr. K. Priyadharshini",
  "Dr. M. Preethi",
  "Dr. Kavitha Nagarajan",
  "Dr. M. Senthil Kumaran",
  "Dr. Nagappan A R",
] as const;
