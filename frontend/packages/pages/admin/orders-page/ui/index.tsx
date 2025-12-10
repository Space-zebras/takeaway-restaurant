import React, { useState } from "react";
import { Container, FilterOrders } from "@app/base";
import { AdminOrderItem } from "../children/admin-order-item/ui";
import { useGetOrders } from "@app/core";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function AdminOrdersPage() {
  const navigate = useNavigate();

  const { data, loading, error } = useGetOrders();

  const orders = data ?? [];

  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter.toLowerCase());

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;

  return (
    <main className="adminOrdersPage">
      <Container title="Customer Orders" variant="full">
        <FilterOrders active={filter} onChange={setFilter} />

        {filteredOrders.map((order) => (
          <AdminOrderItem
            key={order.orderId}
            orderId={order.orderId}
            status={order.status as any}
            // TEMP
            onApprove={() => console.log("Approve", order.orderId)}
            onDetails={() => navigate(`/admin/order/${order.orderId}`)}
          />
        ))}
      </Container>
    </main>
  );
}
