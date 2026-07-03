import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, MediaAsset } from "@/utils/db";

// GET - List media library assets (Admin/Super Admin only)
export async function GET(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const media = readTable<MediaAsset>("media");
  return NextResponse.json(media);
}

// POST - Add media asset (Admin/Super Admin only)
export async function POST(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { url, name, type = "image/jpeg", size = 500000 } = body;

    if (!url || !name) {
      return NextResponse.json({ error: "Media URL and Name are required." }, { status: 400 });
    }

    const media = readTable<MediaAsset>("media");

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

    const newAsset: MediaAsset = {
      id: `media-${Date.now()}`,
      url,
      name,
      type,
      size,
      uploadedAt: dateStr
    };

    media.unshift(newAsset);
    writeTable("media", media);

    logActivity(user, role, `Uploaded media asset '${name}'`, req);

    return NextResponse.json(newAsset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid payload" }, { status: 400 });
  }
}
