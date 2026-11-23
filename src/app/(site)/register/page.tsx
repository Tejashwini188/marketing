import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Register free — CSP Matrimony" };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <AuthShell
      title={<>Create your <em className="italic text-maroon">profile</em></>}
      subtitle="It takes about 3 minutes. You can add photos and partner preferences from your dashboard."
    >
      <RegisterForm />
    </AuthShell>
  );
}
