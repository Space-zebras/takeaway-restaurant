import React from "react";
import "./index.css";

type OrderNumberProps = {
  orderNumber: string | number;
};

export const OrderNumber: React.FC<OrderNumberProps> = ({ orderNumber }) => {
  return <div className="orderNumberBubble">{orderNumber}</div>;
};
