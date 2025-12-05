import React from "react";
import "./index.css";

type OrderStatusProps = {
  status: string; // unsure of type?
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  // status will more detailed in future - placeholder for now
  return <p className="orderStatusText">{status}</p>;
};
