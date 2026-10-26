import { NextResponse } from "next/server";
import { recordSubmission } from "@/lib/supabase";
import { renderApplicationConfirmation, renderSubmission, sendConfirmation, sendMail, type Attachment } from "@/lib/mailer";
import { EMAIL_RE, all, clientIp, errorResponse, guard, str } from "@/lib/forms";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const blocked = await guard(req, fd);
    if (blocked) return blocked;

    const first = str(fd, "First_Name", 100);
    const last = str(fd, "Last_Name", 100);
    const email = str(fd, "Student_Email", 200);
    if (!first || !last) return NextResponse.json({ ok: false, error: "Required fields are empty." }, { status: 400 });
    if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });

    const signature = str(fd, "Students_Signature", 400_000);
    if (!signature.startsWith("data:image/png;base64,")) return NextResponse.json({ ok: false, error: "Signature is required." }, { status: 400 });
    const attachments: Attachment[] = [{ filename: `Students_Signature_${Date.now()}.png`, content: Buffer.from(signature.slice("data:image/png;base64,".length), "base64") }];

    const fields = {
      "First Name": first,
      "Last Name": last,
      "Street Address": str(fd, "Street_Address", 300),
      City: str(fd, "City", 100),
      State: str(fd, "State", 10),
      "Zip Code": str(fd, "Zip_Code", 20),
      Birthdate: str(fd, "Birthdate", 40),
      Status: str(fd, "Status", 20),
      Gender: str(fd, "Gender", 20),
      "Student Phone Number": str(fd, "Student_Phone_Number", 50),
      "Student Email": email,
      "Application Fee": str(fd, "Application_Fee", 40),
      "I am Applying For": all(fd, "I_am_Applying_For"),
      "Preferred Learning Setup": str(fd, "Preferred_Learning_Setup", 20),
      "What is Your Highest Level of Education": str(fd, "Highest_Level_of_Education", 40),
      "Students Signature": "(attached as PNG)",
      Date: str(fd, "Date", 40),
      "Privacy Notice": str(fd, "Privacy_Notice", 20),
    };

    await sendMail({
      subject: `Victory International Ministry Training College [Apply Now Form] – ${first} ${last}`,
      html: renderSubmission("Apply Now Form", fields),
      replyTo: email,
      attachments,
    });
    // confirmation to the applicant; a failure here must not fail the application
    try {
      await sendConfirmation({ to: email, subject: "We have your application – Victory International Ministry Training College", html: renderApplicationConfirmation(first, fields["I am Applying For"]) });
    } catch (e) {
      console.error("applicant confirmation failed:", e);
    }
    await recordSubmission({ form: "Apply Now Form", senderName: `${first} ${last}`, senderEmail: email, fields, attachments: attachments.map((a) => a.filename), ip: clientIp(req), userAgent: req.headers.get("user-agent") });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
