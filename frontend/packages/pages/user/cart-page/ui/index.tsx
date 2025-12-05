import { useState } from "react";
import { useCartStore, createOrder } from "@app/core";
import { Container } from "@app/base";
import "./index.css";

export function CartPage() {
  const [error, setError] = useState<string | null>(null);

  const { items, addToCart, removeFromCart, clearCart, totalPrice } = useCartStore();

  const increaseQuantity = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) addToCart({ ...item, quantity: 1 });
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
      /* idk lägga user här? måste sparas på nått sätt.. */
      const user = {
        name: "",
        phoneNumber: ""
      };

      const cartItems = items.map(item => ({
        menuItem: item.title,
        price: item.price,
        quantity: item.quantity
      }));

      const orderBody = {
        user,
        cart: cartItems,
        totalPrice: totalPrice(),
        payment: "in-house" as const
      };

      const data = await createOrder(orderBody);

      console.log("Order created:", data.orderId);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };
  /* 
    if (items.length === 0) {
      return <p className="empty-cart">Your cart is empty</p>;
    } */

  return (
    <div className="cart-layout">
      <div className="cart-logo">
        <h1 className="logo">NA'CHO<br/> PROBLEM</h1>
      </div>

      <Container>
        <div className="cart-container">
          {error && <p className="error-message">{error}</p>}

          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>

              <div className="cart-item-actions">
                <button onClick={() => decreaseQuantity(item.id)} className="qty-btn">-</button>
                <span className="qty">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="qty-btn">+</button>
                <span className="price">{item.price} kr</span>
              </div>
            </div>
          ))}

          <h2 className="cart-total">TOTAL {totalPrice()} KR</h2>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </Container>
    </div>

  );
}