import { http } from "./http";
import type { Order, CreateOrderBody, UpdateOrderBody } from "@app/core";

export const API_BASE = import.meta.env.VITE_API_BASE;

interface ApiResponse<T> {
  message?: string;
  order?: T;
  orders?: T[];
  orderId?: string;
}

export const OrderApi = {
  getOrders: () =>
        http<ApiResponse<Order>>(`${API_BASE}/orders`),

  getOrderById: (id: string) =>
        http<ApiResponse<Order>>(`${API_BASE}/orders/${id}`),

  createOrder: (body: CreateOrderBody) =>
        http<ApiResponse<Order>>(`${API_BASE}/orders`, {
          method: "POST",
          body: JSON.stringify(body)
      }),

  updateOrder: (id: string, body: UpdateOrderBody) => 
        http<ApiResponse<Order>>(`${API_BASE}/orders/${id}`, {
          method: "PUT",
          body: JSON.stringify(body)
    })
};