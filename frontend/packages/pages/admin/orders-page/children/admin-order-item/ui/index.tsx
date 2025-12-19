import "./index.css";

type AdminOrderItemProps = {
  orderId: string;
  status: "pending" | "preparing" | "completed" | "cancelled";
  onApprove?: () => void;
  onDetails: () => void;
};

export function AdminOrderItem({
  orderId,
  status,
  onApprove,
  onDetails,
}: AdminOrderItemProps) {
  return (
    <div className="adminOrderItem">
      <div className="adminOrderItem__info">
        <p>
          <span className="adminOrderItem__orderLabel">ORDER NUMBER: </span>
          <span className="adminOrderItem__orderNumber">{orderId}</span>
        </p>
        <p>
          <span className="adminOrderItem__statusLabel">STATUS: </span>{" "}
          <span
            className={`adminOrderItem__statusValue status--${status.toLowerCase()}`}
          >
            {status}
          </span>
        </p>
      </div>

      <div className="adminOrderItem__actions">
        {(status.toUpperCase() === "PENDING" || status.toUpperCase() === "PREPARING") && (
          <button
            className="adminOrderItem__btn adminOrderItem__btn--approve"
            onClick={onApprove}
          >
            {status.toUpperCase() === "PENDING" ? "Approve Order" : "Complete Order"}
          </button>
        )}

        <button
          className="adminOrderItem__btn adminOrderItem__btn--details"
          onClick={onDetails}
        >
          Details
        </button>
      </div>
    </div>
  );
}
