import { useEffect, useState } from "react";
import { StockApi } from "@app/core/api/stock.api";
import type { StockItem } from "@app/core/api/stock.api";

export function useGetStock() {
  const [data, setData] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    StockApi.getStock()
      .then((res) => {
        setData(res.items);
      })
      .catch((err) => {
        setError(err.message ?? "Failed to load stock");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
