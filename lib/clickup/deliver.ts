import "server-only";

import { z } from "zod";
import { getClickUpEnv } from "@/lib/env/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { ClickUpError, createClickUpTask, sendClickUpChatMessage } from "@/lib/clickup/client";
import {
  mapSubmissionToChatMessage,
  mapSubmissionToTask,
  type DeliverySubmission,
} from "@/lib/clickup/task-mappers";

const claimSchema = z.object({
  submission_id: z.uuid(),
  kind: z.enum(["contact", "candidate", "hiring"]),
  name: z.string(),
  email: z.string(),
  created_at: z.string(),
  clickup_task_id: z.string().nullable(),
  clickup_chat_message_id: z.string().nullable(),
  message: z.string().nullable(),
  phone: z.string().nullable(),
  current_location: z.string().nullable(),
  preferred_role: z.string().nullable(),
  preferred_location: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  note: z.string().nullable(),
  company: z.string().nullable(),
  role: z.string().nullable(),
  location: z.string().nullable(),
  timeline: z.string().nullable(),
  details: z.string().nullable(),
});

type Claim = z.infer<typeof claimSchema>;
export type DeliveryResult = "sent" | "failed" | "skipped";

function toSubmission(row: Claim): DeliverySubmission {
  return {
    submissionId: row.submission_id,
    kind: row.kind,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    clickupTaskId: row.clickup_task_id,
    clickupChatMessageId: row.clickup_chat_message_id,
    message: row.message,
    phone: row.phone,
    currentLocation: row.current_location,
    preferredRole: row.preferred_role,
    preferredLocation: row.preferred_location,
    linkedInUrl: row.linkedin_url,
    note: row.note,
    company: row.company,
    role: row.role,
    location: row.location,
    timeline: row.timeline,
    details: row.details,
  };
}

async function rpc(name: string, parameters: Record<string, unknown>) {
  const { data, error } = await getSupabaseAdmin().rpc(name, parameters);
  if (error) throw new Error("ClickUp delivery state update failed.");
  return data;
}

async function fail(row: Claim, error: unknown): Promise<"failed"> {
  const retryable = !(error instanceof ClickUpError) || error.retryable;
  const message = error instanceof ClickUpError ? error.message : "ClickUp delivery failed.";
  await rpc("fail_clickup_delivery", {
    p_submission_id: row.submission_id,
    p_error: message,
    p_retryable: retryable,
  });
  return "failed";
}

async function deliverClaim(row: Claim): Promise<DeliveryResult> {
  try {
    const env = getClickUpEnv();
    const submission = toSubmission(row);
    let taskId = submission.clickupTaskId;
    if (!taskId) {
      taskId = await createClickUpTask(env.CLICKUP_API_TOKEN, mapSubmissionToTask(submission, env));
      await rpc("record_clickup_task", { p_submission_id: row.submission_id, p_task_id: taskId });
    }

    if (!submission.clickupChatMessageId) {
      const messageId = await sendClickUpChatMessage(
        env.CLICKUP_API_TOKEN,
        env.CLICKUP_WORKSPACE_ID,
        env.CLICKUP_CHAT_CHANNEL_ID,
        mapSubmissionToChatMessage(submission, taskId),
      );
      await rpc("record_clickup_chat_message", {
        p_submission_id: row.submission_id,
        p_message_id: messageId,
      });
    }

    await rpc("complete_clickup_delivery", { p_submission_id: row.submission_id });
    return "sent";
  } catch (error) {
    return fail(row, error);
  }
}

export async function attemptClickUpDelivery(submissionId: string): Promise<DeliveryResult> {
  const data = await rpc("claim_clickup_delivery", { p_submission_id: submissionId });
  const parsed = claimSchema.nullable().safeParse(data);
  if (!parsed.success) throw new Error("Invalid ClickUp delivery claim.");
  if (!parsed.data) return "skipped";
  return deliverClaim(parsed.data);
}

export async function retryDueClickUpDeliveries(limit = 10) {
  const data = await rpc("claim_due_clickup_deliveries", { p_limit: limit });
  const claims = claimSchema.array().parse(data ?? []);
  const results = await Promise.all(claims.map(deliverClaim));
  return {
    examined: results.length,
    sent: results.filter((result) => result === "sent").length,
    failed: results.filter((result) => result === "failed").length,
  };
}
