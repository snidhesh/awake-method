import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM = process.env.FROM_EMAIL || "AWAKE Method <onboarding@resend.dev>";
const TO = process.env.NOTIFICATION_EMAIL || "";

/** Fire-and-forget email alert — never blocks the response */
export function sendAlert(subject: string, html: string) {
  const client = getResend();
  if (!TO || !client) return;
  client.emails
    .send({ from: FROM, to: TO, subject, html })
    .catch((err) => console.error("Email alert failed:", err));
}
