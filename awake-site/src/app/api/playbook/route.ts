import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { validateRequest, sanitizeString, isValidEmail } from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const result = await validateRequest(request);
    if (result instanceof NextResponse) return result;

    const { body } = result;
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 254);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // Insert into newsletter_signups with playbook source
    const { error: nlError } = await supabase
      .from("newsletter_signups")
      .upsert({ name, email, source: "playbook" }, { onConflict: "email" });

    if (nlError) {
      console.error("Playbook signup failed:", nlError.code);
      return NextResponse.json(
        { error: "Failed to register" },
        { status: 500 }
      );
    }

    // Sync to Google Sheet
    const sheetUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;
    if (sheetUrl) {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", "");
      formData.append("source", "playbook");
      try {
        await fetch(sheetUrl, { method: "POST", body: formData });
      } catch (sheetErr) {
        console.error("Google Sheet sync failed:", sheetErr);
      }
    }

    // Add/update subscriber with newsletter + playbook services
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, services")
      .eq("email", email)
      .single();

    if (existing) {
      const services = new Set(existing.services);
      services.add("newsletter");
      services.add("playbook");
      await supabase
        .from("subscribers")
        .update({ services: Array.from(services), name })
        .eq("id", existing.id);
    } else {
      await supabase.from("subscribers").insert({
        name,
        email,
        services: ["newsletter", "playbook"],
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
