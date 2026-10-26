/**
 * Faculty profiles. Fill this in with what the college sends.
 *
 * Each entry:
 *   name        – as it should appear, with titles ("Bishop Dr. Phillips Banini Sr.")
 *   role        – one line ("President", "Lecturer, Biblical Studies")
 *   photo       – path under /public, e.g. "/images/faculty/banini.jpg" (portrait, at least 600×800). Omit until a photo arrives; initials are shown instead.
 *   credentials – degrees and ordinations, optional ("D.Min., Th.D.")
 *   bio         – two to four sentences, optional
 *   teaches     – program names or subjects, optional
 *   email       – optional; shown as a mail link
 *   group       – "leadership" (shown first, larger) or "faculty"
 */
export type FacultyMember = {
  name: string;
  role: string;
  photo?: string;
  credentials?: string;
  bio?: string;
  teaches?: string[];
  email?: string;
  group: "leadership" | "faculty";
};

export const FACULTY: FacultyMember[] = [
  {
    name: "Bishop Dr. Phillips Banini Sr.",
    role: "President · Dean and Vice-Chancellor",
    credentials: "Th.D., D.D.",
    bio: "Leads the college in Phoenix and signs its welcome as Dean and Vice-Chancellor; the Transworld Accrediting Commission lists him in that role. An alumnus of the college who was consecrated a bishop, he also serves on its governance board and supports a school and orphan care in Ghana.",
    email: "dean@vimtc.org",
    group: "leadership",
  },
  {
    name: "Apostle Dr. P. Ray Johnson",
    role: "Founder · President and Chancellor, Emeritus",
    photo: "/images/theme/main-img1.jpg",
    bio: "Founded Victory International Ministries in Ghana in 1992 with his wife, Dr. Joycelyn Johnson, and the training college that grew from it. After more than three decades leading the work, which has trained over 30,000 students in Ghana and beyond, he passed the leadership of VIM Global to Apostle Dr. Charles H. N. Carboo and serves as Founder and Emeritus.",
    group: "leadership",
  },
  {
    name: "Mama Joycelyn Johnson",
    role: "Co-Founder, Emeritus · The First Lady of Victory",
    bio: "Rev. Dr. Mrs. Joycelyn Johnson co-founded Victory International Ministries with her husband and is honoured across the VIM family as its spiritual mother. The college’s brochure names her the First Lady of Victory.",
    group: "leadership",
  },
  // VIM Global international faculty who appear on the college's pages. Confirm with the college which of them teach in Phoenix.
  { name: "Prof. Dr. Kelly Doussey", role: "Registrar (International), VIM Global", photo: "/images/theme/btm1-img2.jpg", group: "faculty" },
  { name: "Prof. James Ofori Tetteh", role: "Academic Dean (International), VIM Global", group: "faculty" },
  // Add one object per Phoenix teacher as the college supplies them, for example
  // { name: "Rev. Jane Doe", role: "Lecturer, Biblical Studies", photo: "/images/faculty/jane-doe.jpg", credentials: "M.Div.", bio: "…", teaches: ["Diploma in Biblical Studies"], group: "faculty" },
];

export const initials = (name: string) =>
  name
    .replace(/\b(Bishop|Dr\.|Apostle|Mama|Rev\.|Pastor|Prof\.|Sr\.|Jr\.)\s*/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
