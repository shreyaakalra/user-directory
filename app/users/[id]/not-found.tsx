import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserX, ArrowLeft } from "lucide-react";

export default function UserNotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="rounded-full bg-muted p-4">
        <UserX className="h-8 w-8 text-muted-foreground" />
      </div>

      <h1 className="mt-6 text-xl font-semibold">User not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This person doesn&apos;t exist or may have been removed from the directory.
      </p>

      <Link href="/">
        <Button variant="outline" className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to directory
        </Button>
      </Link>
    </main>
  );
}