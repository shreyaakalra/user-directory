import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Building2 } from "lucide-react";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let user;

  try {
    user = await getUserById(id);
  } catch {
    notFound();
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to directory
        </Button>
      </Link>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h1 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">{user.company.title}</p>
              <Badge variant="secondary" className="font-normal">
                {user.company.name}
              </Badge>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>
                {user.company.department} · {user.company.name}
              </span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <span>
                {user.address.address}, {user.address.city}, {user.address.state}{" "}
                {user.address.postalCode}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}