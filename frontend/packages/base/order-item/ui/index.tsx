import "./index.css";

type OrderItemProps = {
  date: string;
  orderNumber: string;
  status: "PENDING" | "PREPARING" | "COMPLETE";
};

export function OrderItem({ date, orderNumber, status }: OrderItemProps) {
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
        <button className="orderItem__actionBtn">VIEW</button>
      </div>
    </article>
  );
}
