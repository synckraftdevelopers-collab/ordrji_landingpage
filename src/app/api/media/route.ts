import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, MediaAsset } from "@/utils/db";
import { supabaseAdmin } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";

// GET - List media library assets (Admin/Super Admin only)
export async function GET(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const media = readTable<MediaAsset>("media");
  return NextResponse.json(media);
}

// POST - Add media asset or upload file (Admin/Super Admin only)
export async function POST(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as Blob | null;

      if (!file) {
        return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      // Create uploads directory under public
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate a unique safe filename
      const originalName = (file as any).name || "image.jpg";
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "");
      const filename = `${Date.now()}-${sanitizedName}`;
      const filePath = path.join(uploadDir, filename);

      // Write the file
      await fs.writeFile(filePath, buffer);

      const fileUrl = `/uploads/${filename}`;
      const dateStr = new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

      // 1. Save to JSON database fallback
      const media = readTable<MediaAsset>("media");
      const newAsset: MediaAsset = {
        id: `media-${Date.now()}`,
        url: fileUrl,
        name: originalName,
        type: file.type || "image/jpeg",
        size: file.size,
        uploadedAt: dateStr
      };
      media.unshift(newAsset);
      writeTable("media", media);

      // 2. Save to Supabase media_assets table
      try {
        await supabaseAdmin.from("media_assets").insert({
          url: fileUrl,
          name: originalName,
          mime_type: file.type || "image/jpeg",
          size_bytes: file.size,
          uploaded_by: user,
        });
      } catch (dbErr) {
        console.error("Supabase media_assets insert error:", dbErr);
      }

      logActivity(user, role, `Uploaded cover image file '${originalName}'`, req);

      return NextResponse.json({ success: true, url: fileUrl, name: originalName });
    } catch (err: any) {
      console.error("Upload handler error:", err);
      return NextResponse.json({ error: err.message || "Failed to process upload." }, { status: 500 });
    }
  }

  // Fallback to JSON payload
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

    // Save to Supabase media_assets table as well
    try {
      await supabaseAdmin.from("media_assets").insert({
        url,
        name,
        mime_type: type,
        size_bytes: size,
        uploaded_by: user,
      });
    } catch (dbErr) {
      console.error("Supabase media_assets insert error:", dbErr);
    }

    logActivity(user, role, `Uploaded media asset '${name}'`, req);

    return NextResponse.json(newAsset);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid payload" }, { status: 400 });
  }
}

// POST - Add media asset