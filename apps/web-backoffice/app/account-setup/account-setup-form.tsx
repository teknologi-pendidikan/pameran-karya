"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface Affiliation {
  affiliation_id: string;
  name: string;
  short_name?: string;
  type: string;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
}

export default function AccountSetupForm({
  user,
  profile,
  fromWorkSubmission = false,
}: {
  user: User | null;
  profile: Profile;
  fromWorkSubmission?: boolean;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [bio, setBio] = useState("");
  const [tag, setTag] = useState("");
  const [affiliationId, setAffiliationId] = useState("");
  const [availableAffiliations, setAvailableAffiliations] = useState<
    Affiliation[]
  >([]);

  const loadAffiliations = useCallback(async () => {
    try {
      const { data: affiliations, error } = await supabase
        .from("affiliation")
        .select("affiliation_id, name, short_name, type")
        .order("name");

      if (error) throw error;
      if (affiliations) {
        setAvailableAffiliations(affiliations);
      }
    } catch (error) {
      console.error("Error loading affiliations:", error);
      toast.error("Error loading affiliations");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadAffiliations();
  }, [loadAffiliations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    setSubmitting(true);

    try {
      // Check if person record exists, if not create it
      const { data: existingPerson } = await supabase
        .from("person")
        .select("person_id")
        .eq("profile_id", user?.id)
        .single();

      if (existingPerson) {
        // Update existing person record
        const { error: personError } = await supabase
          .from("person")
          .update({
            name: fullName.trim(),
            bio: bio.trim() || null,
            tag: tag.trim() || null,
            affiliation_id:
              affiliationId === "none" ? null : affiliationId || null,
          })
          .eq("profile_id", user?.id);

        if (personError) throw personError;
      } else {
        // Create new person record if it doesn't exist
        const { generateSlug } = await import("@/lib/client-utils");
        const baseSlug = generateSlug(fullName.trim());

        const { error: personError } = await supabase.from("person").insert([
          {
            profile_id: user?.id,
            name: fullName.trim(),
            bio: bio.trim() || null,
            tag: tag.trim() || null,
            affiliation_id:
              affiliationId === "none" ? null : affiliationId || null,
            slug: `${baseSlug}-${Date.now()}`, // Simple unique slug generation
          },
        ]);

        if (personError) throw personError;
      }

      toast.success("Account setup completed successfully!");
      if (fromWorkSubmission) {
        router.push("/dashboard/works/new");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error completing setup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading setup form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Account Setup</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Complete your profile to get started with submitting your works
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {fromWorkSubmission
                  ? "Profile Required"
                  : "Welcome to Pameran Karya!"}
              </h2>
              <p className="text-gray-600">
                {fromWorkSubmission
                  ? "To submit your work, you need to complete your profile first. Your name will be used for work attribution and certificates."
                  : "Let's set up your profile to get started. This information will be used when you submit works and appears on your certificates."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Setup Form */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Fill in your information below. Required fields are marked with *
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name as it appears in publications"
                required
              />
              <p className="text-sm text-muted-foreground">
                This will appear on your works and certificates
              </p>
            </div>

            {/* Bio and Tag in grid layout for larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief description about yourself and your expertise"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Optional - displayed on your public profile
                </p>
              </div>

              {/* Tag/Role */}
              <div className="space-y-2">
                <Label htmlFor="tag">Role/Title</Label>
                <Input
                  id="tag"
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g., Student, Lecturer, Researcher"
                />
                <p className="text-sm text-muted-foreground">
                  Optional - your role or academic title
                </p>
              </div>
            </div>

            {/* Affiliation */}
            <div className="space-y-2">
              <Label htmlFor="affiliation">Affiliation</Label>
              <Select
                value={affiliationId || "none"}
                onValueChange={setAffiliationId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your institution (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No affiliation</SelectItem>
                  {availableAffiliations.map((affiliation) => (
                    <SelectItem
                      key={affiliation.affiliation_id}
                      value={affiliation.affiliation_id}
                    >
                      <div className="flex flex-col">
                        <span>{affiliation.name}</span>
                        {affiliation.short_name && (
                          <span className="text-xs text-muted-foreground">
                            {affiliation.short_name}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Optional - your university, company, or organization
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Setting up..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Text */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">
            You can always update this information later in your account
            settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
