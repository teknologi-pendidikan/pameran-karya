import Link from "next/link";
import { getUserProfile } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getUserProfile();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Pameran Karya</h1>
            <p className="py-6">
              A modern platform for managing and submitting creative works. Join
              our community of artists, designers, and creators.
            </p>
            <Link href="/auth" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
