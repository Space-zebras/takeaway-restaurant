import { useEffect, useState } from "react";
import { OrderApi } from "@app/core";
import type { Order } from "@app/core";

export function useGetOrders() {
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        OrderApi.getOrders()
            .then((res) => {
                setData(res.orders ?? [])
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, []);

    return { data, loading, error };
}

export function getOrderById(orderId: string | null) {
    const [data, setData] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if(!orderId) return;

        OrderApi.getOrderById(orderId)
         .then((res) => setData(res.order ?? null))
         .catch((err) => setError(err.message))
         .finally(() => setLoading(false))
    }, []);

    return {data, loading, error}
}