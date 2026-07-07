import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, logActivity, Category } from "@/utils/db";

// GET - List categories
export async function GET(_req: NextRequest) {
  const categories = readTable<Category>("categories");
  return NextResponse.json(categories);
}

// POST - Create Category (Super Admin only)
export async function POST(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Only Super Admin can manage categories." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, description = "", isEnabled = true } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const categories = readTable<Category>("categories");
    
    // Generate unique slug
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    if (categories.some(c => c.slug === slug)) {
      return NextResponse.json({ error: "A category with this name already exists." }, { status: 400 });
    }

    const newCategory: Category = {
      id: slug, // use slug as ID
      name,
      slug,
      description,
      isEnabled
    };

    categories.push(newCategory);
    writeTable("categories", categories);

    logActivity(user, role, `Created Category '${name}'`, req);

    return NextResponse.json(newCategory);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid payload" }, { status: 400 });
  }
}

// PUT - Update Category (Super Admin only)
export async function PUT(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Only Super Admin can manage categories." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, name, description, isEnabled } = body;

    if (!id) {
      return NextResponse.json({ error: "Category ID is required for updates." }, { status: 400 });
    }

    const categories = readTable<Category>("categories");
    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    const currentCat = categories[categoryIndex];
    
    const updatedCategory: Category = {
      ...currentCat,
      name: name !== undefined ? name : currentCat.name,
      description: description !== undefined ? description : currentCat.description,
      isEnabled: isEnabled !== undefined ? isEnabled : currentCat.isEnabled
    };

    categories[categoryIndex] = updatedCategory;
    writeTable("categories", categories);

    logActivity(user, role, `Updated Category '${updatedCategory.name}' (Enabled: ${updatedCategory.isEnabled})`, req);

    return NextResponse.json(updatedCategory);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid payload" }, { status: 400 });
  }
}

// DELETE - Delete Category (Super Admin only)
export async function DELETE(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  const user = req.cookies.get("ordrji_username")?.value || "Admin User";

  if (role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Only Super Admin can delete categories." }, { status: 403 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Category ID is required for deletion." }, { status: 400 });
  }

  const categories = readTable<Category>("categories");
  const categoryIndex = categories.findIndex(c => c.id === id);

  if (categoryIndex === -1) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }

  const catName = categories[categoryIndex].name;
  categories.splice(categoryIndex, 1);
  writeTable("categories", categories);

  logActivity(user, role, `Deleted Category '${catName}'`, req);

  return NextResponse.json({ success: true, message: `Category '${catName}' deleted successfully.` });
}
