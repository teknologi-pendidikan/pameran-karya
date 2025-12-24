"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface Category {
  category_id: string;
  label: string;
  type?: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    type: "",
    slug: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const supabase = createSupabaseClient();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .order("label");

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      setError("Error loading categories: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (label: string) => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        label: category.label,
        type: category.type || "",
        slug: category.slug,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        label: "",
        type: "",
        slug: "",
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      label: "",
      type: "",
      slug: "",
    });
    setError("");
  };

  const handleLabelChange = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      label,
      slug: prev.slug || generateSlug(label), // Only auto-generate if slug is empty
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.label.trim()) {
        throw new Error("Label is required");
      }
      if (!formData.slug.trim()) {
        throw new Error("Slug is required");
      }

      if (editingCategory) {
        // Update existing category
        const { error } = await supabase
          .from("category")
          .update({
            label: formData.label,
            type: formData.type || null,
            slug: formData.slug,
          })
          .eq("category_id", editingCategory.category_id);

        if (error) throw error;
      } else {
        // Create new category
        const { error } = await supabase.from("category").insert({
          label: formData.label,
          type: formData.type || null,
          slug: formData.slug,
        });

        if (error) throw error;
      }

      closeModal();
      loadCategories();
    } catch (error: any) {
      if (error.code === "23505") {
        setError("A category with this slug already exists");
      } else {
        setError("Error saving category: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("category")
        .delete()
        .eq("category_id", categoryId);

      if (error) throw error;

      loadCategories();
    } catch (error: any) {
      if (error.code === "23503") {
        alert(
          "Cannot delete this category because it is assigned to works. Remove it from works first."
        );
      } else {
        alert("Error deleting category: " + error.message);
      }
    }
  };

  const categoryTypes = Array.from(
    new Set(categories.map((c) => c.type).filter(Boolean))
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <p className="text-base-content/60 mt-1">
            Organize and manage work categories
          </p>
        </div>
        <button onClick={() => openModal()} className="btn btn-primary">
          Add New Category
        </button>
      </div>

      {/* Stats */}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Categories</div>
          <div className="stat-value">{categories.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Types</div>
          <div className="stat-value">{categoryTypes.length}</div>
        </div>
      </div>

      {/* Categories by Type */}
      {categoryTypes.length > 0 && (
        <div className="space-y-6">
          {categoryTypes.map((type) => (
            <div key={type} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title capitalize">{type} Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {categories
                    .filter((cat) => cat.type === type)
                    .map((category) => (
                      <div
                        key={category.category_id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{category.label}</h3>
                            <p className="text-xs text-base-content/40">
                              /{category.slug}
                            </p>
                          </div>
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost btn-sm"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </div>
                            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                              <li>
                                <button onClick={() => openModal(category)}>
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleDelete(category.category_id)
                                  }
                                  className="text-error"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uncategorized */}
      {categories.filter((cat) => !cat.type).length > 0 && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Uncategorized</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {categories
                .filter((cat) => !cat.type)
                .map((category) => (
                  <div
                    key={category.category_id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{category.label}</h3>
                        <p className="text-xs text-base-content/40">
                          /{category.slug}
                        </p>
                      </div>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-sm"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </div>
                        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                          <li>
                            <button onClick={() => openModal(category)}>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(category.category_id)}
                              className="text-error"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl opacity-20 mb-4">🏷️</div>
          <h3 className="text-xl font-semibold mb-2">No categories yet</h3>
          <p className="text-base-content/60 mb-4">
            Add the first category to get started
          </p>
          <button onClick={() => openModal()} className="btn btn-primary">
            Add First Category
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Label *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.label}
                  onChange={(e) => handleLabelChange(e.target.value)}
                  placeholder="Enter category label"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Slug *</span>
                  <span className="label-text-alt">
                    URL-friendly identifier
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="category-name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type (optional)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  placeholder="e.g., Medium, Style, Subject"
                  list="existing-types"
                />
                <datalist id="existing-types">
                  {categoryTypes.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              {error && (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingCategory
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
