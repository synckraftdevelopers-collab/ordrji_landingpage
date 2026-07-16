import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, UserAccount } from "@/utils/db";

// GET - List all users (Only Admin/Super Admin allowed)
export async function GET(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  const users = readTable<UserAccount>("users");
  return NextResponse.json(users);
}

// POST - Add one or multiple new administrators
export async function POST(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const usersListToAdd: any[] = Array.isArray(body) ? body : [body];
    
    if (usersListToAdd.length === 0) {
      return NextResponse.json({ error: "No users provided to add." }, { status: 400 });
    }

    const currentUsers = readTable<UserAccount>("users");

    for (const item of usersListToAdd) {
      const { email, password, name, role: userRole = "Admin", designation = "Admin Contributor", bio = "" } = item;
      
      if (!email || !password || !name) {
        return NextResponse.json({ error: "Email, password, and name are required for all accounts." }, { status: 400 });
      }

      if (currentUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return NextResponse.json({ error: `User with email '${email}' already exists.` }, { status: 400 });
      }

      const newUser: UserAccount = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        email: email.trim(),
        password: password,
        name: name.trim(),
        role: userRole,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
        designation: designation.trim(),
        bio: bio.trim()
      };

      currentUsers.push(newUser);

      // Sync to Supabase
      try {
        const { supabaseAdmin } = await import("@/lib/supabase");
        const { error: dbError } = await (supabaseAdmin as any).from("admin_users").insert({
          id: newUser.id,
          email: newUser.email,
          password: newUser.password,
          name: newUser.name,
          role: newUser.role,
          designation: newUser.designation,
          bio: newUser.bio,
          avatar: newUser.avatar,
          registered_at: new Date().toISOString()
        });
        if (dbError) {
          console.error("Error saving user to Supabase:", dbError);
        }
      } catch (dbErr) {
        console.error("Supabase user sync error:", dbErr);
      }
    }

    writeTable("users", currentUsers);
    return NextResponse.json({ success: true, count: usersListToAdd.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process request" }, { status: 500 });
  }
}

// DELETE - Remove an administrator account
export async function DELETE(req: NextRequest) {
  const role = req.cookies.get("ordrji_role")?.value || "Visitor";
  if (role !== "Admin" && role !== "Super Admin") {
    return NextResponse.json({ error: "Access Denied: Insufficient permissions." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID parameter is required." }, { status: 400 });
    }

    // Protect superadmin from deletion
    if (userId === "user-super") {
      return NextResponse.json({ error: "The primary Super Admin cannot be deleted." }, { status: 400 });
    }

    const currentUsers = readTable<UserAccount>("users");
    const filteredUsers = currentUsers.filter(u => u.id !== userId);

    if (currentUsers.length === filteredUsers.length) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    writeTable("users", filteredUsers);

    // Sync delete to Supabase
    try {
      const { supabaseAdmin } = await import("@/lib/supabase");
      const { error: dbError } = await (supabaseAdmin as any).from("admin_users").delete().eq("id", userId);
      if (dbError) {
        console.error("Error deleting user from Supabase:", dbError);
      }
    } catch (dbErr) {
      console.error("Supabase user delete error:", dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete user" }, { status: 500 });
  }
}
