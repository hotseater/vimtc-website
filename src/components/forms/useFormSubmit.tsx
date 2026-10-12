"use client";

import { useState, type FormEvent } from "react";

export type Status = { state: "idle" | "sending" | "ok" | "err"; message?: string };

/** Posts a <form> as multipart FormData to one of the /api routes and tracks status. */
export function useFormSubmit(endpoint: string, successMessage: string) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch(endpoint, { method: "POST", body: new FormData(form) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        form.reset();
        form.dispatchEvent(new Event("vimtc:reset"));
        setStatus({ state: "ok", message: successMessage });
      } else {
        setStatus({ state: "err", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "err", message: "Network error. Please try again." });
    }
  }

  return { status, onSubmit, busy: status.state === "sending" };
}

export function StatusMessage({ status }: { status: Status }) {
  if (status.state === "ok") return <p className="form_status ok" role="status">{status.message}</p>;
  if (status.state === "err") return <p className="form_status err" role="alert">{status.message}</p>;
  return null;
}
