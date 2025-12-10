import { http } from "./http";

export interface CartItem {
  menuItem: string;
  price: number;
  quantity: number;
}

export interface UserInfo {
  name: string;
  phoneNumber: string;
}

export interface Order {
  orderId: string;
  user: UserInfo;
  cart: CartItem[];
  totalPrice: number;
  payment: string;
  status: "PENDING" | "PREPARING" | "COMPLETE" | "CANCELLED";
  createdAt: string;
  modifiedAt: string;
}

export interface CreateOrderBody {
  user: UserInfo;
  cart: CartItem[];
  totalPrice: number;
  payment: "online" | "in-house";
}

export interface ApiResponse<T> {
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
        })

}