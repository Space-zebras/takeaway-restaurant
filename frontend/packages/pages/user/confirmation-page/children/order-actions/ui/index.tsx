import React from "react";
import "./index.css";

export function OrderActions() {
  return (
    <div className="orderActions">
      <button className="orderActions__btn orderActions__btn--update">
        UPDATE ORDER
      </button>

      <button className="orderActions__btn orderActions__btn--cancel">
        CANCEL ORDER
      </button>
    </div>
  );
}
