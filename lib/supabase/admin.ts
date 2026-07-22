import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/env/server";

let adminClient: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    const environment = getSupabaseEnv();
    adminClient = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_SECRET_KEY,
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      },
    );
  }

  return adminClient;
}
