import './styles/styles.css';

export { default as Logo } from './assets/Logo.webp';
export { router } from "./router/data";
export { useMenu } from "./hooks/menu/useMenu";
export { default as Tacos } from './assets/tacos.jpg';
export { default as Burritos } from './assets/burritos.jpg';
export { default as Nachos } from './assets/nachos.jpg';
export { useGetOrders } from "./hooks/order/useGetOrders";
export { useUpdateOrder } from "./hooks/order/useUpdateOrder"
export { useCreateOrder } from "./hooks/order/useCreateOrder"
export { useGetOrderById } from "./hooks/order/useGetOrderById"
export { OrderApi } from "./api/orders.api";
export { MenuApi } from "./api/menu.api";
export type { Order, UserInfo, CreateOrderBody, UpdateOrderBody } from "./types/order-types"
export type { MenuItem, UpdateMenuItemBody } from "./types/menu-types"
export { useCartStore, type CartItem } from "./stores";
export { loginAdmin } from "./api/login.api";
