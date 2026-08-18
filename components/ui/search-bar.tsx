"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="absolute left-3.5 top-1/2 h-4 w-10 -translate-y-1/2 text-muted-foreground pr-3" />
      <Input
        placeholder="Search by name or company..."
        className="h-11 rounded-full border-muted-foreground/20 bg-card pl-10 shadow-sm transition-shadow focus-visible:shadow-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}