/**
 * Class schedules. Fill this in with what the college sends each intake.
 *
 *   intake   – the current intake's name ("Fall 2026") or null while unannounced
 *   starts   – first day of classes, ISO date ("2026-09-14"), optional
 *   note     – one line shown under the heading, optional
 *   sessions – one row per recurring class meeting:
 *     program  – the program or level name ("Certificate in Discipleship")
 *     day      – "Saturday", "Tuesday and Thursday", …
 *     time     – "12:00–2:00 pm" (college local time, America/Phoenix)
 *     format   – "campus" | "online" | "both"
 *     where    – "Zoom", "Room 2", … optional
 *     note     – optional ("Orientation on the first Saturday")
 *   dates    – key dates for the term, optional: [{ label: "Registration", date: "2026-09-05" }, …]
 */
export type Session = { program: string; day: string; time: string; format: "campus" | "online" | "both"; where?: string; note?: string };
export type KeyDate = { label: string; date: string };

export const SCHEDULE: { intake: string | null; starts?: string; note?: string; sessions: Session[]; dates: KeyDate[] } = {
  intake: null,
  sessions: [
    // Example rows (remove when real ones arrive):
    // { program: "Certificate in Discipleship", day: "Saturday", time: "9:00–11:00 am", format: "both", where: "Campus and Zoom" },
    // { program: "Bachelor of Arts in Marriage & Family Counseling", day: "Saturday", time: "12:00 pm", format: "online", where: "Zoom" },
  ],
  dates: [],
};

export const FORMAT_LABEL: Record<Session["format"], string> = { campus: "On campus", online: "Online", both: "Campus or online" };

export const fmtDate = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
