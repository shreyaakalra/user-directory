import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types";

export function UserCard({ user }: { user: User }) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Link href={`/users/${user.id}`} className="block h-full">
      <Card className="group h-full overflow-hidden border-muted-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <Avatar className="h-16 w-16 ring-2 ring-background ring-offset-2 ring-offset-muted transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-primary/10 font-medium text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-medium leading-none transition-colors group-hover:text-primary">
              {user.firstName} {user.lastName}
            </h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {user.company.title}
            </p>
          </div>

          <Badge variant="secondary" className="font-normal">
            {user.company.name}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}