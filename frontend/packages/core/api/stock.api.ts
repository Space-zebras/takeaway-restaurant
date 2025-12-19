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

export const StockApi = {
  getStock: () => http<StockResponse>("/stock"),
};
