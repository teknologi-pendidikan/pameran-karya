import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ workId: string; personId: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { workId, personId } = await params;
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user can access this work
    const { getUserProfile } = await import("@/lib/user-profile");
    const userProfile = await getUserProfile();

    const { canUserAccessWork } = await import("@/lib/database");
    const canAccess = await canUserAccessWork(workId, userProfile);

    if (!canAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Delete the contributor
    const { error: deleteError } = await supabase
      .from("work_person")
      .delete()
      .eq("work_id", workId)
      .eq("person_id", personId);

    if (deleteError) {
      console.error("Error removing contributor:", deleteError);
      return NextResponse.json(
        { error: "Failed to remove contributor" },
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

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { workId, personId } = await params;
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
    const { contribution_role, ordering } = body;

    // Check if user can access this work
    const { getUserProfile } = await import("@/lib/user-profile");
    const userProfile = await getUserProfile();

    const { canUserAccessWork } = await import("@/lib/database");
    const canAccess = await canUserAccessWork(workId, userProfile);

    if (!canAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Update the contributor
    const { data: workPerson, error } = await supabase
      .from("work_person")
      .update({
        contribution_role: contribution_role || null,
        ordering: ordering || null,
      })
      .eq("work_id", workId)
      .eq("person_id", personId)
      .select()
      .single();

    if (error) {
      console.error("Error updating contributor:", error);
      return NextResponse.json(
        { error: "Failed to update contributor" },
        { status: 500 }
      );
    }

    return NextResponse.json(workPerson);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
