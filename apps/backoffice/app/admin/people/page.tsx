"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface Person {
  person_id: string;
  name: string;
  affiliation?: string;
  slug: string;
  bio?: string;
  tag?: string;
}

export default function AdminPeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    affiliation: "",
    slug: "",
    bio: "",
    tag: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const supabase = createSupabaseClient();

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const { data, error } = await supabase
        .from("person")
        .select("*")
        .order("name");

      if (error) throw error;
      setPeople(data || []);
    } catch (error: any) {
      setError("Error loading people: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openModal = (person?: Person) => {
    if (person) {
      setEditingPerson(person);
      setFormData({
        name: person.name,
        affiliation: person.affiliation || "",
        slug: person.slug,
        bio: person.bio || "",
        tag: person.tag || "",
      });
    } else {
      setEditingPerson(null);
      setFormData({
        name: "",
        affiliation: "",
        slug: "",
        bio: "",
        tag: "",
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
    setFormData({
      name: "",
      affiliation: "",
      slug: "",
      bio: "",
      tag: "",
    });
    setError("");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name), // Only auto-generate if slug is empty
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.name.trim()) {
        throw new Error("Name is required");
      }
      if (!formData.slug.trim()) {
        throw new Error("Slug is required");
      }

      if (editingPerson) {
        // Update existing person
        const { error } = await supabase
          .from("person")
          .update({
            name: formData.name,
            affiliation: formData.affiliation || null,
            slug: formData.slug,
            bio: formData.bio || null,
            tag: formData.tag || null,
          })
          .eq("person_id", editingPerson.person_id);

        if (error) throw error;
      } else {
        // Create new person
        const { error } = await supabase.from("person").insert({
          name: formData.name,
          affiliation: formData.affiliation || null,
          slug: formData.slug,
          bio: formData.bio || null,
          tag: formData.tag || null,
        });

        if (error) throw error;
      }

      closeModal();
      loadPeople();
    } catch (error: any) {
      if (error.code === "23505") {
        setError("A person with this slug already exists");
      } else {
        setError("Error saving person: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (personId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this person? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("person")
        .delete()
        .eq("person_id", personId);

      if (error) throw error;

      loadPeople();
    } catch (error: any) {
      if (error.code === "23503") {
        alert(
          "Cannot delete this person because they are associated with works. Remove their works first."
        );
      } else {
        alert("Error deleting person: " + error.message);
      }
    }
  };

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
          <h1 className="text-3xl font-bold">Manage People</h1>
          <p className="text-base-content/60 mt-1">
            Add and manage author profiles
          </p>
        </div>
        <button onClick={() => openModal()} className="btn btn-primary">
          Add New Person
        </button>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => (
          <div key={person.person_id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-lg">
                {person.name}
                {person.tag && (
                  <div className="badge badge-secondary">{person.tag}</div>
                )}
              </h2>

              {person.affiliation && (
                <p className="text-sm text-base-content/60">
                  {person.affiliation}
                </p>
              )}

              {person.bio && (
                <p className="text-sm line-clamp-3">{person.bio}</p>
              )}

              <div className="text-xs text-base-content/40 mt-2">
                /{person.slug}
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => openModal(person)}
                  className="btn btn-ghost btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(person.person_id)}
                  className="btn btn-ghost btn-sm text-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {people.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl opacity-20 mb-4">👤</div>
          <h3 className="text-xl font-semibold mb-2">No people added yet</h3>
          <p className="text-base-content/60 mb-4">
            Add the first person to get started
          </p>
          <button onClick={() => openModal()} className="btn btn-primary">
            Add First Person
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {editingPerson ? "Edit Person" : "Add New Person"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter full name"
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
                  placeholder="person-name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Affiliation</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.affiliation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      affiliation: e.target.value,
                    }))
                  }
                  placeholder="University, Company, etc."
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tag</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tag: e.target.value }))
                  }
                  placeholder="Artist, Designer, etc."
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Brief biography..."
                />
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
                    : editingPerson
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
