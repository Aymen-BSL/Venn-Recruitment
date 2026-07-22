import { describe, expect, it } from "vitest";
import { mapSubmissionToChatMessage, mapSubmissionToTask, type DeliverySubmission } from "@/lib/clickup/task-mappers";

const env = {
  CLICKUP_CONTACT_LIST_ID: "1",
  CLICKUP_CANDIDATE_LIST_ID: "2",
  CLICKUP_HIRING_LIST_ID: "3",
};
const base: DeliverySubmission = {
  submissionId: "10000000-0000-4000-8000-000000000001",
  kind: "contact",
  name: "Ada Lovelace",
  email: "ada@example.com",
  createdAt: "2026-07-22T12:00:00.000Z",
  clickupTaskId: null,
  clickupChatMessageId: null,
};

describe("ClickUp task mapping", () => {
  it("maps contact enquiries", () => {
    expect(mapSubmissionToTask({ ...base, message: "Please call me." }, env)).toMatchSnapshot();
  });

  it("maps hiring enquiries", () => {
    expect(mapSubmissionToTask({ ...base, kind: "hiring", company: "Venn Labs", role: "Engineer", location: "Tunis", timeline: "Soon", details: "Senior hire" }, env)).toMatchSnapshot();
  });

  it("maps candidates without private CV metadata", () => {
    const task = mapSubmissionToTask({ ...base, kind: "candidate", phone: "+216 00 000 000", currentLocation: "Tunis", preferredRole: "Engineer", preferredLocation: "Remote" }, env);
    expect(task).toMatchSnapshot();
    expect(task.description).not.toMatch(/bucket|object path|\.pdf/i);
  });

  it("creates a short chat notification linked to the task", () => {
    expect(mapSubmissionToChatMessage(base, "abc123")).toContain("https://app.clickup.com/t/abc123");
  });
});
