"use client";

import Honeypot from "./Honeypot";
import Turnstile from "./Turnstile";
import Consent from "./Consent";
import { StatusMessage, useFormSubmit } from "./useFormSubmit";

/** Contact Us page form (was forms/views/templates/ApplicationForm.php, loaded in an iframe). */
export default function ContactForm() {
  const { status, onSubmit, busy } = useFormSubmit("/api/contact", "Thank you! Your message has been sent. We will be in touch with you soon.");
  return (
    <form className="vimtc-form" onSubmit={onSubmit} encType="multipart/form-data">
      <input type="hidden" name="form" value="Contact Us Form" />
      <Honeypot />
      <div className="form_row">
        <div>
          <label htmlFor="c-first">First Name <span className="req">*</span></label>
          <input id="c-first" type="text" name="First_Name" placeholder="First Name" required autoComplete="given-name" />
        </div>
        <div>
          <label htmlFor="c-last">Last Name <span className="req">*</span></label>
          <input id="c-last" type="text" name="Last_Name" placeholder="Last Name" required autoComplete="family-name" />
        </div>
      </div>
      <div className="form_row">
        <div>
          <label htmlFor="c-email">Email Address <span className="req">*</span></label>
          <input id="c-email" type="email" name="Email_Address" placeholder="example@domain.com" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="c-phone">Phone Number</label>
          <input id="c-phone" type="tel" name="Phone_Number" placeholder="Enter phone number here" autoComplete="tel" />
        </div>
      </div>
      <div className="form_row">
        <div>
          <label htmlFor="c-course">Course Applying For</label>
          <input id="c-course" type="text" name="Course_Applying_For" placeholder="Enter course applying for here" />
        </div>
        <div>
          <label htmlFor="c-file">Attachment</label>
          <input id="c-file" type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        </div>
      </div>
      <div className="form_row single">
        <div>
          <label htmlFor="c-msg">Message</label>
          <textarea id="c-msg" name="Message" placeholder="Enter your message here" />
        </div>
      </div>
      <Consent />
      <Turnstile />
      <button className="btn-style" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Submit"}
      </button>
      <StatusMessage status={status} />
    </form>
  );
}
