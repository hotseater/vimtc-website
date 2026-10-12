import { NextResponse } from "next/server";
import { recordSubmission } from "@/lib/supabase";
import { renderSubmission, sendMail, type Attachment } from "@/lib/mailer";
import { EMAIL_RE, clientIp, errorResponse, guard, str } from "@/lib/forms";

const MAX_ATTACHMENT = 8 * 1024 * 1024;
const ALLOWED = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"]);

/** Handles both the home-page "Send Us a Message" form and the Contact Us page form. */
export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const blocked = await guard(req, fd);
    if (blocked) return blocked;

    const formName = str(fd, "form", 80) === "Contact Us Form" ? "Contact Us Form" : "Send Us a Message Form";
    const email = str(fd, "Email_Address", 200);
    if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });

    let fields: Record<string, string>;
    let name: string;
    if (formName === "Contact Us Form") {
      const first = str(fd, "First_Name", 100);
      const last = str(fd, "Last_Name", 100);
      if (!first || !last) return NextResponse.json({ ok: false, error: "Required fields are empty." }, { status: 400 });
      name = `${first} ${last}`;
      fields = {
        "First Name": first,
        "Last Name": last,
        "Email Address": email,
        "Phone Number": str(fd, "Phone_Number", 50),
        "Course Applying For": str(fd, "Course_Applying_For", 200),
        Message: str(fd, "Message", 5000),
        "Privacy Notice": str(fd, "Privacy_Notice", 20),
      };
    } else {
      name = str(fd, "Full_Name", 200);
      if (!name) return NextResponse.json({ ok: false, error: "Required fields are empty." }, { status: 400 });
      fields = {
        "Full Name": name,
        "Email Address": email,
        "Question or Comment": str(fd, "Question_or_Comment", 5000),
        "Privacy Notice": str(fd, "Privacy_Notice", 20),
      };
    }

    const attachments: Attachment[] = [];
    const file = fd.get("attachment");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_ATTACHMENT) return NextResponse.json({ ok: false, error: "Attachment is too large (8 MB max)." }, { status: 400 });
      if (!ALLOWED.has(file.type)) return NextResponse.json({ ok: false, error: "Attachment must be a PDF, Word document, JPG or PNG." }, { status: 400 });
      attachments.push({ filename: file.name.replace(/[^\w.\-]+/g, "_").slice(0, 120), content: Buffer.from(await file.arrayBuffer()) });
      fields.Attachment = file.name;
    }

    await sendMail({
      subject: `Victory International Ministry Training College [${formName}] – ${name}`,
      html: renderSubmission(formName, fields),
      replyTo: email,
      attachments,
    });
    await recordSubmission({ form: formName, senderName: name, senderEmail: email, fields, attachments: attachments.map((a) => a.filename), ip: clientIp(req), userAgent: req.headers.get("user-agent") });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
