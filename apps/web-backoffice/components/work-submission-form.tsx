"use client";

import { useState, useTransition } from "react";
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
import {
  type Category,
  type Affiliation,
  getAllowedStatusOptions,
} from "@/lib/client-utils";
import { createWorkAction } from "@/lib/actions";
import { toast } from "sonner";

const workSchema = z.object({
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
  assetUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "At least one asset is required"),
  assetType: z.enum(["image", "video", "audio", "document", "link"]),
});

type WorkFormData = z.infer<typeof workSchema>;

interface WorkSubmissionFormProps {
  categories: Category[];
  userProfile?: {
    full_name: string;
    access_level: string;
  } | null;
}

export function WorkSubmissionForm({
  categories,
  userProfile,
}: WorkSubmissionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get allowed status options based on user role
  const allowedStatuses = getAllowedStatusOptions(
    userProfile?.access_level || "participant"
  );

  const form = useForm<WorkFormData>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: "",
      abstract: "",
      status: "draft",
      categories: [],
      assetUrl: "",
      assetType: "link",
    },
  });

  function onSubmit(data: WorkFormData) {
    startTransition(async () => {
      try {
        const result = await createWorkAction({
          title: data.title,
          abstract: data.abstract,
          status: data.status,
          categories: data.categories,
          assetUrl: data.assetUrl,
          assetType: data.assetType,
        });

        if (result.success) {
          toast.success("Work submitted successfully!");
          router.push(`/dashboard/works/${result.workId}/edit`);
        } else {
          toast.error(
            result.error || "Failed to submit work. Please try again."
          );
        }
      } catch (error) {
        console.error("Error submitting work:", error);
        toast.error("Failed to submit work. Please try again.");
      }
    });
  }

  const addCategory = (categoryId: string) => {
    if (!selectedCategories.includes(categoryId)) {
      const newCategories = [...selectedCategories, categoryId];
      setSelectedCategories(newCategories);
      form.setValue("categories", newCategories);
    }
  };

  const removeCategory = (categoryId: string) => {
    const newCategories = selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(newCategories);
    form.setValue("categories", newCategories);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Submit New Work</CardTitle>
        <CardDescription>
          Submit your academic work for review and publication. Author
          information will be taken from your account profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Author Profile Info */}
            {userProfile?.full_name && (
              <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-medium mb-2">Author Information</h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Name:</span>{" "}
                  {userProfile.full_name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your name and affiliation will be pulled from your Account
                  settings.
                  <br />
                  To update this information, go to Dashboard → Account.
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your work title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of your academic work
                  </FormDescription>
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
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A comprehensive summary of your work (minimum 10 characters)
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
                    {userProfile?.access_level === "participant"
                      ? "Participants can set status as Draft or Ready for Review. Only curators can mark as Final."
                      : "Choose the appropriate status for your work submission."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Categories</FormLabel>
              <div className="space-y-2">
                <Select onValueChange={addCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select categories for your work" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.category_id}
                        value={category.category_id}
                        disabled={selectedCategories.includes(
                          category.category_id
                        )}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.category_id === categoryId
                      );
                      return category ? (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeCategory(categoryId)}
                        >
                          {category.label} ×
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Select one or more categories that best describe your work.
                Click on a badge to remove it.
              </p>
              {form.formState.errors.categories && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.categories.message}
                </p>
              )}
            </div>

            {/* Basic Asset */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Basic Asset (Required)</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="assetUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/your-file"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL to your file, document, or resource
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="assetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="link">Link/Website</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Type of asset youre linking
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Work"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
