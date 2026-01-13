import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

// Use anon key - respects RLS policies for security
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

// Configuration
const MAX_BODY_LENGTH = 2000;
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_WEB_EXHIBITION_URL ||
    "https://pamerankarya.teknologipendidikan.or.id",
  // Add localhost for development
  "http://localhost:3000",
  "http://localhost:3001",
];

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 comments per IP per 15 minutes

function hashIP(ip: string): string {
  return createHash("sha256")
    .update(ip + process.env.IP_SALT || "fallback-salt")
    .digest("hex");
}

function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ipHash);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(ipHash, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function validateCommentBody(body: string): string | null {
  if (!body || typeof body !== "string") {
    return "Comment body is required";
  }

  if (body.length > MAX_BODY_LENGTH) {
    return `Comment is too long (max ${MAX_BODY_LENGTH} characters)`;
  }

  if (body.trim().length < 3) {
    return "Comment is too short (minimum 3 characters)";
  }

  // Basic spam detection
  const spamPatterns = [
    /https?:\/\//gi, // URLs
    /@[a-zA-Z0-9._-]+/g, // Email-like patterns
    /(.)\1{10,}/g, // Repeated characters
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(body)) {
      return "Comment contains prohibited content";
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // CORS check
    const origin = request.headers.get("origin");

    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: "Forbidden origin" },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Get client IP and hash it
    const clientIP = getClientIP(request);
    const ipHash = hashIP(clientIP);

    // Rate limiting check
    if (!checkRateLimit(ipHash)) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Please wait before submitting another comment.",
        },
        {
          status: 429,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Validate required fields
    const { page_slug, author_name, comment_body } = body;

    if (!page_slug || typeof page_slug !== "string") {
      return NextResponse.json(
        { error: "page_slug is required" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    if (
      !author_name ||
      typeof author_name !== "string" ||
      author_name.trim().length < 2
    ) {
      return NextResponse.json(
        { error: "Author name is required (minimum 2 characters)" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Validate comment body
    const bodyValidationError = validateCommentBody(comment_body);
    if (bodyValidationError) {
      return NextResponse.json(
        { error: bodyValidationError },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Insert comment into database
    const { data, error } = await supabase
      .from("comments")
      .insert({
        page_slug: page_slug.trim(),
        author_name: author_name.trim(),
        body: comment_body.trim(),
        ip_hash: ipHash,
        is_approved: false, // All comments start as unapproved
      })
      .select("id")
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save comment" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Comment submitted successfully. It will be visible after moderation.",
        id: data.id,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin || "")
        ? origin || "*"
        : "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400", // 24 hours
    },
  });
}
