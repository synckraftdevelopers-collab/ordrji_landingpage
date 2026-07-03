import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, BlogPost, BlogRevision } from "@/utils/db";

// GET - List revisions for a specific blog (Admin/Super Admin only)
export async function GET(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const url = new URL(req.url);
  const blogId = url.searchParams.get("blogId");

  if (!blogId) {
    return NextResponse.json({ error: "Missing blogId parameter." }, { status: 400 });
  }

  const revisions = readTable<BlogRevision>("revisions");
  const filtered = revisions.filter(r => r.blogId === blogId).sort((a, b) => b.versionNumber - a.versionNumber);

  return NextResponse.json(filtered);
}

// POST - Restore a specific revision (Admin/Super Admin only)
export async function POST(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { revisionId } = body;

    if (!revisionId) {
      return NextResponse.json({ error: "Missing revisionId parameter." }, { status: 400 });
    }

    const revisions = readTable<BlogRevision>("revisions");
    const revision = revisions.find(r => r.id === revisionId);

    if (!revision) {
      return NextResponse.json({ error: "Revision not found." }, { status: 404 });
    }

    const blogs = readTable<BlogPost>("blogs");
    const blogIndex = blogs.findIndex(b => b.id === revision.blogId);

    if (blogIndex === -1) {
      return NextResponse.json({ error: "Target blog not found." }, { status: 404 });
    }

    const currentBlog = blogs[blogIndex];

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Restore data from revision snapshot, but keep created dates and increment version
    const restoredData: BlogPost = {
      ...revision.data,
      id: currentBlog.id, // match current ID
      slug: currentBlog.slug, // keep current slug or restore old slug? Usually restore old slug or keep? Let's use revision slug
      createdBy: currentBlog.createdBy,
      createdDate: currentBlog.createdDate,
      createdTime: currentBlog.createdTime,
      lastEditedBy: user,
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      status: "Draft" // Restoring sets status back to draft for safety/review
    };

    blogs[blogIndex] = restoredData;
    writeTable("blogs", blogs);

    // Write a new revision snapshot showing the restore action
    const blogRevs = revisions.filter(r => r.blogId === currentBlog.id);
    const nextVer = blogRevs.length > 0 ? Math.max(...blogRevs.map(r => r.versionNumber)) + 1 : 1;

    const newRevision: BlogRevision = {
      id: `rev-${currentBlog.id}-${nextVer}`,
      blogId: currentBlog.id,
      versionNumber: nextVer,
      editedBy: user,
      editedOnDate: dateStr,
      editedOnTime: timeStr,
      summaryOfChanges: `Restored to version ${revision.versionNumber} (originally edited by ${revision.editedBy} on ${revision.editedOnDate}).`,
      data: restoredData
    };

    revisions.unshift(newRevision);
    writeTable("revisions", revisions);

    logActivity(user, role, `Restored blog '${currentBlog.title}' to Version ${revision.versionNumber}`, req);

    return NextResponse.json({ success: true, message: "Revision restored successfully.", blog: restoredData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid payload" }, { status: 400 });
  }
}
