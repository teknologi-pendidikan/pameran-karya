import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAffiliations, createAffiliation } from "@/lib/database";
import { generateSlug } from "@/lib/client-utils";

export async function GET() {
  try {
    const affiliations = await getAffiliations();
    return NextResponse.json(affiliations);
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    return NextResponse.json(
      { error: "Failed to fetch affiliations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user has permission (for future admin functionality)
    const { data: profile } = await supabase
      .from("profiles")
      .select("access_level")
      .eq("id", user.id)
      .single();

    if (!profile || !["curator", "operations"].includes(profile.access_level)) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, short_name, type, country, website } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(name);

    const affiliationData = {
      name,
      short_name: short_name || null,
      type,
      country: country || null,
      website: website || null,
      slug,
    };

    const newAffiliation = await createAffiliation(affiliationData);
    return NextResponse.json(newAffiliation, { status: 201 });
  } catch (error) {
    console.error("Error creating affiliation:", error);
    return NextResponse.json(
      { error: "Failed to create affiliation" },
      { status: 500 }
    );
  }
}
