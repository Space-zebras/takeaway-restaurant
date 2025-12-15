import { useState } from "react";
import { OrderApi } from "@app/core";
import { useCartStore } from "@app/core";
import type { CreateOrderBody } from "packages/core/types/order-types";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearCart = useCartStore((state) => state.clearCart);

  async function create(body: CreateOrderBody) {
    try {
      setLoading(true);
      const res = await OrderApi.createOrder(body);

      if (res.orderId) {
        clearCart();
      }

      setMessage(`Order created: ${res.orderId}`);
      return res;
    } catch (err: any) {
      setMessage(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, message };
}
