import { useState } from "react";
import { OrderApi } from "@app/core";
import type { Order, UpdateOrderBody } from "@app/core";

export function useUpdateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<Order | null>(null);

    async function updateOrder(id:string, body: UpdateOrderBody) {
        try {
          setLoading(true);
          setError(null);
          
          const res = await OrderApi.updateOrder(id, body);

          if(!res.order) {
            throw new Error("No order returned from server")
          }
          setOrder(res.order);
          return res.order

        } catch (err: any) {
            setError(err.message ?? "Något gick fel");
            throw err;
        } finally{
            setLoading(false);
        }
    }

    return {
        updateOrder,
        loading,
        error,
        order
    };
}