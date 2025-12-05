import type { CartItemBackend, UserInfo } from "../types";

export interface OrderBody {
  user: UserInfo;
  cart: CartItemBackend[];
  totalPrice: number;
  payment: "online" | "in-house";
}

export async function createOrder(order: OrderBody) {
  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error((await res.json()).error || "Could not place order");
  }

  return res.json();
}
