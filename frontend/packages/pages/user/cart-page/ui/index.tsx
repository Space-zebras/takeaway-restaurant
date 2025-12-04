import { useCartStore } from "@core/stores";
import { useState } from "react";
import "./index.css";

export const CartPage = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice
  } = useCartStore();

  const increaseQuantity = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      addToCart({ ...item, quantity: 1 });
    }
  };

  const decreaseQuantity = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    } else {
      removeFromCart(id);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      /* await...  lägg till anrop */
      clearCart();
    } catch (err) {
      setError("Could not place order. Try again.");
    }
  };

  if (items.length === 0) {
    return <p className="empty-cart">Your cart is empty</p>;
  }

  return (
    <div className="cart-container">
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <h1>Cart</h1>

          <div className="cart-item-info">
            <h3>{item.title}</h3>
          </div>

          <div className="cart-item-actions">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <p>Price: {item.price} kr</p>

            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 className="total-price">Total: {totalPrice()} kr</h2>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};