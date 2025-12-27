import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ workId: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { workId } = await params;
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
    const { person_id, contribution_role, ordering } = body;

    // Validate required fields
    if (!person_id) {
      return NextResponse.json(
        { error: "Missing required field: person_id" },
        { status: 400 }
      );
    }

    // Check if user can access this work
    const { getUserProfile } = await import("@/lib/user-profile");
    const userProfile = await getUserProfile();

    const { canUserAccessWork } = await import("@/lib/database");
    const canAccess = await canUserAccessWork(workId, userProfile);

    if (!canAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Check if person exists
    const { data: person, error: personError } = await supabase
      .from("person")
      .select("person_id")
      .eq("person_id", person_id)
      .single();

    if (personError || !person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    // Check if work exists
    const { data: work, error: workError } = await supabase
      .from("work")
      .select("work_id")
      .eq("work_id", workId)
      .single();

    if (workError || !work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    // Check if person is already a contributor
    const { data: existing } = await supabase
      .from("work_person")
      .select("person_id")
      .eq("work_id", workId)
      .eq("person_id", person_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Person is already a contributor" },
        { status: 400 }
      );
    }

    // Add the contributor
    const { data: workPerson, error } = await supabase
      .from("work_person")
      .insert([
        {
          work_id: workId,
          person_id,
          contribution_role: contribution_role || "Collaborator",
          ordering: ordering || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding contributor:", error);
      return NextResponse.json(
        { error: "Failed to add contributor" },
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
