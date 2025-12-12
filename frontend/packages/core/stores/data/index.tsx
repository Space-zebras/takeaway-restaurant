import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState } from "@app/core";

export const useCartStore = create<CartState>()(persist((set, get) => ({
    items: [],
    addToCart: (newItem: CartItem) => {
        set((state) => {
            const exists = state.items.find((i: CartItem) => i.title === newItem.title);

            if(exists) {
                return {
                    items: state.items.map((item: CartItem) => 
                        item.title === newItem.title
                            ? {...item, quantity: item.quantity + newItem.quantity}
                            : item
                    )
                };
            }
            return { items: [...state.items, newItem] }
        })
    },
    decreaseItem: (title: string) => {
        set((state) => ({
            items: state.items
            .map((item) =>
                item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),

        }));
    },
    clearCart: () => {
        set({ items: [] })
    },
    
    totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
    },

    totalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
}),
    { name: "cart-storage" }
  )
);
