import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
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

    // Get all people ordered by name
    const { data: people, error } = await supabase
      .from("person")
      .select("person_id, name, slug, affiliation, bio, tag")
      .order("name");

    if (error) {
      console.error("Error fetching people:", error);
      return NextResponse.json(
        { error: "Failed to fetch people" },
        { status: 500 }
      );
    }

    return NextResponse.json(people || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
