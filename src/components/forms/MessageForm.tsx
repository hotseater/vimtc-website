"use client";

import Honeypot from "./Honeypot";
import Turnstile from "./Turnstile";
import Consent from "./Consent";
import { StatusMessage, useFormSubmit } from "./useFormSubmit";

/** Home-page "Send Us a Message" form (was includes/bottom.php). */
export default function MessageForm() {
  const { status, onSubmit, busy } = useFormSubmit("/api/contact", "Thank you for sending us a message! We will be in touch with you soon.");
  return (
    <div className="btm3_form_parent">
      <form id="submit_formmessage" onSubmit={onSubmit} noValidate={false}>
        <input type="hidden" name="form" value="Send Us a Message Form" />
        <Honeypot />
        <input type="text" className="form_fullname" name="Full_Name" placeholder="*Full Name" aria-label="Full Name" required />
        <input type="email" className="form_email" name="Email_Address" placeholder="*Email Address" aria-label="Email Address" required />
        <textarea name="Question_or_Comment" placeholder="Message(s)" aria-label="Message" />
        <div className="form_bottom">
          <div className="disclaimer">
            <Consent light />
          </div>
          <div className="button_flex">
            <Turnstile />
            <button className="form_btn btn-style" type="submit" disabled={busy}>
              {busy ? "Sending…" : "Submit"}
            </button>
          </div>
        </div>
        <StatusMessage status={status} />
      </form>
    </div>
  );
}
