import { LINKS, PROGRAMS } from "./home";

export type SiteLink = { label: string; href: string; note?: string };
export type SiteSection = { title: string; links: SiteLink[] };

/** Every public page on the site, grouped the way the footer groups them. Feeds the Sitemap page and sitemap.xml. */
export const SITE_INDEX: SiteSection[] = [
  { title: "Start here", links: [{ label: "Home", href: "/" }, { label: "About us", href: LINKS.about }, { label: "Contact us", href: LINKS.contact }] },
  {
    title: "Programs",
    links: [{ label: "All programs", href: LINKS.programs }, ...PROGRAMS.map((p) => ({ label: p.name, href: p.href })), { label: "Curriculum", href: LINKS.curriculum }],
  },
  {
    title: "Admissions",
    links: [
      { label: "Admissions", href: LINKS.admissions },
      { label: "Student application", href: "/student-application" },
      { label: "Apply online", href: LINKS.apply },
      { label: "Class schedules", href: LINKS.schedules },
      { label: "Set an appointment", href: LINKS.appointment },
    ],
  },
  {
    title: "College",
    links: [
      { label: "Meet our faculty", href: LINKS.faculty },
      { label: "Accreditation", href: LINKS.accreditation },
      { label: "Campus events", href: LINKS.events },
      { label: "Gallery", href: LINKS.gallery },
      { label: "Tuition payment and giving", href: LINKS.donate },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Notice", href: LINKS.privacy },
      { label: "Do Not Sell/Share My Personal Information", href: LINKS.doNotSell },
      { label: "Racial Discrimination Policy", href: LINKS.discrimination },
      { label: "Sitemap", href: LINKS.sitemap },
    ],
  },
];
