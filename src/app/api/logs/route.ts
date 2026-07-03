import { NextRequest, NextResponse } from "next/server";
import { readTable, BlogActivityLog } from "@/utils/db";

// GET - Fetch all activity logs (Admin/Super Admin only)
export async function GET(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const logs = readTable<BlogActivityLog>("logs");
  return NextResponse.json(logs);
}
