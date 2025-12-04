import React from "react";
import "./index.css";

// Components
import { Container, FilterOrders, OrderItem } from "@app/base";



export const OrdersPage: React.FC = () => {
  return (
    <main className="ordersPage">
      <Container>
        {/* filter buttons */}
        <FilterOrders />

        {/* Temp mock data for testing */}
        <OrderItem date="21 APR 2025" orderNumber="3154" status="PENDING" />

        <OrderItem date="21 APR 2025" orderNumber="1444" status="PREPARING" />

        <OrderItem date="28 MAR 2025" orderNumber="8585" status="COMPLETE" />
      </Container>
    </main>
  );
};
