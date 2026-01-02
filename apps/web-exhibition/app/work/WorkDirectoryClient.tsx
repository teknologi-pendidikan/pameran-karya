"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getYouTubeVideoId } from "@/lib/youtubeEmbed";

interface Work {
  work_id: string;
  title: string;
  slug: string;
  abstract?: string;
  created_at: string;
  contributors?: Contributor[];
  asset_count?: number;
  featured_asset?: Asset;
}

interface Contributor {
  person_id: string;
  name: string;
  slug: string;
  //   image?: string;
  contribution_role?: string;
  affiliation?: {
    affiliation_id: string;
    name: string;
    short_name?: string;
    type: string;
  };
}

interface Asset {
  asset_id: string;
  type: string;
  thumbnail_url?: string;
  file_url?: string;
}

interface WorkDirectoryClientProps {
  initialWorks: Work[];
}

export function WorkDirectoryClient({
  initialWorks,
}: WorkDirectoryClientProps) {
  const [works] = useState<Work[]>(initialWorks);
  const router = useRouter();
  const searchParams = useSearchParams();

  const ITEMS_PER_PAGE = 12;

  // Helper function to get YouTube thumbnail or original URL
  const getImageUrl = (url: string | undefined): string => {
    if (!url) return "/placeholder-work.png";

    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/default.jpg`;
    }

    return url;
  };

  // Get values from URL params or use defaults
  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const sortBy =
    (searchParams.get("sort") as "newest" | "oldest" | "title") || "newest";

  const [, setSearchQuery] = useState("");
  const [, setCurrentPage] = useState(1);
  const [, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Update URL when params change
  const updateURL = (newQuery?: string, newPage?: number, newSort?: string) => {
    const params = new URLSearchParams();

    const query = newQuery !== undefined ? newQuery : searchQuery;
    const page = newPage !== undefined ? newPage : currentPage;
    const sort = newSort !== undefined ? newSort : sortBy;

    if (query) params.set("search", query);
    if (page > 1) params.set("page", page.toString());
    if (sort !== "newest") params.set("sort", sort);

    const newURL = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/work${newURL}`, { scroll: false });
  };

  // Filtered and sorted works
  const filteredAndSortedWorks = useMemo(() => {
    let filtered = works;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = works.filter((work) => {
        return (
          work.title.toLowerCase().includes(query) ||
          work.abstract?.toLowerCase().includes(query) ||
          work.contributors?.some(
            (contributor) =>
              contributor.name.toLowerCase().includes(query) ||
              contributor.affiliation?.name.toLowerCase().includes(query)
          )
        );
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title, "id");
        case "newest":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    return filtered;
  }, [works, searchQuery, sortBy]);

  // Paginated works
  const paginatedWorks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedWorks.slice(startIndex, endIndex);
  }, [filteredAndSortedWorks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedWorks.length / ITEMS_PER_PAGE);

  // Handle search
  const handleSearch = (query: string) => {
    updateURL(query, 1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateURL(undefined, page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle sort change
  const handleSortChange = (sort: "newest" | "oldest" | "title") => {
    updateURL(undefined, 1, sort);
  };

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="">
        {/* Header Section */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-5xl mb-3 md:mb-4">
            Direktori Karya
          </h1>
          <div className="flex flex-wrap justify-start gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="badge badge-primary badge-md md:badge-lg">
              {works.length} Karya
            </div>
            <div className="badge badge-secondary badge-md md:badge-lg">
              {works.reduce((sum, work) => sum + (work.asset_count || 0), 0)}{" "}
              Aset
            </div>
            <div className="badge badge-accent badge-md md:badge-lg">
              {
                new Set(
                  works.flatMap(
                    (work) => work.contributors?.map((c) => c.person_id) || []
                  )
                ).size
              }{" "}
              Kontributor
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Jelajahi koleksi karya inovatif dari mahasiswa Teknologi Pendidikan
            Indonesia. Temukan berbagai proyek, penelitian, dan karya kreatif
            dalam bidang teknologi pendidikan.
          </p>
        </header>

        {/* Search and Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Cari karya, penulis, atau kata kunci..."
                  className="input input-bordered join-item flex-1"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="btn btn-primary join-item">Cari</button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="text-sm font-medium whitespace-nowrap">
                Urutkan:
              </label>
              <select
                className="select select-bordered"
                value={sortBy}
                onChange={(e) =>
                  handleSortChange(
                    e.target.value as "newest" | "oldest" | "title"
                  )
                }
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="title">Judul A-Z</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="badge badge-neutral">
              {filteredAndSortedWorks.length} hasil
              {searchQuery && ` untuk "${searchQuery}"`}
            </div>
            {searchQuery && (
              <button
                className="badge badge-error hover:badge-error-focus cursor-pointer"
                onClick={() => handleSearch("")}
              >
                Hapus filter ×
              </button>
            )}
          </div>
        </div>

        {/* Works Grid */}
        {paginatedWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedWorks.map((work) => (
              <Link
                key={work.work_id}
                href={`/work/${work.slug}`}
                className="card shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Featured Asset Thumbnail */}
                <figure className="h-36">
                  {work.featured_asset?.thumbnail_url ||
                  work.featured_asset?.file_url ? (
                    <img
                      src={getImageUrl(
                        work.featured_asset.thumbnail_url ||
                          work.featured_asset.file_url
                      )}
                      alt={work.title}
                      width={400}
                      height={144}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 aspect-video"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-1">📄</div>
                        <div className="text-gray-500 text-xs">No Preview</div>
                      </div>
                    </div>
                  )}
                </figure>

                <div className="card-body p-3">
                  {/* Title and Date */}
                  <div className="mb-2">
                    <h2 className="card-title text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                      {work.title}
                    </h2>
                    <div className="text-xs text-gray-500 mt-1">
                      <time dateTime={work.created_at}>
                        {new Date(work.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Abstract */}
                  {work.abstract && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                      {work.abstract}
                    </p>
                  )}

                  {/* Contributors */}
                  {work.contributors && work.contributors.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">
                        Contributors:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {work.contributors.slice(0, 2).map((contributor) => (
                          <span
                            key={contributor.person_id}
                            className="badge badge-outline text-xs"
                          >
                            {contributor.name}
                          </span>
                        ))}
                        {work.contributors.length > 2 && (
                          <span className="badge badge-ghost text-xs">
                            +{work.contributors.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="card-actions justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {work.asset_count || 0}{" "}
                      {work.asset_count === 1 ? "asset" : "assets"}
                    </div>
                    <div className="btn btn-link btn-xs">View →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <div className="text-6xl mb-4">{searchQuery ? "🔍" : "📝"}</div>
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery
                ? "Tidak ada hasil yang ditemukan"
                : "Tidak ada karya tersedia"}
            </h3>
            <p>
              {searchQuery
                ? `Coba ubah kata kunci pencarian atau hapus filter.`
                : "Periksa kembali nanti untuk karya-karya baru dari mahasiswa kami."}
            </p>
            {searchQuery && (
              <button
                className="btn btn-primary mt-4"
                onClick={() => handleSearch("")}
              >
                Hapus Filter
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              {/* Previous Button */}
              <button
                className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNumber;

                if (totalPages <= 7) {
                  pageNumber = i + 1;
                } else if (currentPage <= 4) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNumber = totalPages - 6 + i;
                } else {
                  pageNumber = currentPage - 3 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`join-item btn ${
                      currentPage === pageNumber ? "btn-active" : ""
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                className={`join-item btn ${currentPage === totalPages ? "btn-disabled" : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Contribute Your Work</h2>
          <p className="text-xl mb-6 text-blue-100">
            Mahasiswa Teknologi Pendidikan? Bagikan karya inovatif Anda dan
            inspirasi rekan-rekan lainnya.
          </p>
          <Link
            href="/person"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Lihat Direktori Eksibitor
          </Link>
        </div>
      </div>
    </div>
  );
}
