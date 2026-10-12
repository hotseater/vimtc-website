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
