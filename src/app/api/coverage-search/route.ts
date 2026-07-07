import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, type, stateCode, result } = body;

    if (!query) {
      return NextResponse.json({ success: false, error: "Query is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("coverage_searches").insert({
      query,
      location_type: type || null,
      state_code: stateCode || null,
      result_shown: result || "covered",
    });

    if (error) {
      console.error("Supabase insert error for coverage searches:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Coverage search API error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
