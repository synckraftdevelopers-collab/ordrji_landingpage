import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, Tag } from "@/utils/db";

// GET - List tags
export async function GET(req: NextRequest) {
  const tags = readTable<Tag>("tags");
  return NextResponse.json(tags);
}

// POST - Create Tag (Super Admin only)
export async function POST(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Only Super Admin can manage tags." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Tag name is required." }, { status: 400 });
    }

    const tags = readTable<Tag>("tags");
    
    // Generate unique slug
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    if (tags.some(t => t.slug === slug)) {
      return NextResponse.json({ error: "A tag with this name already exists." }, { status: 400 });
    }

    const newTag: Tag = {
      id: slug, // use slug as ID
      name,
      slug
    };

    tags.push(newTag);
    writeTable("tags", tags);

    logActivity(user, role, `Created Tag '${name}'`, req);

    return NextResponse.json(newTag);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid payload" }, { status: 400 });
  }
}

// PUT - Update Tag (Super Admin only)
export async function PUT(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Only Super Admin can manage tags." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json({ error: "Tag ID and name are required." }, { status: 400 });
    }

    const tags = readTable<Tag>("tags");
    const tagIndex = tags.findIndex(t => t.id === id);

    if (tagIndex === -1) {
      return NextResponse.json({ error: "Tag not found." }, { status: 404 });
    }

    const currentTag = tags[tagIndex];
    const oldName = currentTag.name;

    currentTag.name = name;
    // update slug if name changed
    currentTag.slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    writeTable("tags", tags);

    logActivity(user, role, `Renamed Tag '${oldName}' to '${name}'`, req);

    return NextResponse.json(currentTag);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid payload" }, { status: 400 });
  }
}

// DELETE - Delete Tag (Super Admin only)
export async function DELETE(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Only Super Admin can delete tags." }, { status: 403 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Tag ID is required for deletion." }, { status: 400 });
  }

  const tags = readTable<Tag>("tags");
  const tagIndex = tags.findIndex(t => t.id === id);

  if (tagIndex === -1) {
    return NextResponse.json({ error: "Tag not found." }, { status: 404 });
  }

  const tagName = tags[tagIndex].name;
  tags.splice(tagIndex, 1);
  writeTable("tags", tags);

  logActivity(user, role, `Deleted Tag '${tagName}'`, req);

  return NextResponse.json({ success: true, message: `Tag '${tagName}' deleted successfully.` });
}
