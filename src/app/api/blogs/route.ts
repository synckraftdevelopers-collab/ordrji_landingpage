import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, BlogPost, BlogRevision } from "@/utils/db";

// GET - List blogs with filters
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status"); // Published, Draft, Scheduled, Archived, Deleted
  const categoryId = url.searchParams.get("categoryId");
  const tagId = url.searchParams.get("tagId");
  const search = url.searchParams.get("search")?.toLowerCase() || "";
  const featured = url.searchParams.get("featured");

  const blogs = readTable<BlogPost>("blogs");

  // Apply filters
  let filtered = blogs;

  // Filter by status (default to Published for public, but allow CMS to filter)
  if (status) {
    filtered = filtered.filter(b => b.status.toLowerCase() === status.toLowerCase());
  } else {
    // If no status query is provided, default to only Published (for visitor endpoints)
    filtered = filtered.filter(b => b.status === "Published");
  }

  if (categoryId) {
    filtered = filtered.filter(b => b.categoryId === categoryId);
  }

  if (tagId) {
    filtered = filtered.filter(b => b.tags.includes(tagId));
  }

  if (search) {
    filtered = filtered.filter(
      b =>
        b.title.toLowerCase().includes(search) ||
        b.description.toLowerCase().includes(search) ||
        b.content.toLowerCase().includes(search) ||
        b.createdBy.toLowerCase().includes(search)
    );
  }

  if (featured !== null && featured !== undefined && featured !== "") {
    const isFeaturedVal = featured === "true";
    filtered = filtered.filter(b => b.isFeatured === isFeaturedVal);
  }

  return NextResponse.json(filtered);
}

// POST - Create blog (Admin & Super Admin only)
export async function POST(req: NextRequest) {
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
      galleryImages = [],
      videos = [],
      categoryId,
      tags = [],
      isFeatured = false,
      status = "Draft",
      seoTitle,
      seoDescription,
      canonicalUrl,
      ogImage,
      keywords = [],
      robots = "index, follow",
      articleSchema = "{}",
      breadcrumbSchema = "{}",
      faqSchema = [],
      scheduledPublishDate
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required fields." }, { status: 400 });
    }

    const blogs = readTable<BlogPost>("blogs");

    // Generate unique slug
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    
    if (!baseSlug) baseSlug = "untitled-post";
    
    let slug = baseSlug;
    let count = 1;
    while (blogs.some(b => b.slug === slug)) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    // Estimate reading time (average speed 200 words per min)
    const wordCount = (content || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.round(wordCount / 200));
    const readingTime = `${readingMinutes} min read`;

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newBlog: BlogPost = {
      id: slug,
      title,
      slug,
      description,
      content: content || `<p>${description}</p>`,
      coverImage: coverImage || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
      galleryImages,
      videos,
      categoryId: categoryId || "tech",
      tags,
      isFeatured,
      status,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || description,
      canonicalUrl: canonicalUrl || `https://ordrji.com/blog/${slug}`,
      ogImage: ogImage || coverImage || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
      keywords,
      robots,
      articleSchema,
      breadcrumbSchema,
      faqSchema,
      createdBy: user,
      lastEditedBy: user,
      createdDate: dateStr,
      createdTime: timeStr,
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      timezone: "Asia/Kolkata",
      readingTime
    };

    if (status === "Published") {
      newBlog.publishedDate = dateStr;
      newBlog.publishedTime = timeStr;
      newBlog.approvedBy = role === "Super Admin" ? "Super Admin" : "Admin";
    } else if (status === "Scheduled" && scheduledPublishDate) {
      newBlog.scheduledPublishDate = scheduledPublishDate;
    }

    blogs.unshift(newBlog);
    writeTable("blogs", blogs);

    // Save initial version revision
    const revisions = readTable<BlogRevision>("revisions");
    const newRevision: BlogRevision = {
      id: `rev-${newBlog.id}-1`,
      blogId: newBlog.id,
      versionNumber: 1,
      editedBy: user,
      editedOnDate: dateStr,
      editedOnTime: timeStr,
      summaryOfChanges: "Initial draft creation.",
      data: newBlog
    };
    revisions.unshift(newRevision);
    writeTable("revisions", revisions);

    // Log Activity
    logActivity(user, role, `Created blog '${title}' with status '${status}'`, req);

    return NextResponse.json(newBlog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to parse request" }, { status: 400 });
  }
}
