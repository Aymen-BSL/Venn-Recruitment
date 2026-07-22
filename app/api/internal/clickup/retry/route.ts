import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { retryDueClickUpDeliveries } from "@/lib/clickup/deliver";
import { getClickUpEnv } from "@/lib/env/server";

function authorized(request: Request): boolean {
  const supplied = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${getClickUpEnv().CLICKUP_RETRY_SECRET}`);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await retryDueClickUpDeliveries(10));
  } catch {
    return NextResponse.json({ error: "ClickUp retry failed." }, { status: 500 });
  }
}
