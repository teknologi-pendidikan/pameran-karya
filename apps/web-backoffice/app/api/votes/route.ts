import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get vote counts using the database function
    const { data: voteCounts, error } = await supabase.rpc("get_vote_counts");

    if (error) {
      console.error("Error fetching vote counts:", error);
      return NextResponse.json(
        { error: "Failed to fetch vote counts" },
        { status: 500 }
      );
    }

    // Get total number of voters
    const { count: totalVoters, error: voterCountError } = await supabase
      .from("votes")
      .select("*", { count: "exact", head: true });

    if (voterCountError) {
      console.error("Error fetching voter count:", voterCountError);
    }

    return NextResponse.json({
      success: true,
      data: {
        voteResults: voteCounts || [],
        totalVoters: totalVoters || 0,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
