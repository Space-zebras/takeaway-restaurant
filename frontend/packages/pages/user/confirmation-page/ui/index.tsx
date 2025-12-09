import React from "react";
import "./index.css";

import { Container } from "@app/base";
import { ReceiptContainer } from "../children/receipt-container";
import { OrderNumber } from "../children/order-number";
import { OrderStatus } from "../children/order-status";
import { OrderActions } from "../children/order-actions";

export const ConfirmationPage: React.FC = () => {
  return (
    <main className="confirmationPage">
      <ReceiptContainer
        orderNumber="8627"
        items={[
          { name: "Nachotallrik", quantity: 1, price: 120 },
          { name: "Burrito", quantity: 1, price: 110 },
          { name: "Apple Juice", quantity: 2, price: 35 },
        ]}
      />
      <Container title="Order">
        <OrderNumber orderNumber="8627" />
        <OrderStatus status="IS BEING PREPARED" />
        <OrderActions />
      </Container>
    </main>
  );
};
