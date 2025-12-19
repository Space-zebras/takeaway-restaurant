import "./index.css";

type OrderItemProps = {
  date: string;
  orderNumber: string;
  status: "PENDING" | "PREPARING" | "COMPLETE" | "CANCELLED";
};

export function OrderItem({ date, orderNumber, status }: OrderItemProps) {
  const shortNumber = String(orderNumber).slice(0, 4);

  return (
    <article className="orderItem">
      <div className="orderItem__leftCol">
        <p className="orderItem__date">{date}</p>
        <p className="orderItem__order">
          <span className="orderItem__orderLabel">ORDER </span>
          <span className="orderItem__orderNumber">{shortNumber}</span>
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
        <a className="orderLink" href={`/order/${orderNumber}`}>
          <button className="orderItem__actionBtn">VIEW</button>
        </a>
      </div>
    </article>
  );
}
