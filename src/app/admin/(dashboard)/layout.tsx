import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/supabase/admin";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdminUser();
  if (!admin) {
    redirect("/admin/login?error=not_admin");
  }

  return children;
}
