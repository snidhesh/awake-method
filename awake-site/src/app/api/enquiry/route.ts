import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { validateRequest, sanitizeString, isValidEmail } from "@/lib/api-utils";

const ALLOWED_SERVICE_TYPES = [
  "keynote",
  "masterclass",
  "training",
  "collab",
  "podcast",
  "other",
];

export async function POST(request: Request) {
  try {
    const result = await validateRequest(request);
    if (result instanceof NextResponse) return result;

    const { body } = result;
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 254);
    const phone = sanitizeString(body.phone, 30);
    const company = sanitizeString(body.company, 150);
    const serviceType = sanitizeString(body.serviceType, 50);
    const eventDate = sanitizeString(body.eventDate, 30);
    const audienceSize = sanitizeString(body.audienceSize, 20);
    const message = sanitizeString(body.message, 5000);

    if (!name || !email || !serviceType) {
      return NextResponse.json(
        { error: "Name, email, and service type are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!ALLOWED_SERVICE_TYPES.includes(serviceType)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // Insert enquiry
    const { error: eqError } = await supabase.from("enquiries").insert({
      name,
      email,
      phone,
      company,
      service_type: serviceType,
      event_date: eventDate,
      audience_size: audienceSize,
      message,
    });

    if (eqError) {
      console.error("Enquiry insert failed:", eqError.code);
      return NextResponse.json(
        { error: "Failed to submit enquiry" },
        { status: 500 }
      );
    }

    // Also send to Google Sheet via Apps Script
    const sheetUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;
    if (sheetUrl) {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone || "");
      formData.append("company", company || "");
      formData.append("serviceType", serviceType);
      formData.append("message", message || "");
      try {
        await fetch(sheetUrl, { method: "POST", body: formData });
      } catch (sheetErr) {
        console.error("Google Sheet sync failed:", sheetErr);
      }
    }

    // Add/update subscriber record with appropriate service tag
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, services, phone, company")
      .eq("email", email)
      .single();

    if (existing) {
      const services = new Set(existing.services as string[]);
      services.add(serviceType);
      await supabase
        .from("subscribers")
        .update({
          services: Array.from(services),
          name,
          phone: phone || existing.phone,
          company: company || existing.company,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("subscribers").insert({
        name,
        email,
        phone,
        company,
        services: [serviceType],
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
