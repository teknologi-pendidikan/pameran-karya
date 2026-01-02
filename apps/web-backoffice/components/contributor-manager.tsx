"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Search, User } from "lucide-react";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Person {
  person_id: string;
  name: string;
  slug: string;
  affiliation_id?: string;
  bio?: string;
  tag?: string;
  affiliation?: {
    affiliation_id: string;
    name: string;
    short_name?: string;
    type: string;
  };
}

interface WorkPerson {
  person_id: string;
  contribution_role?: string;
  ordering?: number;
  person: Person;
}

interface ContributorManagerProps {
  workId: string;
  contributors: WorkPerson[];
  onContributorsChange: (contributors: WorkPerson[]) => void;
}

export function ContributorManager({
  workId,
  contributors,
  onContributorsChange,
}: ContributorManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [showAddForm, setShowAddForm] = useState(false);
  const [availablePeople, setAvailablePeople] = useState<Person[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [newContributor, setNewContributor] = useState({
    contribution_role: "Collaborator",
    ordering: contributors.length + 1,
  });

  // Load available people
  useEffect(() => {
    const loadPeople = async () => {
      try {
        const response = await fetch("/api/people");
        if (response.ok) {
          const people = await response.json();
          setAvailablePeople(people);
        }
      } catch (error) {
        console.error("Error loading people:", error);
      }
    };

    if (showAddForm) {
      loadPeople();
    }
  }, [showAddForm]);

  const contributionRoles = [
    "First Author",
    "Co-Author",
    "Collaborator",
    "Advisor",
    "Supervisor",
    "Contributor",
    "Designer",
    "Developer",
    "Researcher",
    "Editor",
    "Reviewer",
  ];

  const handleAddContributor = () => {
    if (!selectedPerson) {
      toast.error("Please select a person");
      return;
    }

    // Check if person is already a contributor
    if (contributors.some((c) => c.person_id === selectedPerson.person_id)) {
      toast.error("This person is already a contributor");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/works/${workId}/contributors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person_id: selectedPerson.person_id,
            contribution_role: newContributor.contribution_role,
            ordering: newContributor.ordering,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add contributor");
        }

        const newWorkPerson: WorkPerson = {
          person_id: selectedPerson.person_id,
          contribution_role: newContributor.contribution_role,
          ordering: newContributor.ordering,
          person: selectedPerson,
        };

        onContributorsChange([...contributors, newWorkPerson]);

        // Reset form
        setSelectedPerson(null);
        setNewContributor({
          contribution_role: "Collaborator",
          ordering: contributors.length + 2,
        });
        setShowAddForm(false);
        toast.success("Contributor added successfully");
      } catch (error) {
        console.error("Error adding contributor:", error);
        toast.error("Failed to add contributor");
      }
    });
  };

  const handleRemoveContributor = (personId: string) => {
    startTransition(async () => {
      try {
        const response = await fetch(
          `/api/works/${workId}/contributors/${personId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to remove contributor");
        }

        onContributorsChange(
          contributors.filter((c) => c.person_id !== personId)
        );
        toast.success("Contributor removed successfully");
      } catch (error) {
        console.error("Error removing contributor:", error);
        toast.error("Failed to remove contributor");
      }
    });
  };

  const handleUpdateContributor = (
    personId: string,
    updates: Partial<WorkPerson>
  ) => {
    startTransition(async () => {
      try {
        const response = await fetch(
          `/api/works/${workId}/contributors/${personId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update contributor");
        }

        const updatedContributors = contributors.map((c) =>
          c.person_id === personId ? { ...c, ...updates } : c
        );
        onContributorsChange(updatedContributors);
        toast.success("Contributor updated successfully");
      } catch (error) {
        console.error("Error updating contributor:", error);
        toast.error("Failed to update contributor");
      }
    });
  };

  const filteredPeople = availablePeople.filter(
    (person) => !contributors.some((c) => c.person_id === person.person_id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Contributors ({contributors.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage contributor roles and ordering. Affiliations are managed by
            users in their account settings.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contributor
        </Button>
      </div>

      {/* Add Contributor Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add New Contributor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Person *</Label>
              <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchOpen}
                    className="w-full justify-between"
                  >
                    {selectedPerson ? (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div className="text-left">
                          <div>{selectedPerson.name}</div>
                          {selectedPerson.affiliation?.name && (
                            <div className="text-xs text-muted-foreground">
                              {selectedPerson.affiliation.name}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search for a person...
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search people..." />
                    <CommandList>
                      <CommandEmpty>No person found.</CommandEmpty>
                      <CommandGroup>
                        {filteredPeople.map((person) => (
                          <CommandItem
                            key={person.person_id}
                            value={`${person.name} ${person.affiliation?.name || ""}`}
                            onSelect={() => {
                              setSelectedPerson(person);
                              setSearchOpen(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <div className="font-medium">{person.name}</div>
                              {person.affiliation?.name && (
                                <div className="text-sm text-muted-foreground">
                                  {person.affiliation.name}
                                </div>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contribution-role">Role</Label>
                <Select
                  value={newContributor.contribution_role}
                  onValueChange={(value) =>
                    setNewContributor({
                      ...newContributor,
                      contribution_role: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contributionRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ordering">Order</Label>
                <Input
                  id="ordering"
                  type="number"
                  min="1"
                  value={newContributor.ordering}
                  onChange={(e) =>
                    setNewContributor({
                      ...newContributor,
                      ordering: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={handleAddContributor}
                disabled={isPending || !selectedPerson}
              >
                Add Contributor
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedPerson(null);
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Contributors */}
      {contributors.length > 0 && (
        <div className="space-y-3">
          {contributors
            .sort((a, b) => (a.ordering || 0) - (b.ordering || 0))
            .map((contributor, index) => (
              <Card key={`${contributor.person_id}-${index}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">
                          {contributor.person.name}
                        </h4>
                        {contributor.contribution_role && (
                          <Badge variant="secondary">
                            {contributor.contribution_role}
                          </Badge>
                        )}
                        {contributor.ordering && (
                          <Badge variant="outline" className="text-xs">
                            #{contributor.ordering}
                          </Badge>
                        )}
                      </div>

                      {contributor.person.affiliation?.name && (
                        <div className="text-sm text-muted-foreground mb-1">
                          <span className="text-xs text-gray-500">
                            Affiliation:
                          </span>{" "}
                          {contributor.person.affiliation.name}
                        </div>
                      )}

                      {contributor.person.bio && (
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {contributor.person.bio}
                        </div>
                      )}

                      <div className="flex gap-2 mt-2">
                        <Select
                          value={
                            contributor.contribution_role || "Collaborator"
                          }
                          onValueChange={(value) =>
                            handleUpdateContributor(contributor.person_id, {
                              contribution_role: value,
                            })
                          }
                          disabled={isPending}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {contributionRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          type="number"
                          min="1"
                          value={contributor.ordering || 1}
                          onChange={(e) =>
                            handleUpdateContributor(contributor.person_id, {
                              ordering: parseInt(e.target.value) || 1,
                            })
                          }
                          className="w-20"
                          disabled={isPending}
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleRemoveContributor(contributor.person_id)
                      }
                      disabled={isPending}
                      className="text-destructive hover:text-destructive ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {contributors.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-muted-foreground">
          No contributors added yet. Click Add Contributor to get started.
        </div>
      )}
    </div>
  );
}
