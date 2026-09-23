/** Single source of truth for the site's navigation structure. */
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

/*
 * Compressed IA: five primary destinations, grouped so "who we are" and
 * "what we sell" are separated. Detail depth lives inside the groups rather
 * than as flat top-level items. A persistent "Book a consultation" CTA sits
 * beside the nav (rendered in Header.astro, not here).
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions/",
    children: [
      {
        label: "IT Solutions",
        href: "/solutions/",
        description: "The full stack, under one roof",
      },
      {
        label: "ST-Infra",
        href: "/solutions/st-infra/",
        description: "Modern infrastructure & platform",
      },
      {
        label: "ST-Automation",
        href: "/solutions/st-automation/",
        description: "Eliminate manual operational toil",
      },
      {
        label: "ST-Cloud",
        href: "/solutions/st-cloud/",
        description: "Hybrid & multi-cloud, with control",
      },
      {
        label: "ST-Services",
        href: "/solutions/st-services/",
        description: "Managed support & maintenance",
      },
      {
        label: "IT Consulting",
        href: "/it-consulting/",
        description: "Strategy, architecture & planning",
      },
    ],
  },
  {
    label: "Helix by ST",
    href: "/helix-by-st/",
    children: [
      {
        label: "Helix Platform",
        href: "/helix-by-st/",
        description: "Intelligence woven into infrastructure",
      },
      {
        label: "ST Overwatch",
        href: "/helix-by-st/st-overwatch/",
        description: "Monitoring & integration",
      },
      {
        label: "ST TrueState",
        href: "/helix-by-st/st-truestate/",
        description: "Configuration drift management",
      },
      {
        label: "STackNode",
        href: "/helix-by-st/stacknode/",
        description: "Virtualisation platform",
      },
      {
        label: "STackBot",
        href: "/helix-by-st/stackbot/",
        description: "Automation as a service",
      },
    ],
  },
  {
    label: "Company",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Clients", href: "/clients/" },
      { label: "Partners", href: "/partners/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
  {
    label: "Work",
    href: "/success-stories/",
    children: [
      { label: "Success Stories", href: "/success-stories/" },
      { label: "Our Clients", href: "/clients/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];
