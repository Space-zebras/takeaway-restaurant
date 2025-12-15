import { useState } from "react";
import { OrderApi } from "@app/core";
import type { CreateOrderBody, Order } from "@app/core";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function create(body: CreateOrderBody) {
    try {
      setLoading(true);
      const res = await OrderApi.createOrder(body);

      if (res.order) {
        setOrder(res.order);
        return res.order; 
      } else {
        setError("Order was created, but no order data was returned.");
      }
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, message };
}
