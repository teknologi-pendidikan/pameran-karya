import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { work_id, type, file_url, thumbnail_url, license } = body;

    // Validate required fields
    if (!work_id || !type || !file_url) {
      return NextResponse.json(
        { error: "Missing required fields: work_id, type, file_url" },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ["image", "video", "audio", "document", "link"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be one of: " + validTypes.join(", ") },
        { status: 400 }
      );
    }

    // Check if user can access this work (using the existing function)
    const { getUserProfile } = await import("@/lib/user-profile");
    const userProfile = await getUserProfile();

    const { canUserAccessWork } = await import("@/lib/database");
    const canAccess = await canUserAccessWork(work_id, userProfile);

    if (!canAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Create the asset
    const { data: asset, error } = await supabase
      .from("asset")
      .insert([
        {
          work_id,
          type,
          file_url,
          thumbnail_url: thumbnail_url || null,
          license: license || "All Rights Reserved",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating asset:", error);
      return NextResponse.json(
        { error: "Failed to create asset" },
        { status: 500 }
      );
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
