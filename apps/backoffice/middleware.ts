import { NextRequest, NextResponse } from "next/server";
import { createSupabaseMiddleware } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await createSupabaseMiddleware(request);

  // Check if user is trying to access protected routes
  const protectedRoutes = ["/dashboard", "/submit"];
  const adminRoutes = ["/admin"];
  const publicRoutes = ["/auth", "/"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      (route !== "/" && request.nextUrl.pathname.startsWith(route))
  );

  // Get user from cookies
  const accessToken = request.cookies.get("sb-access-token");
  const refreshToken = request.cookies.get("sb-refresh-token");
  const isLoggedIn = !!(accessToken && refreshToken);

  // Redirect logic for authentication
  if ((isProtectedRoute || isAdminRoute) && !isLoggedIn) {
    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoggedIn && request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Note: Admin role checking is handled at the component level
  // since we need to decode the JWT to get user info, which is
  // better done in server components

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
