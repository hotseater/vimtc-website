"use client";

import Honeypot from "./Honeypot";
import Turnstile from "./Turnstile";
import Consent from "./Consent";
import SignaturePad from "./SignaturePad";
import { StatusMessage, useFormSubmit } from "./useFormSubmit";

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

/** College Enrollment Form (was forms/views/customs/applyNowForm.php). Same fields, same order. */
export default function EnrollmentForm() {
  const { status, onSubmit, busy } = useFormSubmit("/api/apply", "Thank you! Your enrollment form has been submitted. Our admissions office will contact you soon.");
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
  return (
    <form className="vimtc-form" onSubmit={onSubmit}>
      <input type="hidden" name="form" value="Apply Now Form" />
      <Honeypot />
      <p style={{ textAlign: "center" }}>Complete the registration form with attention to detail.</p>

      <fieldset>
        <legend>Full Name</legend>
        <div className="form_row">
          <div>
            <label htmlFor="e-first">First Name <span className="req">*</span></label>
            <input id="e-first" type="text" name="First_Name" placeholder="Enter first name here" required autoComplete="given-name" />
          </div>
          <div>
            <label htmlFor="e-last">Last Name <span className="req">*</span></label>
            <input id="e-last" type="text" name="Last_Name" placeholder="Enter last name here" required autoComplete="family-name" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <div className="form_row">
          <div>
            <label htmlFor="e-street">Street Address <span className="req">*</span></label>
            <input id="e-street" type="text" name="Street_Address" placeholder="Enter street address here" required autoComplete="street-address" />
          </div>
          <div>
            <label htmlFor="e-city">City <span className="req">*</span></label>
            <input id="e-city" type="text" name="City" placeholder="Enter city here" required autoComplete="address-level2" />
          </div>
        </div>
        <div className="form_row">
          <div>
            <label htmlFor="e-state">State</label>
            <select id="e-state" name="State" defaultValue="" autoComplete="address-level1">
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="e-zip">Zip Code <span className="req">*</span></label>
            <input id="e-zip" type="text" name="Zip_Code" placeholder="Enter zip code here" required autoComplete="postal-code" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Personal Information</legend>
        <div className="form_row">
          <div>
            <label htmlFor="e-birth">Birthdate <span className="req">*</span></label>
            <input id="e-birth" type="date" name="Birthdate" required max={new Date().toISOString().slice(0, 10)} autoComplete="bday" />
          </div>
          <div>
            <label>Status</label>
            <div className="choices">
              {["Single", "Married", "Divorced"].map((v) => (
                <label key={v}>
                  <input type="radio" name="Status" value={v} /> {v}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="form_row">
          <div>
            <label>Gender <span className="req">*</span></label>
            <div className="choices">
              {["Male", "Female", "N/A"].map((v) => (
                <label key={v}>
                  <input type="radio" name="Gender" value={v} required /> {v}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="e-phone">Student Phone Number <span className="req">*</span></label>
            <input id="e-phone" type="tel" name="Student_Phone_Number" placeholder="Enter student phone number here" required autoComplete="tel" />
          </div>
        </div>
        <div className="form_row">
          <div>
            <label htmlFor="e-email">Student Email <span className="req">*</span></label>
            <input id="e-email" type="email" name="Student_Email" placeholder="example@domain.com" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="e-fee">$50 Application Fee</label>
            <input id="e-fee" type="text" name="Application_Fee" placeholder="Enter application fee here" inputMode="decimal" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Program</legend>
        <div className="form_row single">
          <div>
            <label>I&apos;m Applying For</label>
            <div className="choices">
              {["Certificate", "Diploma", "Associate", "Bachelors"].map((v) => (
                <label key={v}>
                  <input type="checkbox" name="I_am_Applying_For" value={v} /> {v}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="form_row">
          <div>
            <label>Preferred Learning Setup</label>
            <div className="choices">
              {["Online", "In-Person"].map((v) => (
                <label key={v}>
                  <input type="radio" name="Preferred_Learning_Setup" value={v} /> {v}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>What is Your Highest Level of Education?</label>
            <div className="choices">
              {["High School/GED", "College", "Advance Education"].map((v) => (
                <label key={v}>
                  <input type="radio" name="Highest_Level_of_Education" value={v} /> {v}
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Signature</legend>
        <div className="form_row">
          <div>
            <label>Student&apos;s Signature <span className="req">*</span></label>
            <SignaturePad name="Students_Signature" />
          </div>
          <div>
            <label htmlFor="e-date">Date</label>
            <input id="e-date" type="text" name="Date" value={today} readOnly style={{ background: "#f1f1f1" }} />
          </div>
        </div>
      </fieldset>

      <Consent />
      <Turnstile />
      <button className="btn-style" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Submit"}
      </button>
      <StatusMessage status={status} />
    </form>
  );
}
