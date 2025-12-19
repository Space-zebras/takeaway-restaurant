const API_BASE_URL = import.meta.env.VITE_API_BASE
const API_KEY = import.meta.env.VITE_API_KEY;

export async function http<T>(path: string, config: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            ...(config.headers || {})
        },
        ...config
    });

    if(!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || "Request failed");
    }

    return res.json();
}