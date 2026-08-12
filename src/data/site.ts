/** Single source of truth for site identity + production origin (canonical URLs). */
export const SITE = {
  name: "Systemizer Technic",
  legalName: "Systemizer Technic Sdn Bhd",
  registrationNo: "200801005926",
  /** Production origin — canonical URLs, OG URLs, and sitemap derive from this. */
  origin: "https://systemizerinc.com",
  email: "hello@systemizerinc.com",
  phone: "+603-5612 0032",
  phoneIntl: "+60356120032",
  address: {
    street:
      "Suite 12-01 & 12-02, Level 12, Southern Tower, First Subang, Jalan SS15/4G",
    locality: "Subang Jaya",
    region: "Selangor",
    postalCode: "47500",
    country: "MY",
  },
  social: {
    facebook: "https://www.facebook.com/SystemizerTechnic",
    linkedin: "https://www.linkedin.com/company/systemizer-technic-sdn-bhd",
    youtube: "https://www.youtube.com/@systemizer.technic",
  },
  /** Default OG image fallback — PLACEHOLDER (live-site logo SVG), final branded OG asset is Phase 10. */
  defaultOgImage: "/og-default.svg",
} as const;
