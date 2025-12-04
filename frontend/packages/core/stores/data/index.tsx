import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    quantity: number
}

type CartState = {
    items: CartItem[],
    addToCart: (item: CartItem) => void,
    removeFromCart: (id: string) => void,
    clearCart: () => void,
    totalPrice: () => number
}

export const useCartStore = create<CartState>()(persist((set, get) => ({
    items: [],
    addToCart: (newItem: CartItem) => {
        set((state) => {
            const exists = state.items.find((i: CartItem) => i.id === newItem.id);

            if(exists) {
                return {
                    items: state.items.map((item: CartItem) => 
                        item.id === newItem.id
                            ? {...item, quantity: item.quantity + newItem.quantity}
                            : item
                    )
                };
            }
            return { items: [...state.items, newItem] }
        })
    },
    removeFromCart: (id) => {
        set((state) => ({
            items: state.items.filter((i) => i.id !== id)
        }))
    },
    clearCart: () => {
        set({ items: [] })
    },
    totalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
},
}),
 {name: "cart-storage" }
))


