import './styles/styles.css';

export { default as Logo } from './assets/Logo.webp';
export { router } from "./router/data";
export { useMenu } from "./hooks/useMenu";
export { default as Tacos } from './assets/tacos.jpg';
export { default as Burritos } from './assets/burritos.jpg';
export { default as Nachos } from './assets/nachos.jpg';
export { useGetOrders } from "./hooks/order/useGetOrders";
export { OrderApi } from "./api/orders.api";
export type { Order } from "./api/orders.api"
export type { MenuItem } from "./types";
export type { CartItem, CartState } from "./types";
export { useCartStore } from "./stores";
