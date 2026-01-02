import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VotingForm from "@/components/VotingForm";
import Link from "next/link";

interface SearchParams {
  data?: string; // Encoded work data
  // Legacy parameters for backward compatibility
  workId?: string;
  title?: string;
  slug?: string;
  authors?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

// Helper function to decode work data
function decodeWorkData(encodedData: string) {
  try {
    const decodedString = atob(decodeURIComponent(encodedData));
    const workData = JSON.parse(decodedString);

    // Validate timestamp (optional - can be used for expiration)
    const now = Date.now();
    const dataAge = now - (workData.timestamp || 0);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (dataAge > maxAge) {
      console.warn("Vote link has expired");
      // Could return null here to force expiration, but we'll allow it for now
    }

    return {
      workId: workData.workId,
      title: workData.title,
      slug: workData.slug,
      authors: workData.authors,
    };
  } catch (error) {
    console.error("Failed to decode work data:", error);
    return null;
  }
}

export default async function VotePage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Try to decode the new format first, fallback to legacy parameters
  let workId, title, slug, authors;

  if (params.data) {
    const decodedData = decodeWorkData(params.data);
    if (decodedData) {
      ({ workId, title, slug, authors } = decodedData);
    } else {
      // Invalid encoded data, redirect to error or home
      redirect("/");
    }
  } else {
    // Legacy format for backward compatibility
    ({ workId, title, slug, authors } = params);
  }

  // Get the current user
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login?redirect=/vote");
  }

  // Check if user has already voted
  const { data: existingVote, error: voteCheckError } = await supabase
    .from("votes")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (voteCheckError && voteCheckError.code !== "PGRST116") {
    console.error("Error checking existing vote:", voteCheckError);
  }

  // If no work info provided, show work selection
  if (!workId || !title) {
    return (
      <div className="space-y-4 md:space-y-6 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Vote for Your Favorite Work
            </h1>
            <p className="text-muted-foreground mb-6">
              Please select a work from the exhibition to cast your vote.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Exhibition
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Cast Your Vote
          </h1>
          <p className="text-muted-foreground">
            Your voice matters in this exhibition
          </p>
        </div>

        <div className="bg-card border border-border p-6 md:p-8">
          <div className="mb-6">
            <div className="bg-accent p-4 mb-4">
              <h2 className="text-lg font-semibold text-accent-foreground mb-1">
                {title}
              </h2>
              {authors && (
                <p className="text-sm text-primary font-medium mb-1">
                  by {authors}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                You are about to vote for this work
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="text-center text-muted-foreground">
                Loading...
              </div>
            }
          >
            <VotingForm
              workId={workId}
              workTitle={title}
              workSlug={slug || ""}
              userId={user.id}
              userEmail={user.email || ""}
              existingVote={existingVote}
              authors={authors}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Vote - Pameran Karya Teknologi Pendidikan",
  description: "Cast your vote for the best work in the exhibition",
};
