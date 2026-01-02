/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface VotingFormProps {
  workId: string;
  workTitle: string;
  workSlug: string;
  userId: string;
  userEmail: string;
  existingVote: any;
  authors?: string;
}

export default function VotingForm({
  workId,
  workTitle,
  userId,
  existingVote,
  authors,
}: VotingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleVote = async () => {
    setIsSubmitting(true);
    setMessage("");

    try {
      // Check if user has already voted (double-check)
      const { data: voteCheck } = await supabase
        .from("votes")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (voteCheck) {
        setMessage("You have already cast your vote!");
        setIsSubmitting(false);
        return;
      }

      // Cast the vote
      const { error } = await supabase.from("votes").insert({
        user_id: userId,
        work_id: workId,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error casting vote:", error);
        setMessage("Failed to cast vote. Please try again.");
      } else {
        setSuccess(true);
        setMessage("Thank you! Your vote has been cast successfully.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleChangeVote = async () => {
    setIsSubmitting(true);
    setMessage("");

    try {
      // Update existing vote
      const { error } = await supabase
        .from("votes")
        .update({
          work_id: workId,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating vote:", error);
        setMessage("Failed to update vote. Please try again.");
      } else {
        setSuccess(true);
        setMessage("Your vote has been updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (existingVote && existingVote.work_id === workId) {
    return (
      <div>
        <div className="bg-accent border border-border p-6 mb-6">
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-primary mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-lg font-semibold text-accent-foreground">
              Vote Already Cast
            </h3>
          </div>
          <p className="text-muted-foreground">
            You have already voted for this work. Thank you for participating!
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-border text-foreground hover:bg-accent transition-colors"
        >
          Back to Exhibition
        </Link>
      </div>
    );
  }

  if (existingVote && existingVote.work_id !== workId) {
    return (
      <div>
        <div className="bg-accent border border-border p-6 mb-6">
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-destructive mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-accent-foreground">
              Change Your Vote?
            </h3>
          </div>
          <p className="text-muted-foreground mb-4">
            You have already voted for another work. Would you like to change
            your vote to this work instead?
          </p>
          <p className="text-sm text-muted-foreground">
            Note: You can only vote for one work in total.
          </p>
        </div>

        {message && (
          <div
            className={`p-4 border mb-4 ${
              success
                ? "bg-accent text-accent-foreground border-border"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {message}
          </div>
        )}

        {!success && (
          <div className="flex gap-4">
            <button
              onClick={handleChangeVote}
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Changing Vote..." : "Change My Vote"}
            </button>
            <Link
              href="/"
              className="px-4 py-2 border border-border text-foreground hover:bg-accent transition-colors"
            >
              Keep Current Vote
            </Link>
          </div>
        )}

        {success && (
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-border text-foreground hover:bg-accent transition-colors"
          >
            Back to Exhibition
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="text-muted-foreground text-center mb-2">
          You are about to cast your vote for:
        </p>
        <h3 className="text-lg font-semibold text-foreground text-center">
          {workTitle}
        </h3>
        {authors && (
          <p className="text-sm text-primary font-medium text-center mt-1">
            by {authors}
          </p>
        )}
      </div>

      <div className="bg-accent border border-border p-4 mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Important:</strong> Each person can only vote once in the
          entire exhibition.
        </p>
        <p className="text-sm text-muted-foreground">
          Make sure this is the work you want to support!
        </p>
      </div>

      {message && (
        <div
          className={`p-4 border mb-4 ${
            success
              ? "bg-accent text-accent-foreground border-border"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {message}
        </div>
      )}

      {!success && (
        <div className="flex gap-4">
          <button
            onClick={handleVote}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Casting Vote...
              </span>
            ) : (
              "Cast My Vote"
            )}
          </button>
          <Link
            href="/"
            className="px-4 py-3 border border-border text-foreground hover:bg-accent transition-colors"
          >
            Cancel
          </Link>
        </div>
      )}

      {success && (
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Exhibition
          </Link>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Want to see the results? Check back after the voting period ends!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
