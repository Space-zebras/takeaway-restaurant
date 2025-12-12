import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export interface CartState {
    items: CartItem[];
    addToCart: (newItem: CartItem) => void;
    decreaseItem: (id: string) => void;
    clearCart: () => void;
    totalPrice: () => number;
    totalQuantity: () => number;
}

export const useCartStore = create<CartState>()(persist((set, get) => ({
    items: [],
    addToCart: (newItem: CartItem) => {
      set((state) => {
        const exists = state.items.find((i) => i.id === newItem.id);

        if (exists) {
          const updatedItems = state.items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
          // console.log("Cart", updatedItems);
          return { items: updatedItems };
        }
        // console.log("Updated cart:", [...state.items, newItem]);
        return { items: [...state.items, newItem] };
      });
    },
    decreaseItem: (id: string) => {
      set((state) => {
        const updatedItems = state.items
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);

        console.log("Decreased item quantity:", id);
        console.log("Updated cart:", updatedItems);

        return { items: updatedItems };
      });
    },
    clearCart: () => {
      console.log("Cart cleared");
      set({ items: [] });
    },
    totalPrice: () =>
      get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    totalQuantity: () =>
      get().items.reduce((total, item) => total + item.quantity, 0),
  }),
  { name: "cart-storage" }
));
