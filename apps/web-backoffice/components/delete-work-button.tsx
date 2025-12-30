"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon, LoaderIcon } from "lucide-react";
import { deleteWorkAction } from "@/lib/actions";
import { toast } from "sonner";

interface DeleteWorkButtonProps {
  workId: string;
  workTitle: string;
  isMobile?: boolean;
}

export function DeleteWorkButton({
  workId,
  workTitle,
  isMobile = false,
}: DeleteWorkButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteWorkAction(workId);
      toast.success("Work deleted successfully");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error deleting work:", error);
      toast.error("Failed to delete work. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size={isMobile ? "default" : "lg"}
          className={`!rounded-none border-2 ${
            isMobile
              ? "w-full px-4 py-3 text-base font-medium"
              : "px-6 py-3 text-base font-medium"
          }`}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <LoaderIcon
              className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} mr-2 sm:mr-3 animate-spin`}
            />
          ) : (
            <TrashIcon
              className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} mr-2 sm:mr-3`}
            />
          )}
          {isDeleting ? "Deleting..." : "Delete Work"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>This will permanently delete the work:</p>
            <p className="font-semibold text-foreground">{workTitle}</p>
            <p>
              This action cannot be undone. All associated data including
              categories, contributors, and assets will be permanently removed.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete Work
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
