import React, { useState } from "react";
import { Container, FilterOrders } from "@app/base";
import { AdminOrderItem } from "../children/admin-order-item/ui";
import "./index.css";

// temp
import { useNavigate } from "react-router-dom";

export function AdminOrdersPage() {
  //temp
  const navigate = useNavigate();

  const mockOrders = [
    { orderNumber: "8627", status: "preparing" },
    { orderNumber: "1444", status: "pending" },
    { orderNumber: "7005", status: "preparing" },
    { orderNumber: "9659", status: "cancelled" },
    { orderNumber: "0407", status: "cancelled" },
  ];

  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? mockOrders
      : mockOrders.filter(
          (o) => o.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <main className="adminOrdersPage">
      <Container title="Customer Orders" variant="full">
        <FilterOrders active={filter} onChange={setFilter} />

        {filteredOrders.map((order) => (
          <AdminOrderItem
            key={order.orderNumber}
            orderNumber={order.orderNumber}
            status={order.status as any}
            onApprove={() => console.log("Approve", order.orderNumber)}
            //onDetails={() => console.log("Details", order.orderNumber)}

            // temp - then restore previous line above once this is removed again
            onDetails={() => navigate(`/admin/order/${order.orderNumber}`)}
          />
        ))}
      </Container>
    </main>
  );
}
