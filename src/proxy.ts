import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Intercept Admin Dashboard access
  if (pathname.startsWith("/dashboard/admin")) {
    const loggedIn = req.cookies.get("ordrji_logged_in")?.value === "true";
    const role = req.cookies.get("ordrji_role")?.value || "";

    if (!loggedIn) {
      // Redirect unauthenticated user directly to public resource page
      const blogUrl = new URL("/blog", req.url);
      return NextResponse.redirect(blogUrl);
    }

    // Authenticated but wrong role
    if (role !== "Admin" && role !== "Super Admin") {
      const deniedUrl = new URL("/dashboard/denied", req.url);
      deniedUrl.searchParams.set("role", role);
      return NextResponse.redirect(deniedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin/:path*"]
};
