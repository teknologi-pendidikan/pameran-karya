import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import WorkDetailPage, {
  generateStaticParams,
  generateMetadata,
} from "@/app/work/[slug]/page";
import { createClient } from "@supabase/supabase-js";
import { getYouTubeVideoId } from "@/lib/youtubeEmbed";

// Mock Next.js functions
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock Supabase
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

// Mock YouTube utility
jest.mock("@/lib/youtubeEmbed", () => ({
  getYouTubeVideoId: jest.fn(),
}));

// Mock Next.js Image and Link
jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock YouTubeEmbed
jest.mock("@next/third-parties/google", () => ({
  YouTubeEmbed: function MockYouTubeEmbed({ videoid, ...props }: any) {
    return (
      <div data-testid={`youtube-embed-${videoid}`} {...props}>
        YouTube Video: {videoid}
      </div>
    );
  },
}));

// Mock process.env
const mockEnv = {
  NEXT_PUBLIC_SUPABASE_URL: "https://test-project.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: "test-anon-key",
};

Object.defineProperty(process, "env", {
  value: mockEnv,
});

// Create mock data structures
const mockAsset = {
  asset_id: "asset-1",
  type: "image",
  file_url: "https://example.com/image1.jpg",
  thumbnail_url: "https://example.com/thumb1.jpg",
  license: "CC BY 4.0",
  created_at: "2024-01-15T00:00:00.000Z",
};

const mockVideoAsset = {
  asset_id: "asset-2",
  type: "video",
  file_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnail_url: null,
  license: "CC BY 4.0",
  created_at: "2024-01-16T00:00:00.000Z",
};

const mockContributor = {
  person_id: "person-1",
  name: "John Doe",
  slug: "john-doe",
  bio: "Student researcher",
  affiliation: "Teknologi Pendidikan",
  contribution_role: "Lead Developer",
  ordering: 1,
};

const mockWork = {
  work_id: "work-1",
  title: "Innovative Learning Platform",
  slug: "innovative-learning-platform",
  abstract:
    "This is an innovative platform for online learning with interactive features.",
  description: "A comprehensive description of the learning platform project.",
  created_at: "2024-01-01T00:00:00.000Z",
  updated_at: "2024-01-10T00:00:00.000Z",
};

const mockSupabaseClient = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        order: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
    })),
  })),
};

describe("WorkDetailPage", () => {
  const mockParams = Promise.resolve({ slug: "test-work" });

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up default successful mock response
    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                ...mockWork,
                asset: [mockAsset, mockVideoAsset],
                work_person: [
                  {
                    person: {
                      person_id: mockContributor.person_id,
                      name: mockContributor.name,
                      slug: mockContributor.slug,
                      bio: mockContributor.bio,
                      affiliation: mockContributor.affiliation,
                    },
                    contribution_role: mockContributor.contribution_role,
                    ordering: mockContributor.ordering,
                  },
                ],
              },
              error: null,
            }),
          }),
        }),
      }),
    });

    (createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
    (getYouTubeVideoId as jest.Mock).mockReturnValue("dQw4w9WgXcQ");
    console.error = jest.fn();
  });

  it("renders work details correctly with all data", async () => {
    const component = await WorkDetailPage({ params: mockParams });
    render(component);

    // Check work title
    expect(
      screen.getByText("Innovative Learning Platform")
    ).toBeInTheDocument();

    // Check creation date
    expect(screen.getByText("Created: 1 Januari 2024")).toBeInTheDocument();
    expect(screen.getByText("Updated: 10 Januari 2024")).toBeInTheDocument();

    // Check contributors section
    expect(screen.getByText("Contributors")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Lead Developer")).toBeInTheDocument();
    expect(screen.getByText("Teknologi Pendidikan")).toBeInTheDocument();

    // Check abstract and description
    expect(screen.getByText("Abstract")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This is an innovative platform for online learning with interactive features."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A comprehensive description of the learning platform project."
      )
    ).toBeInTheDocument();

    // Check assets section
    expect(screen.getByText("Assets (2)")).toBeInTheDocument();
    expect(screen.getByText("IMAGE")).toBeInTheDocument();
    expect(screen.getByText("VIDEO")).toBeInTheDocument();
    expect(screen.getAllByText("License: CC BY 4.0")).toHaveLength(2);

    // Check YouTube embed
    expect(screen.getByTestId("youtube-embed-dQw4w9WgXcQ")).toBeInTheDocument();

    // Check back link
    expect(screen.getByText("← Back to Directory")).toBeInTheDocument();
  });

  it("renders basic work structure", async () => {
    const component = await WorkDetailPage({ params: mockParams });
    render(component);

    // Verify basic elements exist
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("← Back to Directory")).toBeInTheDocument();
  });

  it("handles work with same created and updated dates", async () => {
    // Override the mock for this specific test
    const workSameDates = {
      ...mockWork,
      updated_at: "2024-01-01T00:00:00.000Z", // Same as created_at
    };

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                ...workSameDates,
                asset: [],
                work_person: [],
              },
              error: null,
            }),
          }),
        }),
      }),
    });

    const component = await WorkDetailPage({ params: mockParams });
    render(component);

    expect(screen.getByText("Created: 1 Januari 2024")).toBeInTheDocument();
    expect(screen.queryByText("Updated:")).not.toBeInTheDocument();
  });

  it("handles video assets without YouTube ID", async () => {
    const videoWithoutId = {
      ...mockVideoAsset,
      file_url: "https://example.com/video.mp4",
    };

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                ...mockWork,
                asset: [videoWithoutId],
                work_person: [],
              },
              error: null,
            }),
          }),
        }),
      }),
    });

    (getYouTubeVideoId as jest.Mock).mockReturnValue(null);

    const component = await WorkDetailPage({ params: mockParams });
    render(component);

    expect(screen.getByText("Video not available")).toBeInTheDocument();
  });

  it("calls notFound when slug is _empty_", async () => {
    const emptyParams = Promise.resolve({ slug: "_empty_" });

    await WorkDetailPage({ params: emptyParams });

    expect(notFound).toHaveBeenCalled();
  });

  it("displays contributor information", async () => {
    const component = await WorkDetailPage({ params: mockParams });
    render(component);

    // Verify contributors section exists
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);

    // Check for contributor names
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});

describe("generateStaticParams", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  it("returns work slugs successfully", async () => {
    const mockWorks = [
      { slug: "work-1" },
      { slug: "work-2" },
      { slug: "work-3" },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockResolvedValue({
          data: mockWorks,
          error: null,
        }),
      }),
    });

    const result = await generateStaticParams();

    expect(result).toEqual([
      { slug: "work-1" },
      { slug: "work-2" },
      { slug: "work-3" },
    ]);
  });
});

describe("generateMetadata", () => {
  const mockParams = Promise.resolve({ slug: "test-work" });

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
  });

  it("generates metadata for work with full data", async () => {
    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                ...mockWork,
                asset: [mockAsset],
                work_person: [
                  {
                    person: {
                      person_id: "person-1",
                      name: "John Doe",
                      slug: "john-doe",
                    },
                    contribution_role: "Lead Developer",
                    ordering: 1,
                  },
                ],
              },
              error: null,
            }),
          }),
        }),
      }),
    });

    const result = await generateMetadata({ params: mockParams });

    expect(result).toEqual({
      title:
        "Innovative Learning Platform - Pameran Karya Teknologi Pendidikan",
      description:
        "This is an innovative platform for online learning with interactive features.",
      keywords:
        "teknologi pendidikan, educational technology, student work, innovation, Innovative Learning Platform, John Doe",
      openGraph: {
        title:
          "Innovative Learning Platform - Pameran Karya Teknologi Pendidikan",
        description:
          "This is an innovative platform for online learning with interactive features.",
        type: "article",
        publishedTime: "2024-01-01T00:00:00.000Z",
        modifiedTime: "2024-01-10T00:00:00.000Z",
        authors: ["John Doe"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Innovative Learning Platform - Pameran Karya",
        description:
          "This is an innovative platform for online learning with interactive features.",
      },
    });
  });

  it("generates metadata for work without abstract", async () => {
    const workWithoutAbstract = {
      ...mockWork,
      abstract: undefined,
    };

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                ...workWithoutAbstract,
                asset: [],
                work_person: [
                  {
                    person: {
                      person_id: "person-1",
                      name: "Jane Smith",
                      slug: "jane-smith",
                    },
                    contribution_role: "Designer",
                    ordering: 1,
                  },
                ],
              },
              error: null,
            }),
          }),
        }),
      }),
    });

    const result = await generateMetadata({
      params: Promise.resolve({ slug: "different-work" }), // Use different slug to avoid cache
    });

    // The component should handle the case where abstract is missing
    expect(result.title).toBe(
      "Innovative Learning Platform - Pameran Karya Teknologi Pendidikan"
    );
    expect(result.description).toBeDefined();
    expect(result.openGraph).toBeDefined();
  });
});
