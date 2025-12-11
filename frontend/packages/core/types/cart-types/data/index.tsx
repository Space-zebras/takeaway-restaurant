export type CartItem = {
    // id: string,
    title: string,
    price: number,
    quantity: number
};

export type CartState = {
    items: CartItem[],
    addToCart: (item: CartItem) => void,
    decreaseItem: (title: string) => void,
    clearCart: () => void,
    totalPrice: () => number,
    totalQuantity: () => number,
};