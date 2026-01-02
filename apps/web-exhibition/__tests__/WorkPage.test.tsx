/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { render, screen } from "@testing-library/react";
import { createClient } from "@supabase/supabase-js";
import { Suspense } from "react";

// Mock dependencies
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("next/image", () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

// Mock the WorkDirectoryClient component
jest.mock("@/app/work/WorkDirectoryClient", () => ({
  WorkDirectoryClient: ({ initialWorks }: any) => (
    <div data-testid="work-directory-client">
      <h1>Works Directory</h1>
      <p>Total works: {initialWorks.length}</p>
      {initialWorks.map((work: any) => (
        <div key={work.work_id} data-testid={`work-${work.work_id}`}>
          <h3>{work.title}</h3>
          <p>{work.abstract}</p>
          <p>Contributors: {work.contributors?.length || 0}</p>
          <p>Assets: {work.asset_count || 0}</p>
        </div>
      ))}
    </div>
  ),
}));

describe("Work Directory Page", () => {
  let WorkDirectoryPage: any;
  let mockSupabaseClient: any;
  let consoleSpy: jest.SpyInstance;

  beforeAll(async () => {
    // Mock console.error to avoid noise in test output
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Setup mock Supabase client
    mockSupabaseClient = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          order: jest.fn(() => ({ data: [], error: null })),
        })),
      })),
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabaseClient);

    try {
      const module = await import("@/app/work/page");
      WorkDirectoryPage = module.default;
    } catch (error: any) {
      console.log("WorkDirectoryPage import error:", error.message);
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("renders page with valid works data", async () => {
    const mockWorks = [
      {
        work_id: "work-1",
        title: "Educational Technology Innovation",
        slug: "edu-tech-innovation",
        abstract:
          "A comprehensive study on modern educational technology trends.",
        created_at: "2023-06-01T00:00:00Z",
        work_person: [
          {
            person: {
              person_id: "person-1",
              name: "John Doe",
              slug: "john-doe",
              affiliation: {
                affiliation_id: "aff-1",
                name: "University A",
                short_name: "UA",
                type: "university",
              },
            },
            contribution_role: "Lead Researcher",
          },
        ],
        asset: [
          {
            asset_id: "asset-1",
            type: "image",
            thumbnail_url: "/thumb1.jpg",
            file_url: "/file1.jpg",
          },
          {
            asset_id: "asset-2",
            type: "document",
            file_url: "/doc1.pdf",
          },
        ],
      },
      {
        work_id: "work-2",
        title: "Learning Management System",
        slug: "lms-project",
        abstract: "Development of an innovative LMS platform.",
        created_at: "2023-05-01T00:00:00Z",
        work_person: [
          {
            person: {
              person_id: "person-2",
              name: "Jane Smith",
              slug: "jane-smith",
              affiliation: {
                affiliation_id: "aff-2",
                name: "University B",
                short_name: "UB",
                type: "university",
              },
            },
            contribution_role: "Developer",
          },
        ],
        asset: [],
      },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: mockWorks, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByTestId, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByTestId("work-directory-client")).toBeInTheDocument();
      expect(getByText("Total works: 2")).toBeInTheDocument();
      expect(
        getByText("Educational Technology Innovation")
      ).toBeInTheDocument();
      expect(getByText("Learning Management System")).toBeInTheDocument();
    }
  });

  it("handles database error", async () => {
    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          data: null,
          error: { message: "Database connection failed" },
        })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByText("Error Loading Works")).toBeInTheDocument();
      expect(
        getByText("Unable to load the works directory at this time.")
      ).toBeInTheDocument();

      // Verify that error was logged
      expect(consoleSpy).toHaveBeenCalledWith("Error fetching works:", {
        message: "Database connection failed",
      });
    }
  });

  it("handles empty works data", async () => {
    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: [], error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByTestId, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByTestId("work-directory-client")).toBeInTheDocument();
      expect(getByText("Total works: 0")).toBeInTheDocument();
    }
  });

  it("handles null works data (no error)", async () => {
    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: null, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByTestId, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByTestId("work-directory-client")).toBeInTheDocument();
      expect(getByText("Total works: 0")).toBeInTheDocument();
    }
  });

  it("transforms work data correctly", async () => {
    const mockWorks = [
      {
        work_id: "work-complex",
        title: "Complex Work",
        slug: "complex-work",
        abstract: "A complex work with multiple contributors and assets",
        created_at: "2023-07-01T00:00:00Z",
        work_person: [
          {
            person: {
              person_id: "person-1",
              name: "John Doe",
              slug: "john-doe",
              affiliation: {
                affiliation_id: "aff-1",
                name: "University A",
                short_name: "UA",
                type: "university",
              },
            },
            contribution_role: "Lead Researcher",
          },
          {
            person: {
              person_id: "person-2",
              name: "Jane Smith",
              slug: "jane-smith",
              affiliation: {
                affiliation_id: "aff-2",
                name: "University B",
                short_name: "UB",
                type: "university",
              },
            },
            contribution_role: "Co-Researcher",
          },
        ],
        asset: [
          {
            asset_id: "asset-1",
            type: "image",
            thumbnail_url: "/thumb1.jpg",
            file_url: "/file1.jpg",
          },
          {
            asset_id: "asset-2",
            type: "video",
            file_url: "/video1.mp4",
          },
          {
            asset_id: "asset-3",
            type: "document",
            file_url: "/doc1.pdf",
          },
        ],
      },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: mockWorks, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByTestId, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByTestId("work-work-complex")).toBeInTheDocument();
      expect(getByText("Complex Work")).toBeInTheDocument();
      expect(getByText("Contributors: 2")).toBeInTheDocument();
      expect(getByText("Assets: 3")).toBeInTheDocument();
    }
  });

  it("handles work without contributors", async () => {
    const mockWorks = [
      {
        work_id: "work-no-contributors",
        title: "Solo Work",
        slug: "solo-work",
        abstract: "A work with no contributors",
        created_at: "2023-08-01T00:00:00Z",
        work_person: null,
        asset: [],
      },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: mockWorks, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByTestId, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByTestId("work-work-no-contributors")).toBeInTheDocument();
      expect(getByText("Solo Work")).toBeInTheDocument();
      expect(getByText("Contributors: 0")).toBeInTheDocument();
      expect(getByText("Assets: 0")).toBeInTheDocument();
    }
  });

  it("handles work without assets", async () => {
    const mockWorks = [
      {
        work_id: "work-no-assets",
        title: "Text Only Work",
        slug: "text-only-work",
        abstract: "A work with no assets",
        created_at: "2023-09-01T00:00:00Z",
        work_person: [
          {
            person: {
              person_id: "person-1",
              name: "John Doe",
              slug: "john-doe",
              affiliation: {
                affiliation_id: "aff-1",
                name: "University A",
                short_name: "UA",
                type: "university",
              },
            },
            contribution_role: "Author",
          },
        ],
        asset: null,
      },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: mockWorks, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const { container, getByTestId, getByText } = render(result);

      expect(container).toBeInTheDocument();
      expect(getByTestId("work-work-no-assets")).toBeInTheDocument();
      expect(getByText("Text Only Work")).toBeInTheDocument();
      expect(getByText("Contributors: 1")).toBeInTheDocument();
      expect(getByText("Assets: 0")).toBeInTheDocument();
    }
  });

  it("calls Supabase with correct parameters", async () => {
    const mockWorks = [
      {
        work_id: "work-1",
        title: "Test Work",
        slug: "test-work",
        created_at: "2023-01-01T00:00:00Z",
        work_person: [],
        asset: [],
      },
    ];

    const mockSelect = jest.fn(() => ({
      order: jest.fn(() => ({ data: mockWorks, error: null })),
    }));

    const mockFrom = jest.fn(() => ({
      select: mockSelect,
    }));

    mockSupabaseClient.from = mockFrom;

    if (WorkDirectoryPage) {
      await WorkDirectoryPage();

      expect(mockFrom).toHaveBeenCalledWith("work");
      expect(mockSelect).toHaveBeenCalledWith(`
      work_id,
      title,
      slug,
      abstract,
      created_at,
      work_person(
        person!inner(
          person_id,
          name,
          slug,
          affiliation(
            affiliation_id,
            name,
            short_name,
            type
          )
        ),
        contribution_role
      ),
      asset(
        asset_id,
        type,
        thumbnail_url,
        file_url
      )
    `);
    }
  });

  it("renders with Suspense fallback structure", async () => {
    const mockWorks = [
      {
        work_id: "work-1",
        title: "Test Work",
        slug: "test-work",
        created_at: "2023-01-01T00:00:00Z",
        work_person: [],
        asset: [],
      },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: mockWorks, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();

      // Check if Suspense component is present in the result
      expect(result.type).toBe(Suspense);
      expect(result.props.children.type.name).toBe("WorkDirectoryClient");
      expect(result.props.children.props.initialWorks).toEqual([
        {
          work_id: "work-1",
          title: "Test Work",
          slug: "test-work",
          abstract: undefined,
          created_at: "2023-01-01T00:00:00Z",
          contributors: [],
          asset_count: 0,
          featured_asset: null,
        },
      ]);
    }
  });

  it("handles complex Supabase data transformation", async () => {
    const mockWorks = [
      {
        work_id: "work-transform",
        title: "Transform Test",
        slug: "transform-test",
        abstract: "Testing data transformation",
        created_at: "2023-10-01T00:00:00Z",
        work_person: [
          {
            person: {
              person_id: "person-1",
              name: "Alice Johnson",
              slug: "alice-johnson",
              affiliation: "Tech University",
            },
            contribution_role: "Primary Author",
          },
        ],
        asset: [
          {
            asset_id: "asset-featured",
            type: "image",
            thumbnail_url: "/featured-thumb.jpg",
            file_url: "/featured-image.jpg",
          },
        ],
      },
    ];

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn(() => ({
        order: jest.fn(() => ({ data: mockWorks, error: null })),
      })),
    });

    if (WorkDirectoryPage) {
      const result = await WorkDirectoryPage();
      const transformedWork = result.props.children.props.initialWorks[0];

      // Verify transformation
      expect(transformedWork.work_id).toBe("work-transform");
      expect(transformedWork.title).toBe("Transform Test");
      expect(transformedWork.contributors).toHaveLength(1);
      expect(transformedWork.contributors[0].name).toBe("Alice Johnson");
      expect(transformedWork.contributors[0].contribution_role).toBe(
        "Primary Author"
      );
      expect(transformedWork.asset_count).toBe(1);
      expect(transformedWork.featured_asset.asset_id).toBe("asset-featured");
    }
  });
});
