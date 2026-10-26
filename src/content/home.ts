/**
 * Content for the redesigned home page. Everything here is taken from the college's own
 * pages and widgets (content/pages, content/widgets.json). Nothing is invented: facts the
 * college has not supplied (intake dates, alumni stories, event dates) are simply absent
 * and the sections that need them render without them.
 */

export const LINKS = {
  programs: "/ministry-training-college-programs",
  curriculum: "/ministry-training-college-curriculum",
  admissions: "/ministry-training-college-admissions",
  apply: "/apply",
  about: "/ministry-training-college-about-us",
  faculty: "/ministry-training-college-meet-our-faculty",
  accreditation: "/ministry-training-college-accreditation",
  events: "/ministry-training-college-campus-events",
  gallery: "/ministry-training-college-gallery",
  schedules: "/ministry-training-college-class-schedules",
  appointment: "/ministry-training-college-set-an-appointment",
  contact: "/ministry-training-college-contact-us",
  donate: "/ministry-training-college-donate",
  privacy: "/privacy-notice",
  doNotSell: "/victory-international-ministry-training-college-do-not-sell-or-share-my-personal-information",
  discrimination: "/ministry-training-college-racial-discrimination-policy",
  sitemap: "/sitemap",
} as const;

export type Level = 1 | 2 | 3 | 4;
export const LEVEL_NAMES: Record<Level, string> = { 1: "Certificate", 2: "Diploma", 3: "Associate", 4: "Bachelor" };

export type Program = {
  name: string;
  level: Level;
  href: string;
  image: string;
  /** One line from the program's own page, when it has one. */
  blurb?: string;
};

export const PROGRAMS: Program[] = [
  {
    name: "Certificate in Discipleship",
    level: 1,
    href: `${LINKS.programs}/certificate-in-discipleship`,
    image: "/images/uploads/2024/11/WhatsApp-Image-2024-11-21-at-12.21.05-PM.jpeg",
    blurb: "Biblical foundations, spiritual formation, leadership development and practical ministry skills.",
  },
  {
    name: "Diploma in Biblical Studies",
    level: 2,
    href: `${LINKS.programs}/diploma-in-biblical-studies`,
    image: "/images/uploads/2024/11/diploma.jpeg",
    blurb: "Gain a solid foundation in biblical principles and more.",
  },
  {
    name: "Associate Degree in Ministry",
    level: 3,
    href: `${LINKS.programs}/associate-degree-in-ministry`,
    image: "/images/uploads/2024/11/Associate.jpg",
    blurb: "Biblical studies, ministry skills, spiritual formation and field education.",
  },
  {
    name: "Bachelor of Arts in Ministerial Studies",
    level: 4,
    href: `${LINKS.programs}/bachelor-of-arts-in-ministerial-studies`,
    image: "/images/theme/thumbnails/4.jpg",
    blurb: "Theological depth and hands-on training for church and community leadership.",
  },
  { name: "Bachelor of Arts in Theological & Bible Studies", level: 4, href: LINKS.programs, image: "/images/uploads/2024/02/nh-13.jpg" },
  { name: "Bachelor of Arts in Christian/Pastoral Counseling", level: 4, href: LINKS.programs, image: "/images/uploads/2024/02/nh-14.jpg" },
  { name: "Bachelor of Arts in Religious & Christian Education", level: 4, href: LINKS.programs, image: "/images/uploads/2024/02/nh-3.jpg" },
  { name: "Bachelor of Missions & Inter-Cultural Studies", level: 4, href: LINKS.programs, image: "/images/uploads/2025/08/ministry-training-college.jpg" },
];

export const WHY = [
  { title: "Faith-centered education", text: "A supportive environment where faith and learning intersect, fostering a holistic approach to education." },
  { title: "Experienced faculty", text: "Seasoned scholars, experienced pastors and ministry practitioners who are mentors invested in your success." },
  { title: "Diverse programs", text: "Programs tailored to students from many backgrounds and ministry aspirations, from a certificate to a bachelor degree." },
  { title: "Community", text: "A close-knit community of believers who walk alongside you, encourage you and challenge you to grow." },
  {
    title: "Honest accreditation",
    text: "Accredited through the Transworld Accrediting Commission as a religious-exempt institution. We say plainly what that means and what it does not.",
  },
];

export const LEADERSHIP = [
  { name: "Bishop Dr. Phillips Banini Sr.", role: "President" },
  { name: "Apostle Dr. P. Ray Johnson", role: "President & Chancellor, Emeritus" },
  { name: "Mama Joycelyn Johnson", role: "Co-Founder" },
];
