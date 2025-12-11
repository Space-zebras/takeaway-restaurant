import { useEffect, useState } from "react";
import { OrderApi } from "@app/core/api/orders.api";
import type { Order } from "@app/core/api/orders.api";

export function useGetOrderById(id: string) {
  const [data, setData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    OrderApi.getOrderById(id)
      .then((res) => setData(res.order ?? null))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
