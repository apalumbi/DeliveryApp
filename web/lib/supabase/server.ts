import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Whether the Supabase environment is present. Pages use this to render a
 * useful notice instead of throwing when a developer hasn't copied
 * `.env.example` to `.env.local` yet.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/**
 * Server-side Supabase client, on the publishable key.
 *
 * Row Level Security applies to everything read or written through this client:
 * the publishable key carries no privileges of its own, so the database decides
 * what the caller may see. Anything that must bypass RLS belongs in
 * `lib/supabase/admin.ts` on the secret key, which is restricted to three
 * enumerated call sites — see
 * docs/architecture/10-auth-and-permissions.md#service-role-usage.
 *
 * No session is persisted: this runs per request on the server, not in a browser.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Copy web/.env.example to web/.env.local and set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
