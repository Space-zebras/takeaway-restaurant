const API_BASE_URL = "https://f3b1atehce.execute-api.eu-north-1.amazonaws.com"

export async function http<T>(path: string, config: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
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