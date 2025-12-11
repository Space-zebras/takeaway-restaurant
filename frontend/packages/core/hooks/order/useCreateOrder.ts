import { useState } from "react";
import { OrderApi } from "@app/core";
import type { CreateOrderBody } from "@app/core";

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