/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET — fetch all demo leads, newest first
export async function GET() {
  const { data, error } = await (supabaseAdmin as any)
    .from("demo_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[/api/leads] fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, leads: data });
}

// PATCH — update lead status
export async function PATCH(req: Request) {
  const { id, status, notes } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ success: false, error: "id and status are required" }, { status: 400 });
  }

  const { error } = await (supabaseAdmin as any)
    .from("demo_leads")
    .update({ status, notes: notes ?? undefined, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
