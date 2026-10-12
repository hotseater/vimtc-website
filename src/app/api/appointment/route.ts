import { NextResponse } from "next/server";
import { recordSubmission } from "@/lib/supabase";
import { renderSubmission, sendMail } from "@/lib/mailer";
import { EMAIL_RE, clientIp, errorResponse, guard, str } from "@/lib/forms";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const blocked = await guard(req, fd);
    if (blocked) return blocked;

    const name = str(fd, "Name", 200);
    const email = str(fd, "Email_Address", 200);
    if (!name) return NextResponse.json({ ok: false, error: "Required fields are empty." }, { status: 400 });
    if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });

    const fields = {
      Name: name,
      Address: str(fd, "Address", 300),
      City: str(fd, "City", 100),
      "Zip Code": str(fd, "Zip_Code", 20),
      "Email Address": email,
      "Fax Number": str(fd, "Fax_Number", 50),
      "Phone Number": str(fd, "Phone_Number", 50),
      "Preferred Date": str(fd, "Preferred_Date", 40),
      "Preferred Time": str(fd, "Preferred_Time", 40),
      Comment: str(fd, "Comment", 5000),
      "Privacy Notice": str(fd, "Privacy_Notice", 20),
    };

    await sendMail({
      subject: `Victory International Ministry Training College [Set an Appointment Form] – ${name}`,
      html: renderSubmission("Set an Appointment Form", fields),
      replyTo: email,
    });
    await recordSubmission({ form: "Set an Appointment Form", senderName: name, senderEmail: email, fields, attachments: [], ip: clientIp(req), userAgent: req.headers.get("user-agent") });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
