import { useState } from "react";
import { StockApi, type StockItem } from "@app/core/api/stock.api";

export function useUpdateStock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStock = async (updates: StockItem[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await StockApi.updateStock(updates);
      return res;
    } catch (err: any) {
      setError(err.message || "Failed to update stock");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateStock, loading, error };
}

