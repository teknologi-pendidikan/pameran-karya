import { updateSession } from "@/lib/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Handle preflight CORS requests for API routes
  if (
    request.method === "OPTIONS" &&
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Skip authentication for public API routes
  if (request.nextUrl.pathname.startsWith("/api/comments")) {
    return NextResponse.next();
  }

  // Apply Supabase session management for other routes
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
