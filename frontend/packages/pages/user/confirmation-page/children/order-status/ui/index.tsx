import React from "react";
import "./index.css";

type OrderStatusProps = {
  status: string;
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  return <p className="orderStatusText">{status}</p>;
};
