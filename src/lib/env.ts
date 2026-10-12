const PLACEHOLDERS = new Set(["re_your_resend_api_key"]);

export class EnvConfigError extends Error {
  constructor(public readonly missing: string[]) {
    super(`Mail env not configured: ${missing.join(", ")}`);
    this.name = "EnvConfigError";
  }
}

export function assertMailEnv() {
  const missing = ["RESEND_API_KEY", "MAIL_FROM", "MAIL_TO"].filter((k) => {
    const v = process.env[k];
    return !v || PLACEHOLDERS.has(v);
  });
  if (missing.length) throw new EnvConfigError(missing);
}
