"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Work, getFirstAuthor } from "@/lib/client-utils";
import { format } from "date-fns";
import Link from "next/link";
import { ExternalLinkIcon, SearchIcon } from "lucide-react";

interface WorksListProps {
  works: Work[];
}

export function WorksList({ works }: WorksListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("created_at");

  // Filter and sort works
  const filteredWorks = works
    .filter((work) => {
      const matchesSearch =
        work.title.toLowerCase().includes(search.toLowerCase()) ||
        work.abstract?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || work.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "status":
          return a.status.localeCompare(b.status);
        case "created_at":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "draft":
        return "secondary";
      case "final":
        return "default";
      case "archived":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "final":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search works by title or abstract..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="final">Final</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Date Created</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredWorks.length} of {works.length} works
      </p>

      {/* Works list */}
      {filteredWorks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No works found matching your criteria.
          </p>
          {works.length === 0 && (
            <div className="mt-4">
              <Link href="/dashboard/works/new">
                <Button>Submit Your First Work</Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWorks.map((work) => (
            <div
              key={work.work_id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <Link
                    href={`/dashboard/works/${work.work_id}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {work.title}
                  </Link>
                  {(() => {
                    const firstAuthor = getFirstAuthor(work);
                    return firstAuthor ? (
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Author:</span>{" "}
                        {firstAuthor.name}
                        {firstAuthor.affiliation && (
                          <span className="text-xs">
                            {" "}
                            · {firstAuthor.affiliation}
                          </span>
                        )}
                      </div>
                    ) : null;
                  })()}
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={getStatusBadgeVariant(work.status)}
                      className={getStatusColor(work.status)}
                    >
                      {work.status.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(work.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <Link href={`/dashboard/works/${work.work_id}`}>
                  <Button variant="ghost" size="sm">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {work.abstract && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {work.abstract.substring(0, 200)}
                  {work.abstract.length > 200 && "..."}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Slug: {work.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
