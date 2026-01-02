// This file configures the initialization of Sentry for the entire application
// It runs when the application starts up, both on client and server
// Since we only want client telemetry, we'll conditionally initialize

export async function register() {
  if (typeof window !== "undefined") {
    // Client-side initialization - this is handled in instrumentation-client.ts
    // and loaded automatically by Next.js
    return;
  }

  // Skip server-side Sentry initialization
  // This prevents the TypeScript error about missing server routes
  console.log(
    "Skipping server-side Sentry initialization (client telemetry only)"
  );
}
