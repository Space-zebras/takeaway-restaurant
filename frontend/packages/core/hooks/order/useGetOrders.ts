import { useEffect, useState, useCallback } from "react";
import { OrderApi } from "@app/core";
import type { Order } from "@app/core";

export function useGetOrders() {
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);

    try {
        const res = await OrderApi.getOrders();
        setData(res.orders ?? []);
    } catch (err: any) {
        setError(err.message ?? "Error fetching orders");
    } finally {
        setLoading(false);
    }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { data, loading, error, refetch: fetchOrders };
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