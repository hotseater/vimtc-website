"use client";

import Honeypot from "./Honeypot";
import Turnstile from "./Turnstile";
import Consent from "./Consent";
import { StatusMessage, useFormSubmit } from "./useFormSubmit";

/** Set an Appointment form (was forms/views/templates/appointmentForm.php). */
export default function AppointmentForm() {
  const { status, onSubmit, busy } = useFormSubmit("/api/appointment", "Thank you! Your appointment request has been sent. We will confirm with you soon.");
  return (
    <form className="vimtc-form" onSubmit={onSubmit}>
      <input type="hidden" name="form" value="Set an Appointment Form" />
      <Honeypot />
      <div className="form_row">
        <div>
          <label htmlFor="a-name">Name <span className="req">*</span></label>
          <input id="a-name" type="text" name="Name" placeholder="Enter name here" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="a-email">Email Address <span className="req">*</span></label>
          <input id="a-email" type="email" name="Email_Address" placeholder="example@domain.com" required autoComplete="email" />
        </div>
      </div>
      <div className="form_row">
        <div>
          <label htmlFor="a-address">Address</label>
          <input id="a-address" type="text" name="Address" placeholder="Enter address here" autoComplete="street-address" />
        </div>
        <div>
          <label htmlFor="a-city">City</label>
          <input id="a-city" type="text" name="City" placeholder="Enter city here" autoComplete="address-level2" />
        </div>
      </div>
      <div className="form_row">
        <div>
          <label htmlFor="a-zip">Zip Code</label>
          <input id="a-zip" type="text" name="Zip_Code" placeholder="Enter zip code here" autoComplete="postal-code" />
        </div>
        <div>
          <label htmlFor="a-phone">Phone Number</label>
          <input id="a-phone" type="tel" name="Phone_Number" placeholder="Enter phone number here" autoComplete="tel" />
        </div>
      </div>
      <div className="form_row">
        <div>
          <label htmlFor="a-fax">Fax Number</label>
          <input id="a-fax" type="tel" name="Fax_Number" placeholder="Enter fax number here" />
        </div>
        <div>
          <label htmlFor="a-date">Preferred Date</label>
          <input id="a-date" type="date" name="Preferred_Date" />
        </div>
      </div>
      <div className="form_row">
        <div>
          <label htmlFor="a-time">Preferred Time</label>
          <input id="a-time" type="time" name="Preferred_Time" />
        </div>
      </div>
      <div className="form_row single">
        <div>
          <label htmlFor="a-comment">Comment</label>
          <textarea id="a-comment" name="Comment" placeholder="Enter comment here" />
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
