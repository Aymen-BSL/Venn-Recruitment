import { NextResponse } from "next/server";
import { z } from "zod";
import { createFormStartToken } from "@/lib/forms/anti-spam";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const requestId = z.uuid().safeParse(new URL(request.url).searchParams.get("requestId"));
  if (!requestId.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  return NextResponse.json(
    { token: createFormStartToken(requestId.data) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
