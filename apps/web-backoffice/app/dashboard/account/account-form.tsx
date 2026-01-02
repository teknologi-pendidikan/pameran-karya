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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Affiliation {
  affiliation_id: string;
  name: string;
  short_name?: string;
  type: string;
}

interface PersonData {
  person_id: string;
  name: string;
  bio: string | null;
  tag: string | null;
  affiliation_id: string | null;
  affiliation?: Affiliation;
}

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Profile states
  const [fullname, setFullname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);

  // Person profile states
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [personBio, setPersonBio] = useState<string>("");
  const [personTag, setPersonTag] = useState<string>("");
  const [personAffiliationId, setPersonAffiliationId] = useState<string>("");
  const [availableAffiliations, setAvailableAffiliations] = useState<
    Affiliation[]
  >([]);

  const getProfile = useCallback(async () => {
    try {
      if (!user?.id) throw new Error("No user");

      // Get profile data
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setEmail(data.email);
        setAccessLevel(data.access_level);
      }

      // Fetch person data if it exists
      const { data: personData } = await supabase
        .from("person")
        .select(
          `
          person_id,
          name,
          bio,
          tag,
          affiliation_id,
          affiliation(
            affiliation_id,
            name,
            short_name,
            type
          )
        `
        )
        .eq("profile_id", user.id)
        .single();

      if (personData) {
        setPersonData({
          ...personData,
          affiliation: Array.isArray(personData.affiliation)
            ? personData.affiliation[0]
            : personData.affiliation,
        });
        setPersonBio(personData.bio || "");
        setPersonTag(personData.tag || "");
        setPersonAffiliationId(personData.affiliation_id || "");
      }

      // Fetch available affiliations
      const { data: affiliations } = await supabase
        .from("affiliation")
        .select("affiliation_id, name, short_name, type")
        .order("name");

      if (affiliations) {
        setAvailableAffiliations(affiliations);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Error loading profile data");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "operations":
        return (
          <Badge className="bg-yellow-500 text-white text-xs px-2 py-0.5">
            OPERATIONS
          </Badge>
        );
      case "curator":
        return (
          <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
            CURATOR
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            PARTICIPANT
          </Badge>
        );
    }
  };

  const updateAllProfiles = async () => {
    if (!user?.id) return;
    setUpdating(true);

    try {
      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullname,
          email: email,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Update or create person record
      if (!personData) {
        // Create new person record
        const { data, error } = await supabase
          .from("person")
          .insert([
            {
              profile_id: user.id,
              name: fullname || user.user_metadata?.full_name || "Unknown",
              bio: personBio,
              tag: personTag,
              affiliation_id: personAffiliationId || null,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        setPersonData(data);
      } else {
        // Update existing person record
        const { error } = await supabase
          .from("person")
          .update({
            bio: personBio,
            tag: personTag,
            affiliation_id: personAffiliationId || null,
          })
          .eq("person_id", personData.person_id);

        if (error) throw error;
      }

      toast.success("Profile updated successfully!");
      await getProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>
            Your account information and access level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Access Level</Label>
              <div className="flex items-center gap-2 mt-1">
                {getAccessLevelBadge(accessLevel || "participant")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unified Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information used in work submissions and public
            display
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your contact email"
              />
              <p className="text-sm text-muted-foreground">
                Used for work-related communications
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                value={fullname || ""}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Your full name as it appears in publications"
                required
              />
              <p className="text-sm text-muted-foreground">
                Used in work submissions and certificates
              </p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="personBio">Bio</Label>
              <Textarea
                id="personBio"
                value={personBio}
                onChange={(e) => setPersonBio(e.target.value)}
                placeholder="Brief description about yourself and your expertise"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                Optional - displayed on your public profile
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="personTag">Role/Title</Label>
              <Input
                id="personTag"
                type="text"
                value={personTag}
                onChange={(e) => setPersonTag(e.target.value)}
                placeholder="e.g., Student, Lecturer, Researcher"
              />
              <p className="text-sm text-muted-foreground">
                Optional - your role or academic title
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliation">Affiliation</Label>
              <Select
                value={personAffiliationId || "none"}
                onValueChange={(value) =>
                  setPersonAffiliationId(value === "none" ? "" : value)
                }
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
                            ({affiliation.short_name})
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

            {personData?.affiliation && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">Current Affiliation:</p>
                <p className="text-sm text-muted-foreground">
                  {personData.affiliation.name}
                  {personData.affiliation.short_name &&
                    ` (${personData.affiliation.short_name})`}
                  <span className="ml-2 text-xs capitalize px-2 py-1 bg-secondary rounded">
                    {personData.affiliation.type}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Single Update Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={updateAllProfiles} disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
