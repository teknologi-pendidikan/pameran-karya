"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/error?message=" + encodeURIComponent(error.message));
  }

  return redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
      }/dashboard`,
    },
  });

  if (error) {
    return redirect("/error?message=" + encodeURIComponent(error.message));
  }

  return redirect("/auth?message=Check your email for confirmation");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect("/auth");
}
