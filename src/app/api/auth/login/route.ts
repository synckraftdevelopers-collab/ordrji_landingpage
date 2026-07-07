import { NextResponse } from "next/server";
import { readTable, UserAccount } from "@/utils/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Read seeded users
    const users = readTable<UserAccount>("users");
    const matchedUser = users.find(
      (u: UserAccount) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Set authorization cookies
    const cookieStore = await cookies();
    cookieStore.set("ordrji_logged_in", "true", { path: "/" });
    cookieStore.set("ordrji_role", matchedUser.role, { path: "/" });
    cookieStore.set("ordrji_username", matchedUser.name, { path: "/" });
    cookieStore.set("ordrji_user_email", matchedUser.email, { path: "/" });

    return NextResponse.json({
      success: true,
      user: {
        id: matchedUser.id,
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        avatar: matchedUser.avatar,
        designation: matchedUser.designation
      }
    });
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
