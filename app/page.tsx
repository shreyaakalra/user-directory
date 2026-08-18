import { UserGrid } from "@/components/ui/user-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-muted/40 to-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-3 text-center sm:text-left">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Team directory
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Find anyone on the team
          </h1>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:mx-0 sm:text-base">
            Browse profiles, roles, and contact info across every department search by name or company to narrow it down.
          </p>
        </div>

        <UserGrid />
      </div>
    </main>
  );
}