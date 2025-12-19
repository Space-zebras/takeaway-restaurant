import "./index.css";
import { Button } from "@app/base";
import { useUpdateOrder } from "@app/core";
import { useNavigate } from "react-router-dom";

type OrderActionsProps = {
  orderId: string;
  status: string;
  onEdit: () => void;
  onOrderAgain?: () => void;
};

export function OrderActions({
  orderId,
  status,
  onEdit,
  onOrderAgain,
}: OrderActionsProps) {
  const navigate = useNavigate();
  const { updateOrder, loading } = useUpdateOrder();

  const handleCancelOrder = async () => {
    if (status === "CANCELLED") return;

    try {
      await updateOrder(orderId, {
        status: "CANCELLED",
      });
      console.log("Order cancelled");
    } catch (err) {
      console.error("Failed to cancel order", err);
    }
  };

  return (
    <div className="orderActions">
      {/* PENDING actions */}
      {status === "PENDING" && (
        <>
          <Button
            size="medium"
            text="UPDATE ORDER"
            onClick={onEdit}
            disabled={loading}
          />

          <Button
            size="medium"
            text="CANCEL ORDER"
            onClick={handleCancelOrder}
            disabled={loading}
          />
        </>
      )}

      {/* COMPLETE action */}
      {status === "COMPLETE" && (
        <Button size="medium" text="ORDER AGAIN" onClick={onOrderAgain} />
      )}

      {/* CANCELLED action */}
      {status === "CANCELLED" && (
        <Button
          size="medium"
          text="BACK TO MENU"
          onClick={() => navigate("/menu")}
        />
      )}
    </div>
  );
}
