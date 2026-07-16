import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: Name, Email, Subject, and Message are required." },
        { status: 400 }
      );
    }

    const { error } = await (supabaseAdmin as any).from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      location: location || null,
      subject,
      message,
      status: "unread",
    });

    if (error) {
      console.error("Supabase insert error for contact messages:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
