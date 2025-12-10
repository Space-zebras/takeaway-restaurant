import { useState } from "react";
import { OrderApi } from "packages/core/api/orders.api";
import type { CreateOrderBody } from "packages/core/api/orders.api";

export function useCreateOrder() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function create(body: CreateOrderBody) {
        try {
            setLoading(true);
            const res = await OrderApi.createOrder(body);
            setMessage(`Order created: ${res.order}`);
        } catch (err: any) {
            setMessage(err.message)
        } finally {
            setLoading(false);
        }
    }

    return { create, loading, message };
}