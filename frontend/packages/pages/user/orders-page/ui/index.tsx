import React from "react";
import "./index.css";

// Components
import { Container, FilterOrders, OrderItem } from "@app/base";

export const OrdersPage: React.FC = () => {
  const mockOrders = [
    {
      date: "21 APR 2025",
      orderNumber: "8627",
      status: "PREPARING",
    },
    {
      date: "21 APR 2025",
      orderNumber: "1444",
      status: "PENDING",
    },
    {
      date: "28 MAR 2025",
      orderNumber: "7005",
      status: "PREPARING",
    },
    {
      date: "6 FEB 2025",
      orderNumber: "9659",
      status: "CANCELLED",
    },
    {
      date: "31 JAN 2025",
      orderNumber: "0407",
      status: "CANCELLED",
    },
  ];

  const [filter, setFilter] = React.useState("All");

  const filteredOrders =
    filter === "All"
      ? mockOrders
      : mockOrders.filter(
          (o) => o.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <main className="ordersPage">
      <Container title="Your Orders">
        {/* filter buttons */}
        <FilterOrders active={filter} onChange={setFilter} />
        {filteredOrders.map((order) => (
          <OrderItem
            key={order.orderNumber}
            date={order.date}
            orderNumber={order.orderNumber}
            status={order.status}
          />
        ))}
      </Container>
    </main>
  );
};
