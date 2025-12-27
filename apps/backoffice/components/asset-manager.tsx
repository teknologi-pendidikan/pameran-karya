"use client";

import { useState, useTransition } from "react";
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
import { X, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Asset {
  asset_id: string;
  work_id: string;
  type: "image" | "video" | "audio" | "document" | "link";
  file_url: string;
  thumbnail_url?: string;
  license?: string;
  created_at: string;
}

interface AssetManagerProps {
  workId: string;
  assets: Asset[];
  onAssetsChange: (assets: Asset[]) => void;
}

export function AssetManager({
  workId,
  assets,
  onAssetsChange,
}: AssetManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [newAsset, setNewAsset] = useState<{
    type: "image" | "video" | "audio" | "document" | "link";
    file_url: string;
    thumbnail_url: string;
    license: string;
  }>({
    type: "link",
    file_url: "",
    thumbnail_url: "",
    license: "All Rights Reserved",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddAsset = () => {
    if (!newAsset.file_url.trim()) {
      toast.error("Please provide a file URL");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            work_id: workId,
            type: newAsset.type,
            file_url: newAsset.file_url,
            thumbnail_url: newAsset.thumbnail_url || null,
            license: newAsset.license,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add asset");
        }

        const addedAsset = await response.json();
        onAssetsChange([...assets, addedAsset]);

        // Reset form
        setNewAsset({
          type: "link" as "image" | "video" | "audio" | "document" | "link",
          file_url: "",
          thumbnail_url: "",
          license: "All Rights Reserved",
        });
        setShowAddForm(false);
        toast.success("Asset added successfully");
      } catch (error) {
        console.error("Error adding asset:", error);
        toast.error("Failed to add asset");
      }
    });
  };

  const handleRemoveAsset = (assetId: string) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/assets/${assetId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to remove asset");
        }

        onAssetsChange(assets.filter((asset) => asset.asset_id !== assetId));
        toast.success("Asset removed successfully");
      } catch (error) {
        console.error("Error removing asset:", error);
        toast.error("Failed to remove asset");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Assets ({assets.length})</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Add Asset Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add New Asset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="asset-type">Asset Type</Label>
                <Select
                  value={newAsset.type}
                  onValueChange={(
                    value: "image" | "video" | "audio" | "document" | "link"
                  ) => setNewAsset({ ...newAsset, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Link/Website</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="asset-license">License</Label>
                <Select
                  value={newAsset.license}
                  onValueChange={(value) =>
                    setNewAsset({ ...newAsset, license: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Rights Reserved">
                      All Rights Reserved
                    </SelectItem>
                    <SelectItem value="Creative Commons CC BY 4.0">
                      CC BY 4.0
                    </SelectItem>
                    <SelectItem value="Creative Commons CC BY-SA 4.0">
                      CC BY-SA 4.0
                    </SelectItem>
                    <SelectItem value="Creative Commons CC BY-NC 4.0">
                      CC BY-NC 4.0
                    </SelectItem>
                    <SelectItem value="Creative Commons CC BY-NC-SA 4.0">
                      CC BY-NC-SA 4.0
                    </SelectItem>
                    <SelectItem value="Public Domain">Public Domain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="asset-url">File URL *</Label>
              <Input
                id="asset-url"
                type="url"
                placeholder="https://example.com/your-file"
                value={newAsset.file_url}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, file_url: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="asset-thumbnail">Thumbnail URL (Optional)</Label>
              <Input
                id="asset-thumbnail"
                type="url"
                placeholder="https://example.com/thumbnail.jpg"
                value={newAsset.thumbnail_url}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, thumbnail_url: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={handleAddAsset}
                disabled={isPending}
              >
                Add Asset
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Assets */}
      {assets.length > 0 && (
        <div className="space-y-3">
          {assets.map((asset) => (
            <Card key={asset.asset_id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">
                        {asset.type.toUpperCase()}
                      </Badge>
                      {asset.license && (
                        <Badge variant="secondary" className="text-xs">
                          {asset.license}
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground break-all mb-1">
                      <a
                        href={asset.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        {asset.file_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {asset.thumbnail_url && (
                      <div className="text-xs text-muted-foreground">
                        Thumbnail: {asset.thumbnail_url}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-1">
                      Added:{" "}
                      {new Date(asset.created_at).toLocaleDateString("en-US")}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAsset(asset.asset_id)}
                    disabled={isPending}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {assets.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-muted-foreground">
          No assets added yet. Click Add Asset to get started.
        </div>
      )}
    </div>
  );
}
