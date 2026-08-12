/** Single source of truth for the site's navigation structure. */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
  {
    label: "Helix by ST",
    href: "/helix-by-st/",
    children: [
      { label: "ST Overwatch", href: "/helix-by-st/st-overwatch/" },
      { label: "ST TrueState", href: "/helix-by-st/st-truestate/" },
      { label: "STackNode", href: "/helix-by-st/stacknode/" },
      { label: "STackBot", href: "/helix-by-st/stackbot/" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/",
    children: [
      { label: "IT Solutions", href: "/solutions/" },
      { label: "ST-Infra", href: "/solutions/st-infra/" },
      { label: "ST-Automation", href: "/solutions/st-automation/" },
      { label: "ST-Cloud", href: "/solutions/st-cloud/" },
      { label: "ST-Services", href: "/solutions/st-services/" },
    ],
  },
  { label: "IT Consulting", href: "/it-consulting/" },
  { label: "Success Stories", href: "/success-stories/" },
  { label: "Clients", href: "/clients/" },
  { label: "Partners", href: "/partners/" },
  { label: "Contact Us", href: "/contact/" },
];
