import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the asset to check work ownership
    const { data: asset, error: assetError } = await supabase
      .from("asset")
      .select("work_id")
      .eq("asset_id", id)
      .single();

    if (assetError || !asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Check if user can access this work
    const { getUserProfile } = await import("@/lib/user-profile");
    const userProfile = await getUserProfile();

    const { canUserAccessWork } = await import("@/lib/database");
    const canAccess = await canUserAccessWork(asset.work_id, userProfile);

    if (!canAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Delete the asset
    const { error: deleteError } = await supabase
      .from("asset")
      .delete()
      .eq("asset_id", id);

    if (deleteError) {
      console.error("Error deleting asset:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete asset" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
