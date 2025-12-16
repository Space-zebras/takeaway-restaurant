// import React, { useState } from "react";
import { useState } from "react";
import { Container, FilterOrders } from "@app/base";
import { AdminOrderItem } from "../children/admin-order-item/ui";
import { useGetOrders, useUpdateOrder } from "@app/core";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function AdminOrdersPage() {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGetOrders();
  const { updateOrder } = useUpdateOrder();
  const orders = data ?? [];
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter.toLowerCase());

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;


  function getNextStatus(current:string) {
    switch (current.toLowerCase()) {
      case "pending":
        return "PREPARING" as const;
      case "preparing":
        return "COMPLETE" as const;
      default:
        return null;
    }
  }

  async function handleApprove(orderId: string, currentStatus: string) {
    const nextStatus = getNextStatus(currentStatus);
    if(!nextStatus) return;

    await updateOrder(orderId, {status: nextStatus});
    refetch();
  }

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
            onApprove={() => handleApprove(order.orderId, order.status)}
            onDetails={() => navigate(`/admin/order/${order.orderId}`)}
          />
        ))}
      </Container>
    </main>
  );
}
