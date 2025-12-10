import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@app/base";
import { useCartStore } from "@app/core";
import "./index.css";

export function CartPage() {
  const [error] = useState<string | null>(null);
  const navigate = useNavigate();

  const { items, addToCart, removeFromCart, totalPrice } =
    useCartStore();

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

  return (
    <div className="cart-layout">
      <div className="cart-logo">
        <h1 className="logo">NA'CHO <br /> PROBLEM</h1>
      </div>

      <div className="cart-container">
        <Container title="CART">
          {error && <p className="error-message">{error}</p>}

          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>

              <div className="cart-add-remove">
                <button onClick={() => decreaseQuantity(item.id)} className="qty-btn">-</button>
                <span className="qty">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="qty-btn">+</button>
                <span className="price">{item.price} kr</span>
              </div>
            </div>
          ))}

          <h2 className="cart-total">TOTAL {totalPrice()} KR</h2>
        </Container>
        <div className="cart-button-wrapper">
          <Button
            size="medium"
            text="PLACE ORDER"
            onClick={() => navigate("/payment")}
          />
        </div>
      </div>
    </div>
  );
}