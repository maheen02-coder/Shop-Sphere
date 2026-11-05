// Default to a same-origin path; next.config.mjs proxies /api to the backend.
// Deployments with a separate API host can set NEXT_PUBLIC_API_URL to the full
// API base. A bare host is accepted and normalised to <host>/api.
const configuredBase = (process.env.NEXT_PUBLIC_API_URL || "")
  .trim()
  .replace(/\/$/, "");

export const API_URL = configuredBase
  ? configuredBase.endsWith("/api")
    ? configuredBase
    : `${configuredBase}/api`
  : "/api";

// Successful catalogue GETs are cached briefly so navigating between pages
// (for example Fragrances -> Watches -> back) does not refetch the same list.
// Mutations and authenticated endpoints are never cached.
const responseCache = new Map();
const inFlightRequests = new Map();

export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    body,
    headers,
    signal,
    cacheMs = 0,
    ...rest
  } = options;
  const url = `${API_URL}${path}`;
  const isGet = method === "GET";
  const canCache = isGet && cacheMs > 0;

  if (canCache) {
    const cached = responseCache.get(url);
    if (cached) {
      if (cached.expiresAt > Date.now()) return cached.data;
      responseCache.delete(url);
    }
  }

  // Share a single network request between concurrent consumers (for example
  // two components asking for the same category at the same time).
  const requestKey = isGet && !signal ? url : null;
  if (requestKey) {
    const pending = inFlightRequests.get(requestKey);
    if (pending) return pending;
  }

  const request = (async () => {
    const response = await fetch(url, {
      method,
      credentials: "include",
      cache: "no-store",
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
      ...rest,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const error = new Error(
        data?.message ||
          `Request failed with status ${response.status} (${method} ${url})`
      );
      error.status = response.status;
      error.data = data;
      throw error;
    }

    if (canCache) {
      responseCache.set(url, { data, expiresAt: Date.now() + cacheMs });
    }

    return data;
  })();

  if (requestKey) {
    inFlightRequests.set(requestKey, request);
    const clear = () => {
      if (inFlightRequests.get(requestKey) === request) {
        inFlightRequests.delete(requestKey);
      }
    };
    request.then(clear, clear);
  }

  return request;
}
