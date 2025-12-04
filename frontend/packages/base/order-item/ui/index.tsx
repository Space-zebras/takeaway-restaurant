import React from "react";
import "./index.css";

type OrderItemProps = {
  date: string;
  orderNumber: string;
  status: "PENDING" | "PREPARING" | "COMPLETE";
};

export const OrderItem: React.FC<OrderItemProps> = ({
  date,
  orderNumber,
  status,
}) => {
  return (
    <article className="orderItem">
      <div className="orderItem__leftCol">
        <p className="orderItem__date">{date}</p>
        <p className="orderItem__order">
          <span className="orderItem__orderLabel">ORDER </span>
          <span className="orderItem__orderNumber">{orderNumber}</span>
        </p>
      </div>

      <div className="orderItem__middleCol">
        <span className="orderItem__statusLabel">STATUS</span>
        <span
          className={`orderItem__statusValue status--${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>

      <div className="orderItem__rightCol">
        {/* {Placeholder button - replacing with componenet later} */}
        <button className="orderItem__actionBtn">VIEW</button>
      </div>
    </article>
  );
};
