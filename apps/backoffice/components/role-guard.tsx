import { getUserProfile, UserRole } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallbackUrl?: string;
}

export async function RoleGuard({
  allowedRoles,
  children,
  fallbackUrl = "/dashboard",
}: RoleGuardProps) {
  const user = await getUserProfile();

  if (!user) {
    redirect("/auth");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(fallbackUrl);
  }

  return <>{children}</>;
}

// For client components
interface ClientRoleGuardProps {
  userRole: UserRole | null;
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientRoleGuard({
  userRole,
  allowedRoles,
  children,
  fallback = null,
}: ClientRoleGuardProps) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
