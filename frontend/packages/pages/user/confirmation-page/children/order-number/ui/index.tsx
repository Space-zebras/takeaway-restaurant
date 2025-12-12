import React from "react";
import "./index.css";

type OrderNumberProps = {
  orderNumber: string | number;
};

export const OrderNumber: React.FC<OrderNumberProps> = ({ orderNumber }) => {
  const shortNumber = String(orderNumber).slice(0, 4);

  return <div className="orderNumberBubble">{shortNumber}</div>;
};
