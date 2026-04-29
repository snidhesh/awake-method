import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.FROM_EMAIL || "AWAKE Method <onboarding@resend.dev>";
const TO = process.env.NOTIFICATION_EMAIL || "";

/** Fire-and-forget email alert — never blocks the response */
export function sendAlert(subject: string, html: string) {
  if (!TO) return;
  resend.emails
    .send({ from: FROM, to: TO, subject, html })
    .catch((err) => console.error("Email alert failed:", err));
}
