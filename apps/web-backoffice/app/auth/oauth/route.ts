import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Ensure user profile and person record exist first
      try {
        const { ensureUserProfile } = await import("@/lib/user-profile");
        await ensureUserProfile();
      } catch (profileError) {
        console.error(
          "Error ensuring user profile during OAuth:",
          profileError
        );
        // For new users, if profile creation fails, redirect to account setup
        // where they can manually complete the setup
        next = "/account-setup";
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }

      // Check if this is a new user by checking if they have completed profile setup
      const { data: personData } = await supabase
        .from("person")
        .select("bio, affiliation_id, tag")
        .eq("profile_id", data.user.id)
        .single();

      // If user has no person data or hasn't completed setup, redirect to setup
      if (!personData || (!personData.bio && !personData.affiliation_id)) {
        next = "/account-setup";
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
