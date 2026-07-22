import { z } from "zod";

const httpUrl = z
  .url()
  .refine((value) => /^https?:\/\//i.test(value), "must use HTTP or HTTPS");

const serverEnvSchema = z.object({
  SUPABASE_URL: httpUrl,
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  SUPABASE_CV_BUCKET: z.string().regex(/^[a-z0-9][a-z0-9._-]*[a-z0-9]$/),
  CLICKUP_API_TOKEN: z.string().min(20),
  CLICKUP_CONTACT_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_CANDIDATE_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_HIRING_LIST_ID: z.string().regex(/^\d+$/),
  CLICKUP_RETRY_SECRET: z.string().min(32),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(environment: Record<string, string | undefined>): ServerEnv {
  const result = serverEnvSchema.safeParse(environment);
  if (result.success) {
    return result.data;
  }

  const invalidVariables = [
    ...new Set(result.error.issues.map((issue) => issue.path.join(".") || "environment")),
  ].join(", ");
  throw new Error(`Invalid server environment variables: ${invalidVariables}`);
}

let cachedServerEnv: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  cachedServerEnv ??= parseServerEnv(process.env);
  return cachedServerEnv;
}
