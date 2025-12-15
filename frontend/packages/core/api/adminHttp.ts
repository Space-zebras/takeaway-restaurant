const API_BASE_URL = import.meta.env.VITE_API_BASE;

export async function adminHttp<T>(path: string, config: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    },
    credentials: "include",
    ...config,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Request failed");
  }

  return res.json() as Promise<T>;
}