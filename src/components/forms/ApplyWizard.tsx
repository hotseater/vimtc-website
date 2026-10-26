"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import Arrow from "@/components/site/Arrow";
import Honeypot from "./Honeypot";
import Turnstile from "./Turnstile";
import SignaturePad from "./SignaturePad";
import { LINKS } from "@/content/home";

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Values = Record<string, string | string[]>;

type Step =
  | { id: string; kind: "intro"; title: string; text: string }
  | { id: string; kind: "fields"; title: string; hint?: string; fields: Field[] }
  | { id: string; kind: "choice"; title: string; hint?: string; name: string; options: string[]; multiple?: boolean; required?: boolean }
  | { id: string; kind: "sign"; title: string; hint?: string };

type Field = { name: string; label: string; type?: string; required?: boolean; autoComplete?: string; placeholder?: string; select?: string[]; inputMode?: "decimal" | "tel" | "email"; max?: string };

const today = () => new Date().toISOString().slice(0, 10);

/** The same fields the old enrollment form sent to /api/apply, asked one screen at a time. */
const STEPS: Step[] = [
  { id: "intro", kind: "intro", title: "Let’s get you enrolled.", text: "Twelve short questions, about five minutes. You can go back at any point, and nothing is sent until you sign at the end." },
  { id: "name", kind: "fields", title: "First, what is your name?", fields: [
    { name: "First_Name", label: "First name", required: true, autoComplete: "given-name" },
    { name: "Last_Name", label: "Last name", required: true, autoComplete: "family-name" },
  ] },
  { id: "email", kind: "fields", title: "Where can we email you?", hint: "We send the acceptance letter and registration details here.", fields: [
    { name: "Student_Email", label: "Email address", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com", inputMode: "email" },
  ] },
  { id: "phone", kind: "fields", title: "And a phone number?", fields: [
    { name: "Student_Phone_Number", label: "Phone number", type: "tel", required: true, autoComplete: "tel", inputMode: "tel" },
  ] },
  { id: "address", kind: "fields", title: "Where do you live?", fields: [
    { name: "Street_Address", label: "Street address", required: true, autoComplete: "street-address" },
    { name: "City", label: "City", required: true, autoComplete: "address-level2" },
    { name: "State", label: "State", select: STATES, autoComplete: "address-level1" },
    { name: "Zip_Code", label: "Zip code", required: true, autoComplete: "postal-code" },
  ] },
  { id: "birth", kind: "fields", title: "When were you born?", fields: [{ name: "Birthdate", label: "Birthdate", type: "date", required: true, autoComplete: "bday", max: today() }] },
  { id: "gender", kind: "choice", title: "How should we record your gender?", name: "Gender", options: ["Male", "Female", "N/A"], required: true },
  { id: "status", kind: "choice", title: "What is your marital status?", hint: "Optional.", name: "Status", options: ["Single", "Married", "Divorced"] },
  { id: "program", kind: "choice", title: "Which program are you applying for?", hint: "Choose one or more.", name: "I_am_Applying_For", options: ["Certificate", "Diploma", "Associate", "Bachelors"], multiple: true },
  { id: "setup", kind: "choice", title: "How would you like to study?", name: "Preferred_Learning_Setup", options: ["Online", "In-Person"] },
  { id: "education", kind: "choice", title: "What is your highest level of education?", name: "Highest_Level_of_Education", options: ["High School/GED", "College", "Advance Education"] },
  { id: "fee", kind: "fields", title: "The $50 application fee", hint: "If you have already paid, note the reference here. Otherwise leave it blank and the admissions office will tell you how to pay.", fields: [
    { name: "Application_Fee", label: "Payment reference (optional)", inputMode: "decimal" },
  ] },
  { id: "sign", kind: "sign", title: "Sign to submit your application", hint: "Draw your signature with your finger or mouse, then agree to the privacy notice." },
];

const QUESTIONS = STEPS.length - 1;

export default function ApplyWizard() {
  const [i, setI] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [dir, setDir] = useState<1 | -1>(1);
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const step = STEPS[i];

  useEffect(() => {
    // keep the card's top in view, then focus the first control of the new screen
    const form = formRef.current;
    if (form && form.getBoundingClientRect().top < 0) form.scrollIntoView({ block: "start", behavior: "smooth" });
    const el = panelRef.current?.querySelector<HTMLElement>("input:not([type=hidden]), select, button.nh-choice, canvas");
    el?.focus({ preventScroll: true });
  }, [i]);

  const set = (name: string, v: string | string[]) => setValues((s) => ({ ...s, [name]: v }));

  function validate(): string | null {
    if (step.kind === "fields") {
      for (const f of step.fields) {
        const v = (values[f.name] as string | undefined)?.trim() ?? "";
        if (f.required && !v) return `Please enter your ${f.label.toLowerCase()}.`;
        if (f.type === "email" && v && !EMAIL_RE.test(v)) return "That email address does not look right.";
      }
    }
    if (step.kind === "choice" && step.required) {
      const v = values[step.name];
      if (!v || (Array.isArray(v) && v.length === 0)) return "Please choose one to continue.";
    }
    return null;
  }

  function next() {
    const e = validate();
    if (e) return setError(e);
    setError(null);
    setDir(1);
    setI((n) => Math.min(n + 1, STEPS.length - 1));
  }
  function back() {
    setError(null);
    setDir(-1);
    setI((n) => Math.max(n - 1, 0));
  }

  function onKey(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;
    const t = e.target as HTMLElement;
    if (t.tagName === "TEXTAREA" || t.tagName === "BUTTON" || step.kind === "sign") return;
    e.preventDefault();
    next();
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current!;
    const fd = new FormData(form); // signature, consent, Turnstile token, honeypot
    if (!(fd.get("Students_Signature") as string)?.startsWith("data:image/png")) return setError("Please draw your signature.");
    if (!fd.get("Privacy_Notice")) return setError("Please agree to the privacy notice.");
    fd.set("form", "Apply Now Form");
    fd.set("Date", new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }));
    for (const [k, v] of Object.entries(values)) {
      if (Array.isArray(v)) v.forEach((x) => fd.append(k, x));
      else fd.set(k, v);
    }
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      else {
        setStatus("idle");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("idle");
      setError("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="nh-wizard nh-wizard-done">
        <span className="nh-disc" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2>Application received.</h2>
        <p className="nh-soft">Thank you, {values.First_Name as string}. Our admissions office will contact you at {values.Student_Email as string} with the next steps.</p>
        <div className="nh-actions">
          <Link href={LINKS.programs} className="nh-btn nh-btn-line">
            Browse the programs
          </Link>
          <Link href="/" className="nh-btn nh-btn-gold">
            Back to the home page <Arrow />
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.round((Math.max(i, 0) / QUESTIONS) * 100);

  return (
    <form ref={formRef} className="nh-wizard" onSubmit={submit} onKeyDown={onKey} noValidate aria-live="polite">
      <Honeypot />
      <div className="nh-wizard-top">
        <span className="nh-meta nh-num">{i === 0 ? `${QUESTIONS} questions` : `${i} of ${QUESTIONS}`}</span>
        <div className="nh-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Application progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={step.id} ref={panelRef} className={`nh-step ${dir === 1 ? "nh-step-fwd" : "nh-step-back"}`}>
        {step.kind === "intro" ? (
          <>
            <h2 className="nh-step-title">{step.title}</h2>
            <p className="nh-lead nh-soft">{step.text}</p>
          </>
        ) : null}

        {step.kind === "fields" ? (
          <>
            <h2 className="nh-step-title">{step.title}</h2>
            {step.hint ? <p className="nh-soft">{step.hint}</p> : null}
            <div className={`nh-step-fields${step.fields.length > 1 ? " nh-step-grid" : ""}`}>
              {step.fields.map((f) => (
                <label key={f.name} className="nh-field">
                  <span>
                    {f.label}
                    {f.required ? <span className="nh-req"> *</span> : null}
                  </span>
                  {f.select ? (
                    <select name={f.name} value={(values[f.name] as string) ?? ""} onChange={(e) => set(f.name, e.target.value)} autoComplete={f.autoComplete}>
                      <option value="">Select</option>
                      {f.select.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input type={f.type ?? "text"} name={f.name} value={(values[f.name] as string) ?? ""} onChange={(e) => set(f.name, e.target.value)} placeholder={f.placeholder} autoComplete={f.autoComplete} inputMode={f.inputMode} max={f.max} />
                  )}
                </label>
              ))}
            </div>
          </>
        ) : null}

        {step.kind === "choice" ? (
          <>
            <h2 className="nh-step-title">{step.title}</h2>
            {step.hint ? <p className="nh-soft">{step.hint}</p> : null}
            <div className="nh-choices" role={step.multiple ? "group" : "radiogroup"} aria-label={step.title}>
              {step.options.map((o, k) => {
                const current = values[step.name];
                const on = Array.isArray(current) ? current.includes(o) : current === o;
                return (
                  <button
                    key={o}
                    type="button"
                    className={`nh-choice${on ? " is-on" : ""}`}
                    role={step.multiple ? "checkbox" : "radio"}
                    aria-checked={on}
                    onClick={() => {
                      if (step.multiple) {
                        const arr = Array.isArray(current) ? current : [];
                        set(step.name, on ? arr.filter((x) => x !== o) : [...arr, o]);
                      } else {
                        set(step.name, o);
                        setError(null);
                        setDir(1);
                        window.setTimeout(() => setI((n) => Math.min(n + 1, STEPS.length - 1)), 260);
                      }
                    }}
                  >
                    <span className="nh-choice-key nh-num" aria-hidden="true">
                      {String.fromCharCode(65 + k)}
                    </span>
                    {o}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {step.kind === "sign" ? (
          <>
            <h2 className="nh-step-title">{step.title}</h2>
            {step.hint ? <p className="nh-soft">{step.hint}</p> : null}
            <div className="vimtc-form nh-wizard-sign">
              <SignaturePad name="Students_Signature" />
              <label className="consent">
                <input type="checkbox" name="Privacy_Notice" value="Agreed" />
                <span>
                  I have read and agree to the <Link href={LINKS.privacy}>Privacy Notice</Link>. <span className="nh-req">*</span>
                </span>
              </label>
              <Turnstile />
            </div>
          </>
        ) : null}

        {error ? (
          <p className="nh-wizard-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="nh-wizard-nav">
        {i > 0 ? (
          <button type="button" className="nh-btn nh-btn-line" onClick={back}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step.kind === "sign" ? (
          <button type="submit" className="nh-btn nh-btn-gold" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Submit application"} <Arrow />
          </button>
        ) : (
          <button type="button" className="nh-btn nh-btn-gold" onClick={next}>
            {i === 0 ? "Start" : "OK"} <Arrow />
          </button>
        )}
        {i > 0 && step.kind !== "sign" ? <span className="nh-meta nh-wizard-hint">press Enter ↵</span> : null}
      </div>
    </form>
  );
}
