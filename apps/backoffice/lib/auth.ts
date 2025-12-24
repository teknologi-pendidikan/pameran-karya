import { createClient } from "@/lib/supabase/server";

export type UserRole = "admin" | "user";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // For now, we'll determine role based on email domain or a simple rule
    // In a real app, you'd store this in a profiles table
    const role: UserRole =
      user.email?.includes("@admin") || user.email?.includes("@pamerankarya")
        ? "admin"
        : "user";

    return {
      id: user.id,
      email: user.email!,
      role,
      created_at: user.created_at,
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
