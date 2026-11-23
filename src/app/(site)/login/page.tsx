import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Log in — CSP Matrimony" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getCurrentUser()) redirect("/dashboard");
  const { next = "/dashboard" } = await searchParams;
  return (
    <AuthShell
      title={<>Welcome <em className="italic text-maroon">back</em></>}
      subtitle="Log in to see your dashboard, matches and search."
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
