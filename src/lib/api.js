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

export async function apiFetch(path, options = {}) {
  const { method = "GET", body, headers, ...rest } = options;
  const url = `${API_URL}${path}`;

  const response = await fetch(url, {
    method,
    credentials: "include",
    cache: "no-store",
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
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

  return data;
}
