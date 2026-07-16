/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
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
  if (status && status.toLowerCase() !== "all") {
    filtered = filtered.filter(b => b.status.toLowerCase() === status.toLowerCase());
  } else if (!status) {
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
      scheduledPublishDate,
      createdBy,
      createdDate,
      facebookUrl = "",
      twitterUrl = "",
      linkedinUrl = "",
      instagramUrl = ""
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

    // Use selected values or default
    const authorName = createdBy || user;
    const finalDateStr = createdDate || dateStr;

    // Determine created_at timestamp for Supabase
    let createdAtTimestamp = now.toISOString();
    if (finalDateStr) {
      try {
        const parsed = new Date(finalDateStr);
        if (!isNaN(parsed.getTime())) {
          const combined = new Date(
            parsed.getFullYear(),
            parsed.getMonth(),
            parsed.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
          );
          createdAtTimestamp = combined.toISOString();
        }
      } catch (e) {}
    }

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
      createdBy: authorName,
      lastEditedBy: user,
      createdDate: finalDateStr,
      createdTime: timeStr,
      lastUpdatedDate: finalDateStr,
      lastUpdatedTime: timeStr,
      timezone: "Asia/Kolkata",
      readingTime,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      instagramUrl
    };

    if (status === "Published") {
      newBlog.publishedDate = finalDateStr;
      newBlog.publishedTime = timeStr;
      newBlog.approvedBy = role === "Super Admin" ? "Super Admin" : "Admin";
    } else if (status === "Scheduled" && scheduledPublishDate) {
      newBlog.scheduledPublishDate = scheduledPublishDate;
    }

    blogs.unshift(newBlog);
    writeTable("blogs", blogs);

    // Save to Supabase blog_posts database table
    try {
      const { supabaseAdmin } = await import("@/lib/supabase");
      
      const CATEGORY_MAP: Record<string, string> = {
        'tech': 'a77c676a-cba9-497b-9338-5c4618a50a56',
        'ops': 'a768a923-b7fd-4090-ab54-1ad088f1c59a',
        'mgmt': '0f1f300b-9751-4ccb-9009-741d3a7fa58e',
        'mktg': 'a21c2406-9902-413f-848d-21b0b60fca45'
      };
      const AUTHOR_MAP: Record<string, string> = {
        'Rohan Mehta': '39e63798-1f7e-4094-818a-e2d1969c3c6d',
        'Priya Sharma': 'a852c5cd-2b0b-4c83-99c3-2deea6c652fb',
        'Vikram Dev': '7eea8a9a-9dc6-498e-b0a2-c43c34d03bab',
        'Rahul Sharma': '39e63798-1f7e-4094-818a-e2d1969c3c6d',
        'Ananya Gupta': 'a852c5cd-2b0b-4c83-99c3-2deea6c652fb'
      };

      const mappedCatId = CATEGORY_MAP[categoryId || "tech"] || null;
      const mappedAuthId = AUTHOR_MAP[authorName] || null;

      const { error: dbError } = await (supabaseAdmin as any).from("blog_posts").insert({
        title,
        slug,
        description,
        content: content || `<p>${description}</p>`,
        cover_image: coverImage || null,
        category_id: mappedCatId,
        author_id: mappedAuthId,
        is_featured: isFeatured,
        status: status,
        created_by: authorName,
        created_at: createdAtTimestamp,
        published_at: status === "Published" ? new Date().toISOString() : null,
      });
      if (dbError) {
        console.error("Error saving blog to Supabase:", dbError);
      }
    } catch (dbErr) {
      console.error("Exception saving blog to Supabase:", dbErr);
    }

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
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to parse request" }, { status: 400 });
  }
}
