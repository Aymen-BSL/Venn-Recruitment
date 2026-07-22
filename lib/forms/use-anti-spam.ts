"use client";

import { useCallback, useRef, useState } from "react";

export function useAntiSpamToken(requestId: string) {
  const [token, setToken] = useState("");
  const loading = useRef<Promise<void> | null>(null);

  const ensureToken = useCallback(() => {
    if (token || loading.current) return;
    loading.current = fetch(`/api/forms/token?requestId=${encodeURIComponent(requestId)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return;
        const body = await response.json() as { token?: unknown };
        if (typeof body.token === "string") setToken(body.token);
      })
      .catch(() => undefined)
      .finally(() => { loading.current = null; });
  }, [requestId, token]);

  const resetToken = useCallback(() => {
    loading.current = null;
    setToken("");
  }, []);

  return { ensureToken, resetToken, token };
}
