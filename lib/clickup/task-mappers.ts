import type { ClickUpEnv } from "@/lib/env/server";

export type DeliverySubmission = {
  submissionId: string;
  kind: "contact" | "candidate" | "hiring";
  name: string;
  email: string;
  createdAt: string;
  clickupTaskId: string | null;
  clickupChatMessageId: string | null;
  message?: string | null;
  phone?: string | null;
  currentLocation?: string | null;
  preferredRole?: string | null;
  preferredLocation?: string | null;
  linkedInUrl?: string | null;
  note?: string | null;
  company?: string | null;
  role?: string | null;
  location?: string | null;
  timeline?: string | null;
  details?: string | null;
};

export type ClickUpTask = { listId: string; name: string; description: string };

function lines(values: Array<[string, string | null | undefined]>): string {
  return values
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function mapSubmissionToTask(
  submission: DeliverySubmission,
  env: Pick<ClickUpEnv, "CLICKUP_CONTACT_LIST_ID" | "CLICKUP_CANDIDATE_LIST_ID" | "CLICKUP_HIRING_LIST_ID">,
): ClickUpTask {
  const common: Array<[string, string]> = [
    ["Submission ID", submission.submissionId],
    ["Received", submission.createdAt],
    ["Name", submission.name],
    ["Email", submission.email],
  ];

  if (submission.kind === "contact") {
    return {
      listId: env.CLICKUP_CONTACT_LIST_ID,
      name: `Website contact - ${submission.name}`,
      description: lines([...common, ["Message", submission.message]]),
    };
  }

  if (submission.kind === "hiring") {
    return {
      listId: env.CLICKUP_HIRING_LIST_ID,
      name: `Hiring enquiry - ${submission.company ?? submission.name}`,
      description: lines([
        ...common,
        ["Company", submission.company],
        ["Phone", submission.phone],
        ["Role", submission.role],
        ["Location", submission.location],
        ["Timeline", submission.timeline],
        ["Details", submission.details],
      ]),
    };
  }

  return {
    listId: env.CLICKUP_CANDIDATE_LIST_ID,
    name: `Candidate submission - ${submission.name}`,
    description: lines([
      ...common,
      ["Phone", submission.phone],
      ["Current location", submission.currentLocation],
      ["Preferred role", submission.preferredRole],
      ["Preferred location", submission.preferredLocation],
      ["LinkedIn", submission.linkedInUrl],
      ["Note", submission.note],
      ["CV", "Stored privately in Supabase; not attached to ClickUp."],
    ]),
  };
}

export function mapSubmissionToChatMessage(
  submission: DeliverySubmission,
  taskId: string,
): string {
  const label = submission.kind === "contact"
    ? "contact enquiry"
    : submission.kind === "hiring"
      ? "hiring enquiry"
      : "candidate submission";
  return `New website ${label}: ${submission.name}\nClickUp task: https://app.clickup.com/t/${taskId}`;
}
