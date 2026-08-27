class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request(
  baseUrl,
  path,
  { method = "GET", body, params, headers } = {},
) {
  const url = new URL(
    baseUrl.replace(/\/$/, "") + path,
    window.location.origin,
  );
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!res.ok) {
    const message =
      (payload && (payload.message || payload.error)) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, payload);
  }

  return payload;
}

export function createApiClient(baseUrl) {
  return {
    get: (path, params, headers) =>
      request(baseUrl, path, { method: "GET", params, headers }),
    post: (path, body, headers) =>
      request(baseUrl, path, { method: "POST", body, headers }),
    patch: (path, body, headers) =>
      request(baseUrl, path, { method: "PATCH", body, headers }),
    put: (path, body, headers) =>
      request(baseUrl, path, { method: "PUT", body, headers }),
    delete: (path, params, headers) =>
      request(baseUrl, path, { method: "DELETE", params, headers }),
  };
}
