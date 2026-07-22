import "server-only";

export class ClickUpError extends Error {
  constructor(
    message: string,
    public readonly retryable: boolean,
  ) {
    super(message);
    this.name = "ClickUpError";
  }
}

type Fetch = typeof fetch;

async function requestJson(
  url: string,
  token: string,
  body: unknown,
  fetcher: Fetch = fetch,
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetcher(url, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) {
      const retryable = response.status === 401
        || response.status === 403
        || response.status === 429
        || response.status >= 500;
      throw new ClickUpError(`ClickUp request failed (${response.status}).`, retryable);
    }
    try {
      return await response.json();
    } catch {
      throw new ClickUpError("ClickUp returned an invalid response.", true);
    }
  } catch (error) {
    if (error instanceof ClickUpError) throw error;
    throw new ClickUpError("ClickUp request did not complete.", true);
  } finally {
    clearTimeout(timeout);
  }
}

function responseId(value: unknown, label: string): string {
  if (typeof value === "object" && value !== null && "id" in value) {
    const id = (value as { id?: unknown }).id;
    if (typeof id === "string" && id.length > 0) return id;
    if (typeof id === "number") return String(id);
  }
  throw new ClickUpError(`ClickUp ${label} response had no ID.`, true);
}

export async function createClickUpTask(
  token: string,
  task: { listId: string; name: string; description: string },
  fetcher?: Fetch,
): Promise<string> {
  const result = await requestJson(
    `https://api.clickup.com/api/v2/list/${task.listId}/task`,
    token,
    { name: task.name, description: task.description },
    fetcher,
  );
  return responseId(result, "task");
}

export async function sendClickUpChatMessage(
  token: string,
  workspaceId: string,
  channelId: string,
  content: string,
  fetcher?: Fetch,
): Promise<string> {
  const result = await requestJson(
    `https://api.clickup.com/api/v3/workspaces/${workspaceId}/chat/channels/${channelId}/messages`,
    token,
    { type: "message", content, content_format: "text/md" },
    fetcher,
  );
  return responseId(result, "chat message");
}
