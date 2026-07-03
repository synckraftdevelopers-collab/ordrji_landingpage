import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, BlogPost, BlogRevision } from "@/utils/db";

// GET - Single blog details
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const blogs = readTable<BlogPost>("blogs");
  const blog = blogs.find(b => b.id === id || b.slug === id);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// PUT - Update blog (creates revision, Admin/Super Admin only)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      content,
      coverImage,
      galleryImages,
      videos,
      categoryId,
      tags,
      isFeatured,
      status,
      seoTitle,
      seoDescription,
      canonicalUrl,
      ogImage,
      keywords,
      robots,
      articleSchema,
      breadcrumbSchema,
      faqSchema,
      scheduledPublishDate,
      summaryOfChanges = "Updated article details"
    } = body;

    const blogs = readTable<BlogPost>("blogs");
    const blogIndex = blogs.findIndex(b => b.id === id);

    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const currentBlog = blogs[blogIndex];

    // Check transition to published
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Estimate reading time (average speed 200 words per min)
    const wordCount = (content || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.round(wordCount / 200));
    const readingTime = `${readingMinutes} min read`;

    // Detect field changes for activity log
    const changedFields: string[] = [];
    if (currentBlog.title !== title) changedFields.push("Title");
    if (currentBlog.coverImage !== coverImage) changedFields.push("Featured Image");
    if (currentBlog.seoTitle !== seoTitle || currentBlog.seoDescription !== seoDescription) changedFields.push("SEO metadata");
    if (currentBlog.status !== status) changedFields.push(`Status to '${status}'`);

    const updatedBlog: BlogPost = {
      ...currentBlog,
      title: title || currentBlog.title,
      description: description || currentBlog.description,
      content: content !== undefined ? content : currentBlog.content,
      coverImage: coverImage !== undefined ? coverImage : currentBlog.coverImage,
      galleryImages: galleryImages !== undefined ? galleryImages : currentBlog.galleryImages,
      videos: videos !== undefined ? videos : currentBlog.videos,
      categoryId: categoryId || currentBlog.categoryId,
      tags: tags !== undefined ? tags : currentBlog.tags,
      isFeatured: isFeatured !== undefined ? isFeatured : currentBlog.isFeatured,
      status: status || currentBlog.status,
      seoTitle: seoTitle !== undefined ? seoTitle : currentBlog.seoTitle,
      seoDescription: seoDescription !== undefined ? seoDescription : currentBlog.seoDescription,
      canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : currentBlog.canonicalUrl,
      ogImage: ogImage !== undefined ? ogImage : currentBlog.ogImage,
      keywords: keywords !== undefined ? keywords : currentBlog.keywords,
      robots: robots !== undefined ? robots : currentBlog.robots,
      articleSchema: articleSchema !== undefined ? articleSchema : currentBlog.articleSchema,
      breadcrumbSchema: breadcrumbSchema !== undefined ? breadcrumbSchema : currentBlog.breadcrumbSchema,
      faqSchema: faqSchema !== undefined ? faqSchema : currentBlog.faqSchema,
      lastEditedBy: user,
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      readingTime
    };

    // Workflow dates handling
    if (status === "Published" && currentBlog.status !== "Published") {
      updatedBlog.publishedDate = dateStr;
      updatedBlog.publishedTime = timeStr;
      updatedBlog.approvedBy = role === "Super Admin" ? "Super Admin" : "Admin";
    } else if (status === "Scheduled" && scheduledPublishDate) {
      updatedBlog.scheduledPublishDate = scheduledPublishDate;
    } else if (status === "Archived" && currentBlog.status !== "Archived") {
      updatedBlog.archivedDate = dateStr;
    }

    blogs[blogIndex] = updatedBlog;
    writeTable("blogs", blogs);

    // Save revision history
    const revisions = readTable<BlogRevision>("revisions");
    const blogRevs = revisions.filter(r => r.blogId === id);
    const nextVer = blogRevs.length > 0 ? Math.max(...blogRevs.map(r => r.versionNumber)) + 1 : 1;

    const newRevision: BlogRevision = {
      id: `rev-${id}-${nextVer}`,
      blogId: id,
      versionNumber: nextVer,
      editedBy: user,
      editedOnDate: dateStr,
      editedOnTime: timeStr,
      summaryOfChanges,
      data: updatedBlog
    };

    revisions.unshift(newRevision);
    writeTable("revisions", revisions);

    // Activity log entry
    const actionDesc = changedFields.length > 0 
      ? `Edited ${changedFields.join(", ")} on blog '${updatedBlog.title}'`
      : `Updated blog '${updatedBlog.title}' details`;
    logActivity(user, role, actionDesc, req);

    return NextResponse.json(updatedBlog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to parse update payload" }, { status: 400 });
  }
}

// DELETE - Soft delete (Admin/Super Admin only) or Hard delete (Super Admin only with ?purge=true)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const url = new URL(req.url);
  const purge = url.searchParams.get("purge") === "true";

  const blogs = readTable<BlogPost>("blogs");
  const blogIndex = blogs.findIndex(b => b.id === id);

  if (blogIndex === -1) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  const blog = blogs[blogIndex];

  if (purge) {
    // Hard delete - restricted to Super Admin only
    if (role !== "Super Admin") {
      return NextResponse.json({ error: "Access Denied: Only Super Admin can hard delete blogs." }, { status: 403 });
    }

    blogs.splice(blogIndex, 1);
    writeTable("blogs", blogs);

    // Optionally delete revisions/logs or keep them for audit? Let's clean up revisions but keep logs.
    const revisions = readTable<BlogRevision>("revisions").filter(r => r.blogId !== id);
    writeTable("revisions", revisions);

    logActivity(user, role, `Permanently purged blog '${blog.title}'`, req);
    return NextResponse.json({ success: true, message: "Blog permanently deleted." });
  } else {
    // Soft Delete - Set status to 'Deleted' and save deletedDate
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    blog.status = "Deleted";
    blog.deletedDate = `${dateStr} at ${timeStr}`;

    writeTable("blogs", blogs);

    logActivity(user, role, `Soft deleted blog '${blog.title}'`, req);
    return NextResponse.json({ success: true, message: "Blog soft-deleted.", blog });
  }
}

// POST - Actions like Restore (Super Admin only)
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "restore") {
      if (role !== "Super Admin") {
        return NextResponse.json({ error: "Access Denied: Only Super Admin can restore blogs." }, { status: 403 });
      }

      const blogs = readTable<BlogPost>("blogs");
      const blogIndex = blogs.findIndex(b => b.id === id);

      if (blogIndex === -1) {
        return NextResponse.json({ error: "Blog not found." }, { status: 404 });
      }

      const blog = blogs[blogIndex];
      if (blog.status !== "Deleted") {
        return NextResponse.json({ error: "Blog is not in deleted state." }, { status: 400 });
      }

      // Restore to Draft
      blog.status = "Draft";
      blog.deletedDate = undefined;

      writeTable("blogs", blogs);
      logActivity(user, role, `Restored deleted blog '${blog.title}' to draft`, req);

      return NextResponse.json({ success: true, message: "Blog successfully restored to draft.", blog });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to process request." }, { status: 400 });
  }
}
