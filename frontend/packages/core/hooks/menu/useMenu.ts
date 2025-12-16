import { useEffect, useState } from "react";
import { MenuApi, type MenuItem } from "@app/core";

export function useMenu() {
    const [data, setData] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        MenuApi.getMenu()
            .then(res => setData(res.menu))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}

