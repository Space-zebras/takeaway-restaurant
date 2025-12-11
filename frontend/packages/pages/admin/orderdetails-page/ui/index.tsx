import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@app/base";
import { OrderActionButtons } from "../children/admin-orderbuttons";
import { useGetOrderById } from "@app/core/hooks/order/useGetOrderById";
import "./index.css";

function formatDate(dateString: string) {
  const d = new Date(dateString);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function AdminOrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, loading, error } = useGetOrderById(id!);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>Error loading order: {error}</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <main className="adminOrderDetailsPage">
      <Container title="Order Details" variant="full">
        <div className="orderDetails__content">
          <div className="orderDetails__left">
            <p className="orderDetails__label">
              ORDER NO: <span>{order.orderId}</span>
            </p>

            <p className="orderDetails__label">
              STATUS:{" "}
              <span className="orderDetails__status">{order.status}</span>
            </p>

            <p className="orderDetails__label">
              {order.payment === "online" ? "Paid Online" : "Pay At Pickup"}
            </p>

            <p className="orderDetails__label">
              DATE: <span>{formatDate(order.createdAt)}</span>
            </p>
          </div>

          <div className="orderDetails__right">
            <div className="orderDetails__itemsHeader">
              <span>Qty</span>
              <span>Item</span>
            </div>

            {order.cart.map((entry, index) => (
              <div key={index} className="orderDetails__itemRow">
                <span>{entry.quantity}</span>
                <span>{entry.menuItem}</span>
              </div>
            ))}
          </div>
        </div>

        <OrderActionButtons
          status={order.status}
          onApprove={() => console.log("Approve order", order.orderId)}
          onCancel={() => console.log("Cancel order", order.orderId)}
          onComplete={() => console.log("Mark complete", order.orderId)}
        />
      </Container>
    </main>
  );
}
