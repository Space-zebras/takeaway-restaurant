import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Container } from "@app/base";
import { ReceiptContainer } from "../children/receipt-container";
import { OrderNumber } from "../children/order-number";
import { OrderStatus } from "../children/order-status";
import { OrderActions } from "../children/order-actions";
import { useGetOrderById } from "@app/core/hooks/order/useGetOrderById";

import { EditOrderOverlay } from "../children/edit-order";

export const ConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, loading, error } = useGetOrderById(id!);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editableItems, setEditableItems] = React.useState<
    { name: string; quantity: number; price: number }[]
  >([]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <>
      <main className="confirmationPage">
        <ReceiptContainer
          orderNumber={order.orderId}
          items={order.cart.map((i) => ({
            name: i.menuItem,
            quantity: i.quantity,
            price: i.price,
          }))}
        />

        <Container title="ORDER">
          <OrderNumber orderNumber={order.orderId} />

          <OrderStatus
            status={
              order.status === "PENDING"
                ? "HAS BEEN RECEIVED"
                : order.status === "PREPARING"
                ? "IS BEING PREPARED"
                : order.status === "COMPLETE"
                ? "IS READY!"
                : order.status === "CANCELLED"
                ? "HAS BEEN CANCELLED"
                : order.status
            }
          />

          <OrderActions
            status={order.status}
            orderId={order.orderId}
            onEdit={() => {
              setEditableItems(
                order.cart.map((i) => ({
                  name: i.menuItem,
                  quantity: i.quantity,
                  price: i.price,
                }))
              );
              setIsEditing(true);
            }}
          />
        </Container>
      </main>

      {isEditing && (
        <EditOrderOverlay
          items={editableItems}
          onClose={() => setIsEditing(false)}
          onSave={(updatedItems) => {
            console.log("Updated order items:", updatedItems);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};
