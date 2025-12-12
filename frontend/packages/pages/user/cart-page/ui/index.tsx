import { useNavigate } from "react-router-dom";
import { Button, Container, MenuItemCard } from "@app/base";
import { useCartStore } from "@app/core";
import "./index.css";

export function CartPage() {
  const navigate = useNavigate();
  const { items, totalPrice } = useCartStore();

  return (
    <div className="cart-layout">
      <div className="cart-logo">
        <h1 className="logo">NA'CHO <br /> PROBLEM</h1>
      </div>

      <div className="cart-container">
        <Container title="CART">

          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              {items.map(item => (
                <MenuItemCard
                  key={item.id}
  
                  {...item}
                  showDescription={false}
                  showImage={false}
                  showAmountButtons={true}
                />
              ))}

              <h2 className="cart-total"> {totalPrice()} KR</h2>
            </>
          )}
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