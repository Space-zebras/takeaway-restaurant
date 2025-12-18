import { http } from "./http";

export type StockItem = {
  stockItem: string;
  quantity: number;
};

export type StockResponse = {
  items: StockItem[];
};

export const StockApi = {
  getStock: () => http<StockResponse>("/stock"),
};
