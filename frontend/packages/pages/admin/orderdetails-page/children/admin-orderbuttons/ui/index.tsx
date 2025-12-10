import "./index.css";

type OrderActionButtonsProps = {
  status: string;
  onApprove?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
};

export function OrderActionButtons({
  status,
  onApprove,
  onCancel,
  onComplete,
}: OrderActionButtonsProps) {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <div className="orderActions">
          <button className="orderActions__btn" onClick={onApprove}>
            Approve Order
          </button>
          <button className="orderActions__btn" onClick={onCancel}>
            Cancel Order
          </button>
        </div>
      );

    case "preparing":
      return (
        <div className="orderActions">
          <button className="orderActions__btn" onClick={onComplete}>
            Mark Complete
          </button>
          <button
            className="orderActions__btn orderActions__btn--cancel"
            onClick={onCancel}
          >
            Cancel Order
          </button>
        </div>
      );

    default:
      return null;
  }
}
