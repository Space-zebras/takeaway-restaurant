import "./index.css";
import { Button } from "@app/base";
import { useUpdateOrder } from "@app/core";

type OrderActionsProps = {
  orderId: string,
  status: string;
};

export function OrderActions({ orderId, status }: OrderActionsProps) {
  const { updateOrder, loading } = useUpdateOrder();

  const handleCancelOrder = async () => {
    if(status === "CANCELLED") return;

    try {
      await updateOrder(orderId, {
        status: "CANCELLED"
      });
      console.log("Order cacelled")
    } catch (err) {
      console.error("Failed to cancel order", err)
    }  
  };

  return (
    <div className="orderActions">
      <Button size="medium" text="UPDATE ORDER" />
      <Button 
        size="medium" 
        text="CANCEL ORDER" 
        onClick={handleCancelOrder}
        disabled={loading || status === "CANCELLED"}
      />
      {/* <button className="orderActions__btn orderActions__btn--update">
        UPDATE ORDER
      </button>

      <button className="orderActions__btn orderActions__btn--cancel">
        CANCEL ORDER
      </button> */}
    </div>
  );
}
