import { useState } from "react";
import { OrderApi } from "@app/core";
import type { CreateOrderBody, Order } from "@app/core";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function create(body: CreateOrderBody) {
    try {
      setLoading(true);
      setError(null);

      const res = await OrderApi.createOrder(body);

      if (res.order) {
        setOrder(res.order);
        return res.order; 
      } else {
        setError("Order was created, but no order data was returned.");
      }
    } catch (err: any) {
      setError(err.message ?? "Failed to create order");
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, order, error };
}
