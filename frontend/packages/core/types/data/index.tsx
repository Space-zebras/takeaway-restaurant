export interface CartItemBackend {
    menuItem: string;
    price: number;
    quantity: number;
}

export interface UserInfo {
    name: string;
    phoneNumber: string;
}

export interface OrderBody {
    user: UserInfo;
    cart: CartItemBackend[];
    totalPrice: number;
    payment: "online" | "in-house";
}