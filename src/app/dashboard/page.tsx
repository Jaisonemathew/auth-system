"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      {session ? (
        <div>
          <p>Welcome, {session.user?.name || session.user?.email}</p>
          <div className="mt-4">
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
          <Alert className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>Welcome to the User Dashboard</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div>
          <p>Redirecting to login...</p>
        </div>
      )}
    </div>
  );
}