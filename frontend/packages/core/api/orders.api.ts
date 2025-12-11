import { http } from "./http";
import type { Order, CreateOrderBody, UpdateOrderBody } from "@app/core";

interface ApiResponse<T> {
  message?: string;
  order?: T;
  orders?: T[];
}

export const OrderApi = {
    getOrders: () =>
        http<ApiResponse<Order>>("/orders"),

    getOrderById: (id: string) =>
        http<ApiResponse<Order>>(`/orders/${id}`),

    createOrder: (body: CreateOrderBody) =>
        http<ApiResponse<Order>>("/orders", {
            method: "POST",
            body: JSON.stringify(body)
        }),
  updateOrder: (id: string, body: UpdateOrderBody) => 
    http<ApiResponse<Order>>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    })

}