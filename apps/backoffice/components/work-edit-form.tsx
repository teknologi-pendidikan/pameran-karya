"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { type Category, getAllowedStatusOptions } from "@/lib/client-utils";
import { updateWorkAction } from "@/lib/actions";
import { toast } from "sonner";
import { AssetManager } from "@/components/asset-manager";
import { ContributorManager } from "@/components/contributor-manager";

const editWorkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  abstract: z
    .string()
    .min(10, "Abstract must be at least 10 characters")
    .max(2000, "Abstract must be less than 2000 characters"),
  status: z.enum(["draft", "ready", "final"]),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
});

type EditWorkFormData = z.infer<typeof editWorkSchema>;

interface Asset {
  asset_id: string;
  work_id: string;
  type: "image" | "video" | "audio" | "document" | "link";
  file_url: string;
  thumbnail_url?: string;
  license?: string;
  created_at: string;
}

interface WorkPerson {
  person_id: string;
  contribution_role?: string;
  ordering?: number;
  person: {
    person_id: string;
    name: string;
    slug: string;
    affiliation?: string;
    bio?: string;
    tag?: string;
  };
}

interface Work {
  work_id: string;
  title: string;
  abstract: string;
  status: string;
  work_category: Array<{
    category: {
      category_id: string;
      label: string;
    };
  }>;
  asset?: Asset[];
  work_person?: WorkPerson[];
}

interface WorkEditFormProps {
  work: Work;
  categories: Category[];
  userProfile: {
    id: string;
    access_level: string;
    full_name: string;
    email: string;
  };
  onUpdate?: (updatedWork: any) => void;
}

export function WorkEditForm({
  work,
  categories,
  userProfile,
  onUpdate,
}: WorkEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    work.work_category.map((wc) => wc.category.category_id)
  );
  const [assets, setAssets] = useState<Asset[]>(work.asset || []);
  const [contributors, setContributors] = useState<WorkPerson[]>(
    work.work_person || []
  );

  // Get allowed status options based on user role
  const allowedStatuses = getAllowedStatusOptions(userProfile.access_level);

  const form = useForm<EditWorkFormData>({
    resolver: zodResolver(editWorkSchema),
    defaultValues: {
      title: work.title,
      abstract: work.abstract,
      status: work.status as "draft" | "ready" | "final",
      categories: work.work_category.map((wc) => wc.category.category_id),
    },
  });

  // Update categories when selectedCategories changes
  useEffect(() => {
    form.setValue("categories", selectedCategories);
  }, [selectedCategories, form]);

  function onSubmit(data: EditWorkFormData) {
    startTransition(async () => {
      try {
        const result = await updateWorkAction(work.work_id, {
          title: data.title,
          abstract: data.abstract,
          status: data.status,
          categories: data.categories,
        });

        if (result.success) {
          toast.success("Work updated successfully!");
          if (onUpdate) {
            onUpdate(data);
          }
          router.refresh();
        } else {
          toast.error(
            result.error || "Failed to update work. Please try again."
          );
        }
      } catch (error) {
        console.error("Error updating work:", error);
        toast.error("Failed to update work. Please try again.");
      }
    });
  }

  const addCategory = (categoryId: string) => {
    if (!selectedCategories.includes(categoryId)) {
      const newCategories = [...selectedCategories, categoryId];
      setSelectedCategories(newCategories);
    }
  };

  const removeCategory = (categoryId: string) => {
    const newCategories = selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(newCategories);
  };

  const getSelectedCategoryNames = () => {
    return selectedCategories
      .map((id) => categories.find((cat) => cat.category_id === id)?.label)
      .filter(Boolean);
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Work</CardTitle>
          <CardDescription>
            Update your work information and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your work title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="abstract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abstract</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed abstract of your work..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A comprehensive summary of your work&apos;s objectives,
                      methods, and key findings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allowedStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {userProfile.access_level === "participant"
                        ? "Participants can set status as Draft or Ready for Review. Only curators can mark as Final."
                        : "Draft works can be edited freely. Ready works are awaiting review. Final works are approved for publication."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <div className="space-y-4">
                      <Select onValueChange={addCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Add a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter(
                              (category) =>
                                !selectedCategories.includes(
                                  category.category_id
                                )
                            )
                            .map((category) => (
                              <SelectItem
                                key={category.category_id}
                                value={category.category_id}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      {selectedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {getSelectedCategoryNames().map(
                            (categoryName, index) => (
                              <Badge
                                key={selectedCategories[index]}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {categoryName}
                                <X
                                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                                  onClick={() =>
                                    removeCategory(selectedCategories[index])
                                  }
                                />
                              </Badge>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <FormDescription>
                      Select relevant categories for your work to help with
                      discoverability.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Asset Management */}
      <Card className="w-full max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Assets</CardTitle>
          <CardDescription>
            Manage files and media for this work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssetManager
            workId={work.work_id}
            assets={assets}
            onAssetsChange={setAssets}
          />
        </CardContent>
      </Card>

      {/* Contributor Management */}
      <Card className="w-full max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Contributors</CardTitle>
          <CardDescription>
            Add collaborators and link existing profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContributorManager
            workId={work.work_id}
            contributors={contributors}
            onContributorsChange={setContributors}
          />
        </CardContent>
      </Card>
    </>
  );
}
