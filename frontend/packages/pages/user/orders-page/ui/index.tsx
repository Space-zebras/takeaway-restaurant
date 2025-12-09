import React from "react";
import "./index.css";

// Components
import { Container, FilterOrders, OrderItem } from "@app/base";
import { useGetOrders } from "@app/core";

export const OrdersPage: React.FC = () => {
  const { data } = useGetOrders();

  const orders = data ?? []

  const [filter, setFilter] = React.useState("All");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (o) => o.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <main className="ordersPage">
      <Container title="Your Orders">
        {/* filter buttons */}
        <FilterOrders active={filter} onChange={setFilter} />
        {filteredOrders.map((order) => (
          <OrderItem
            key={order.orderId}
            date={order.createdAt}
            orderNumber={order.orderId}
            status={order.status}
          />
        ))}
      </Container>
    </main>
  );
};
