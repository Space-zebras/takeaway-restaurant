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

export interface UpdateOrderBody {
  status: "PENDING" | "PREPARING" | "COMPLETE" | "CANCELLED";
}
