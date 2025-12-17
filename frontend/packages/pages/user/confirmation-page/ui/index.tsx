import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Container } from "@app/base";
import { ReceiptContainer } from "../children/receipt-container";
import { OrderNumber } from "../children/order-number";
import { OrderStatus } from "../children/order-status";
import { OrderActions } from "../children/order-actions";
import { useGetOrderById } from "@app/core/hooks/order/useGetOrderById";

export const ConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, loading, error } = useGetOrderById(id!);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <main className="confirmationPage">
      <ReceiptContainer
        orderNumber={order.orderId}
        items={order.cart.map((i) => ({
          name: i.menuItem,
          quantity: i.quantity,
          price: i.price,
          
        }))}
      />

      <Container title="Order">
        <OrderNumber orderNumber={order.orderId} />

        <OrderStatus
          status={
            order.status === "PENDING"
              ? "IS BEING PREPARED"
              : order.status === "PREPARING"
              ? "IS BEING PREPARED"
              : order.status === "COMPLETE"
              ? "IS READY!"
              : order.status === "CANCELLED"
              ? "HAS BEEN CANCELLED"
              : order.status
          }
        />

        <OrderActions status={order.status} orderId={order.orderId}/>
      </Container>
    </main>
  );
};
