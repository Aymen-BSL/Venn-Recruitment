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
  RETENTION_MAINTENANCE_SECRET: z.string().min(32),
  CLICKUP_API_TOKEN: z.string().min(20),
  CLICKUP_CONTACT_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_CANDIDATE_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_HIRING_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_WORKSPACE_ID: z.string().regex(/^\d+$/),
  CLICKUP_CHAT_CHANNEL_ID: z.string().min(1).max(100),
  CLICKUP_RETRY_SECRET: z.string().min(32),
});

const clickupEnvSchema = serverEnvSchema.pick({
  CLICKUP_API_TOKEN: true,
  CLICKUP_CONTACT_LIST_ID: true,
  CLICKUP_CANDIDATE_LIST_ID: true,
  CLICKUP_HIRING_LIST_ID: true,
  CLICKUP_WORKSPACE_ID: true,
  CLICKUP_CHAT_CHANNEL_ID: true,
  CLICKUP_RETRY_SECRET: true,
});

const retentionEnvSchema = supabaseEnvSchema.extend({
  RETENTION_MAINTENANCE_SECRET: z.string().min(32),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;
export type RetentionEnv = z.infer<typeof retentionEnvSchema>;
export type ClickUpEnv = z.infer<typeof clickupEnvSchema>;

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

export function parseRetentionEnv(
  environment: Record<string, string | undefined>,
): RetentionEnv {
  const result = retentionEnvSchema.safeParse(withCurrentSupabaseKeyName(environment));
  if (result.success) return result.data;
  throw formatEnvironmentError(result.error);
}

export function parseClickUpEnv(
  environment: Record<string, string | undefined>,
): ClickUpEnv {
  const result = clickupEnvSchema.safeParse(environment);
  if (result.success) return result.data;
  throw formatEnvironmentError(result.error);
}

let cachedServerEnv: ServerEnv | undefined;
let cachedSupabaseEnv: SupabaseEnv | undefined;
let cachedRetentionEnv: RetentionEnv | undefined;
let cachedClickUpEnv: ClickUpEnv | undefined;

export function getServerEnv(): ServerEnv {
  cachedServerEnv ??= parseServerEnv(process.env);
  return cachedServerEnv;
}

export function getSupabaseEnv(): SupabaseEnv {
  cachedSupabaseEnv ??= parseSupabaseEnv(process.env);
  return cachedSupabaseEnv;
}

export function getRetentionEnv(): RetentionEnv {
  cachedRetentionEnv ??= parseRetentionEnv(process.env);
  return cachedRetentionEnv;
}

export function getClickUpEnv(): ClickUpEnv {
  cachedClickUpEnv ??= parseClickUpEnv(process.env);
  return cachedClickUpEnv;
}
