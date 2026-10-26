import { Resend } from "resend";
import { assertMailEnv } from "@/lib/env";

let cached: Resend | undefined;

function getClient(): Resend {
  assertMailEnv();
  if (!cached) cached = new Resend(process.env.RESEND_API_KEY!);
  return cached;
}

export type Attachment = { filename: string; content: Buffer };

export async function sendMail(opts: { subject: string; html: string; replyTo?: string; attachments?: Attachment[] }) {
  const client = getClient();
  const { error } = await client.emails.send({
    from: process.env.MAIL_FROM!,
    to: [process.env.MAIL_TO!],
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments?.map((a) => ({ filename: a.filename, content: a.content })),
  });
  if (error) throw new Error(`Resend error: ${error.name} — ${error.message}`);
}

/** A plain confirmation to the person who submitted a form. Failures are the caller's to swallow: the college's copy is the one that matters. */
export async function sendConfirmation(opts: { to: string; subject: string; html: string }) {
  const client = getClient();
  const { error } = await client.emails.send({ from: process.env.MAIL_FROM!, to: [opts.to], replyTo: process.env.MAIL_TO!, subject: opts.subject, html: opts.html });
  if (error) throw new Error(`Resend error: ${error.name} — ${error.message}`);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Same layout the Proweaver forms produced: a bordered table of label/value rows under the form name,
 * so the client's inbox keeps looking the way it does today.
 */
export function renderSubmission(formName: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v && v.trim() !== "")
    .map(([k, v]) => `<tr><td style="padding:5px 8px;vertical-align:top"><b>${escapeHtml(k)}</b>:</td><td style="padding:5px 8px">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  return `<div style="width:700px;max-width:100%;font-size:13px;color:#333;line-height:20px;margin:0 auto;font-family:Verdana,Arial,sans-serif">
  <div style="border:8px double #c3c3d0;padding:12px">
    <div align="center" style="font-size:22px;font-family:'Times New Roman',Times,serif;color:#051d38">Victory International Ministry Training College</div>
    <div align="center" style="color:#990000;font-style:italic;font-size:18px;margin-bottom:15px">(${escapeHtml(formName)})</div>
    <table width="90%" cellspacing="2" cellpadding="0" align="center">${rows}</table>
    <p style="text-align:center;color:#888;font-size:11px;margin-top:20px">Sent from www.vimtc.org</p>
  </div>
</div>`;
}

/** Confirmation sent to an applicant after the enrollment form is received. */
export function renderApplicationConfirmation(firstName: string, programs: string) {
  const name = escapeHtml(firstName || "there");
  const which = programs ? ` for the <b>${escapeHtml(programs)}</b> program${programs.includes(",") ? "s" : ""}` : "";
  return `<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1f232b">
  <p style="font-size:20px;font-weight:bold;margin:0 0 16px">Thank you, ${name}. We have your application.</p>
  <p>Your application${which} to Victory International Ministry Training College has been received by the Office of Admission and Records.</p>
  <p>What happens next:</p>
  <ol>
    <li>Admissions reviews your application and the documents listed on the Student Application page (application fee, two passport photos, statement of faith, statement of purpose, pastoral recommendation and high-school transcript).</li>
    <li>If anything is missing, we email you at this address.</li>
    <li>On acceptance you receive registration details and orientation dates for the coming semester.</li>
  </ol>
  <p>Questions? Reply to this email or call <a href="tel:18444437500">1-844-443-7500</a>.</p>
  <p style="color:#6e7482;font-size:13px;margin-top:24px">Victory International Ministry Training College · 7702 N 35th Avenue, Suite 2, Phoenix, AZ 85340 · www.vimtc.org</p>
</div>`;
}
