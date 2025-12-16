// import React from "react";
import "./index.css";

type OrderActionsProps = {
  status: string;
};

export function OrderActions({ status }: OrderActionsProps) {
  return (
    <div className="orderActions" data-status={status}>
      <button className="orderActions__btn orderActions__btn--update">
        UPDATE ORDER
      </button>

      <button className="orderActions__btn orderActions__btn--cancel">
        CANCEL ORDER
      </button>
    </div>
  );
}
