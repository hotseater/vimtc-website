"use client";

import Honeypot from "@/components/forms/Honeypot";
import Turnstile from "@/components/forms/Turnstile";
import Consent from "@/components/forms/Consent";
import { StatusMessage, useFormSubmit } from "@/components/forms/useFormSubmit";

/** Two fields. Posts to the same route as the old "Send Us a Message" form so it lands in the same inbox and Supabase table. */
export default function RequestInfoForm() {
  const { status, onSubmit, busy } = useFormSubmit("/api/contact", "Thank you. We will reply within two working days.");
  return (
    <form className="nh-form" onSubmit={onSubmit}>
      <input type="hidden" name="form" value="Send Us a Message Form" />
      <input type="hidden" name="Question_or_Comment" value="Request for information (home page)" />
      <Honeypot />
      <label>
        Your name
        <input className="nh-input" type="text" name="Full_Name" placeholder="Full name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input className="nh-input" type="email" name="Email_Address" placeholder="you@example.com" autoComplete="email" required />
      </label>
      <div className="nh-form-consent">
        <Consent light />
      </div>
      <Turnstile />
      <button type="submit" className="nh-btn nh-btn-gold" disabled={busy}>
        {busy ? "Sending…" : "Request information"}
      </button>
      <StatusMessage status={status} />
    </form>
  );
}
