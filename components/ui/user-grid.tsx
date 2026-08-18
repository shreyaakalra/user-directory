"use client";

import { useEffect, useMemo, useState } from "react";
import { User } from "@/lib/types";
import { getUsers } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserCard } from "./user-card";
import { SearchBar } from "./search-bar";

export function UserGrid() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

  const loadUsers = async () => {
    setStatus("loading");
    try {
      const data = await getUsers();
      setUsers(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    async function loadingUsers(){
        loadUsers();
    }
    loadingUsers();
    
  }, []);

  const filteredUsers = useMemo(() => {
    if (!query) return users;
    const lower = query.toLowerCase();
    return users.filter(
      (u) =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(lower) ||
        u.company.name.toLowerCase().includes(lower)
    );
  }, [users, query]);

  const stats = useMemo(() => {
    const companies = new Set(users.map((u) => u.company.name));
    const departments = new Set(users.map((u) => u.company.department));
    return {
      totalUsers: users.length,
      totalCompanies: companies.size,
      totalDepartments: departments.size,
    };
  }, [users]);

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card/30 py-20 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div className="space-y-1">
          <p className="font-medium">Couldn&apos;t load the directory</p>
          <p className="text-sm text-muted-foreground">
            Check your connection and try again.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadUsers} className="mt-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} />
        {status === "success" && (
          <p className="text-sm text-muted-foreground">
            {filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {status === "loading"
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[220px] rounded-xl" />
            ))
          : filteredUsers.map((user) => <UserCard key={user.id} user={user} />)}
      </div>

      {status === "success" && filteredUsers.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <div className="rounded-full bg-muted p-3">
            <UserX className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">No matches</p>
            <p className="text-sm text-muted-foreground">
              Nobody found for {query}. Try a different search.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}