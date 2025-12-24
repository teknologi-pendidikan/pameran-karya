"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Person {
  person_id: string;
  name: string;
  affiliation?: string;
  slug: string;
}

interface Category {
  category_id: string;
  label: string;
  type?: string;
  slug: string;
}

export default function SubmitWorkPage() {
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    slug: "",
    status: "draft" as "draft" | "final" | "archived",
    authors: [] as {
      person_id: string;
      contribution_role: string;
      ordering: number;
    }[],
    categories: [] as string[],
    assets: [] as {
      type: string;
      file_url: string;
      thumbnail_url?: string;
      license?: string;
    }[],
  });
  const [people, setPeople] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    loadPeopleAndCategories();
  }, []);

  const loadPeopleAndCategories = async () => {
    try {
      const [peopleResponse, categoriesResponse] = await Promise.all([
        supabase.from("person").select("*").order("name"),
        supabase.from("category").select("*").order("label"),
      ]);

      if (peopleResponse.error) throw peopleResponse.error;
      if (categoriesResponse.error) throw categoriesResponse.error;

      setPeople(peopleResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error: any) {
      setError("Error loading form data: " + error.message);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [
        ...prev.authors,
        {
          person_id: "",
          contribution_role: "author",
          ordering: prev.authors.length + 1,
        },
      ],
    }));
  };

  const updateAuthor = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) =>
        i === index ? { ...author, [field]: value } : author
      ),
    }));
  };

  const removeAuthor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  const addAsset = () => {
    setFormData((prev) => ({
      ...prev,
      assets: [
        ...prev.assets,
        {
          type: "image",
          file_url: "",
          thumbnail_url: "",
          license: "CC BY 4.0",
        },
      ],
    }));
  };

  const updateAsset = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.map((asset, i) =>
        i === index ? { ...asset, [field]: value } : asset
      ),
    }));
  };

  const removeAsset = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error("Title is required");
      }
      if (formData.authors.length === 0) {
        throw new Error("At least one author is required");
      }
      if (formData.authors.some((a) => !a.person_id)) {
        throw new Error("All authors must be selected");
      }

      // Create the work
      const { data: work, error: workError } = await supabase
        .from("work")
        .insert({
          title: formData.title,
          abstract: formData.abstract || null,
          slug: formData.slug,
          status: formData.status,
        })
        .select()
        .single();

      if (workError) throw workError;

      const workId = work.work_id;

      // Add authors
      if (formData.authors.length > 0) {
        const { error: authorsError } = await supabase
          .from("work_person")
          .insert(
            formData.authors.map((author) => ({
              work_id: workId,
              person_id: author.person_id,
              contribution_role: author.contribution_role,
              ordering: author.ordering,
            }))
          );

        if (authorsError) throw authorsError;
      }

      // Add categories
      if (formData.categories.length > 0) {
        const { error: categoriesError } = await supabase
          .from("work_category")
          .insert(
            formData.categories.map((categoryId) => ({
              work_id: workId,
              category_id: categoryId,
            }))
          );

        if (categoriesError) throw categoriesError;
      }

      // Add assets
      if (formData.assets.length > 0) {
        const validAssets = formData.assets.filter((asset) =>
          asset.file_url.trim()
        );
        if (validAssets.length > 0) {
          const { error: assetsError } = await supabase.from("asset").insert(
            validAssets.map((asset) => ({
              work_id: workId,
              type: asset.type,
              file_url: asset.file_url,
              thumbnail_url: asset.thumbnail_url || null,
              license: asset.license || null,
            }))
          );

          if (assetsError) throw assetsError;
        }
      }

      setSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      setError("Error submitting work: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="card-title text-2xl">
              Work Submitted Successfully!
            </h2>
            <p>Your work has been submitted and is now in the system.</p>
            <p className="text-sm opacity-60">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Submit New Work</h1>
        <p className="text-base-content/60 mt-1">
          Add a new creative work to the exhibition
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Basic Information</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Title *</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter work title"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Slug</span>
                <span className="label-text-alt">
                  Auto-generated from title
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="work-slug"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Abstract/Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                value={formData.abstract}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, abstract: e.target.value }))
                }
                placeholder="Describe your work..."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as any,
                  }))
                }
              >
                <option value="draft">Draft</option>
                <option value="final">Final</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authors */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Authors *</h2>
              <button
                type="button"
                onClick={addAuthor}
                className="btn btn-primary btn-sm"
              >
                Add Author
              </button>
            </div>

            {formData.authors.map((author, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Author {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Person</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={author.person_id}
                      onChange={(e) =>
                        updateAuthor(index, "person_id", e.target.value)
                      }
                      required
                    >
                      <option value="">Select a person</option>
                      {people.map((person) => (
                        <option key={person.person_id} value={person.person_id}>
                          {person.name}{" "}
                          {person.affiliation ? `(${person.affiliation})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Role</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={author.contribution_role}
                      onChange={(e) =>
                        updateAuthor(index, "contribution_role", e.target.value)
                      }
                      placeholder="e.g., Author, Co-author, Designer"
                    />
                  </div>
                </div>
              </div>
            ))}

            {formData.authors.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-base-300 rounded-lg">
                <p className="text-base-content/60 mb-4">
                  No authors added yet
                </p>
                <button
                  type="button"
                  onClick={addAuthor}
                  className="btn btn-primary"
                >
                  Add First Author
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Categories</h2>
            <p className="text-sm opacity-60 mb-4">
              Select relevant categories for your work
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category) => (
                <label
                  key={category.category_id}
                  className="label cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={formData.categories.includes(category.category_id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          categories: [
                            ...prev.categories,
                            category.category_id,
                          ],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          categories: prev.categories.filter(
                            (id) => id !== category.category_id
                          ),
                        }));
                      }
                    }}
                  />
                  <span className="label-text">{category.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Assets */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Assets</h2>
              <button
                type="button"
                onClick={addAsset}
                className="btn btn-secondary btn-sm"
              >
                Add Asset
              </button>
            </div>
            <p className="text-sm opacity-60 mb-4">
              Add images, videos, documents, or links related to your work
            </p>

            {formData.assets.map((asset, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Asset {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeAsset(index)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Type</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={asset.type}
                      onChange={(e) =>
                        updateAsset(index, "type", e.target.value)
                      }
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="document">Document</option>
                      <option value="link">Link</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">License</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={asset.license || ""}
                      onChange={(e) =>
                        updateAsset(index, "license", e.target.value)
                      }
                      placeholder="e.g., CC BY 4.0, All Rights Reserved"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">File URL *</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={asset.file_url}
                    onChange={(e) =>
                      updateAsset(index, "file_url", e.target.value)
                    }
                    placeholder="https://example.com/file.jpg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Thumbnail URL (optional)</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={asset.thumbnail_url || ""}
                    onChange={(e) =>
                      updateAsset(index, "thumbnail_url", e.target.value)
                    }
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>
              </div>
            ))}

            {formData.assets.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-base-300 rounded-lg">
                <p className="text-base-content/60 mb-4">No assets added yet</p>
                <button
                  type="button"
                  onClick={addAsset}
                  className="btn btn-secondary"
                >
                  Add First Asset
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-actions justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Work"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
