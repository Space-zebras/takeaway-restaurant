import { http } from "./http";

export type StockItem = {
  stockItem: string;
  quantity: number;
};

export type StockResponse = {
  stock: StockItem[];
  itemsCount?: number;
  successful?: boolean;
};

export type UpdateStockResponse = {
  successful: boolean;
  message: string;
  updates: StockItem[];
};

export const StockApi = {
  getStock: () => http<StockResponse>("/stock"),
  updateStock: (updates: StockItem[]) =>
    http<UpdateStockResponse>("/stock", {
      method: "PUT",
      body: JSON.stringify(updates),
    }),
};

