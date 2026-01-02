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

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [fullname, setFullname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Person profile states
  const [personData, setPersonData] = useState<any>(null);
  const [personBio, setPersonBio] = useState<string>("");
  const [personTag, setPersonTag] = useState<string>("");
  const [personAffiliationId, setPersonAffiliationId] = useState<string>("");
  const [availableAffiliations, setAvailableAffiliations] = useState<
    Affiliation[]
  >([]);

  const getProfile = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Try to get existing profile or create one
      let { data, error } = await supabase
        .from("profiles")
        .select(`full_name, id, email, access_level`)
        .eq("id", user.id)
        .single();

      // If profile doesn't exist, create it
      if (error && error.code === "PGRST116") {
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email || "",
              full_name:
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                user.email?.split("@")[0] ||
                "User",
              access_level: "participant",
            },
          ])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          toast.error("Error creating profile");
          return;
        }
        data = newProfile;
      } else if (error) {
        console.error("Error loading profile:", error);
        toast.error("Error loading user data");
        return;
      }

      if (data) {
        setFullname(data.full_name);
        setUserId(data.id);
        setAccessLevel(data.access_level);
        setEmail(data.email);
      }

      // Fetch person data if it exists
      const { data: personData, error: personError } = await supabase
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
        .eq("user_id", user.id)
        .single();

      if (personData) {
        setPersonData(personData);
        setPersonBio(personData.bio || "");
        setPersonTag(personData.tag || "");
        setPersonAffiliationId(personData.affiliation_id || "");
      }

      // Fetch available affiliations
      const { data: affiliations, error: affiliationError } = await supabase
        .from("affiliation")
        .select("affiliation_id, name, short_name, type")
        .order("name");

      if (affiliations) {
        setAvailableAffiliations(affiliations);
      }
    } catch (error) {
      console.error("Error in getProfile:", error);
      toast.error("Error loading user data");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    if (!user?.id) return;

    try {
      setUpdating(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullname,
          email: email,
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setUpdating(false);
    }
  }

  const updatePersonProfile = async () => {
    if (!user?.id) return;

    try {
      setUpdating(true);

      // Check if person exists
      if (!personData) {
        // Create new person record
        const { data, error } = await supabase
          .from("person")
          .insert([
            {
              user_id: user.id,
              name: fullname || user.user_metadata?.full_name || "Unknown",
              bio: personBio,
              tag: personTag,
              affiliation_id:
                personAffiliationId === "none"
                  ? null
                  : personAffiliationId || null,
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
            affiliation_id:
              personAffiliationId === "none"
                ? null
                : personAffiliationId || null,
          })
          .eq("person_id", personData.person_id);

        if (error) throw error;
      }

      toast.success("Person profile updated successfully!");
      // Refresh the data
      await getProfile();
    } catch (error) {
      console.error("Error updating person profile:", error);
      toast.error("Error updating person profile");
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
            View your account information and access level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">User ID</Label>
              <p className="text-sm text-muted-foreground font-mono">
                {userId}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Access Level</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="capitalize">
                  {accessLevel || "participant"}
                </Badge>
              </div>
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm font-medium">
                Authentication Email
              </Label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your profile information used in work submissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your contact email"
            />
            <p className="text-sm text-muted-foreground">
              This email will be used for work-related communications
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Your full name as it appears in publications"
            />
            <p className="text-sm text-muted-foreground">
              This will be used as your author name in work submissions
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={updateProfile} disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Person Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Person Profile</CardTitle>
          <CardDescription>
            Manage your personal information used in work attributions and
            public display
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personBio">Bio</Label>
            <Textarea
              id="personBio"
              value={personBio}
              onChange={(e) => setPersonBio(e.target.value)}
              placeholder="Brief description about yourself"
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              This will be displayed on your public profile
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personTag">Tag/Role</Label>
            <Input
              id="personTag"
              type="text"
              value={personTag}
              onChange={(e) => setPersonTag(e.target.value)}
              placeholder="e.g. Committee, Operations, Volunteer"
            />
            <p className="text-sm text-muted-foreground">
              Your role or tag that will be displayed as a badge
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
                <SelectValue placeholder="Select your affiliation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No affiliation</SelectItem>
                {availableAffiliations.map((affiliation) => (
                  <SelectItem
                    key={affiliation.affiliation_id}
                    value={affiliation.affiliation_id}
                  >
                    {affiliation.short_name
                      ? `${affiliation.name} (${affiliation.short_name})`
                      : affiliation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Your institutional affiliation. Only you can change this.
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

          <div className="flex justify-end space-x-4">
            <Button onClick={updatePersonProfile} disabled={updating}>
              {updating ? "Updating..." : "Update Person Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Work Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Your Work Statistics</CardTitle>
          <CardDescription>
            Summary of your contributions to the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">
                Works Submitted
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Draft Works</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">
                Published Works
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
