import React from "react";
import { Container } from "@app/base";
import { OrderActionButtons } from "../children/admin-orderbuttons";
import "./index.css";

// Temp order info
const mockOrder = {
  orderNumber: "8627",
  status: "PENDING",
  payment: "pay-at-pickup",
  date: "Mon, 21/02/2025 14:40",
  cart: [
    { item: "Beef Bandito Burrito", qty: 1 },
    { item: "Guac Attack Taco", qty: 1 },
    { item: "Apple Juice", qty: 2 },
  ],
};

export function AdminOrderDetailsPage() {
  const order = mockOrder;

  return (
    <main className="adminOrderDetailsPage">
      <Container title="Order Details" variant="full">
        {/* Left of container */}
        <div className="orderDetails__content">
          <div className="orderDetails__left">
            <p className="orderDetails__label">
              ORDER NO: <span>{order.orderNumber}</span>
            </p>

            <p className="orderDetails__label">
              STATUS: <span>{order.status}</span>
            </p>

            <p className="orderDetails__label">Pay At Pickup</p>

            <p className="orderDetails__label">
              DATE: <span>{order.date}</span>
            </p>
          </div>

          {/* Right of container */}
          <div className="orderDetails__right">
            <div className="orderDetails__itemsHeader">
              <span>Qty</span>
              <span>Item</span>
            </div>

            {order.cart.map((entry, index) => (
              <div key={index} className="orderDetails__itemRow">
                <span>{entry.qty}</span>
                <span>{entry.item}</span>
              </div>
            ))}
          </div>
        </div>

        <OrderActionButtons
          status={order.status}
          onApprove={() => console.log("Approve order", order.orderNumber)}
          onCancel={() => console.log("Cancel order", order.orderNumber)}
          onComplete={() => console.log("Mark complete", order.orderNumber)}
        />
      </Container>
    </main>
  );
}
