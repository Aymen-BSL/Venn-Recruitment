import { z } from "zod";

const httpUrl = z
  .url()
  .refine((value) => /^https?:\/\//i.test(value), "must use HTTP or HTTPS");

const supabaseEnvSchema = z.object({
  SUPABASE_URL: httpUrl,
  SUPABASE_SECRET_KEY: z.string().min(20),
  SUPABASE_CV_BUCKET: z.string().regex(/^[a-z0-9][a-z0-9._-]*[a-z0-9]$/),
});

const serverEnvSchema = supabaseEnvSchema.extend({
  CLICKUP_API_TOKEN: z.string().min(20),
  CLICKUP_CONTACT_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_CANDIDATE_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_HIRING_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_RETRY_SECRET: z.string().min(32),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;

function withCurrentSupabaseKeyName(environment: Record<string, string | undefined>) {
  return {
    ...environment,
    SUPABASE_SECRET_KEY:
      environment.SUPABASE_SECRET_KEY ?? environment.SUPABASE_SERVICE_ROLE_KEY,
  };
}

function formatEnvironmentError(error: z.ZodError): Error {
  const invalidVariables = [
    ...new Set(error.issues.map((issue) => issue.path.join(".") || "environment")),
  ].join(", ");
  return new Error(`Invalid server environment variables: ${invalidVariables}`);
}

export function parseServerEnv(environment: Record<string, string | undefined>): ServerEnv {
  const result = serverEnvSchema.safeParse(withCurrentSupabaseKeyName(environment));
  if (result.success) {
    return result.data;
  }

  throw formatEnvironmentError(result.error);
}

export function parseSupabaseEnv(
  environment: Record<string, string | undefined>,
): SupabaseEnv {
  const result = supabaseEnvSchema.safeParse(withCurrentSupabaseKeyName(environment));
  if (result.success) {
    return result.data;
  }

  throw formatEnvironmentError(result.error);
}

let cachedServerEnv: ServerEnv | undefined;
let cachedSupabaseEnv: SupabaseEnv | undefined;

export function getServerEnv(): ServerEnv {
  cachedServerEnv ??= parseServerEnv(process.env);
  return cachedServerEnv;
}

export function getSupabaseEnv(): SupabaseEnv {
  cachedSupabaseEnv ??= parseSupabaseEnv(process.env);
  return cachedSupabaseEnv;
}
