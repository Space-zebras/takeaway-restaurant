import React from "react";
import "./index.css";

type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
  // totalPrice: number;
};

type Props = {
  orderNumber: string;
  items: ReceiptItem[];
};

export function ReceiptContainer({ orderNumber, items }: Props) {
  // To work out the total.
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const shortNumber = String(orderNumber).slice(0, 4);

  return (
    <div className="receiptContainer">
      <div className="receiptContainer__header">
        <h2 className="receiptContainer__label">RECEIPT</h2>
        <h2 className="receiptContainer__orderNumber">Order {shortNumber}</h2>
      </div>

      {/* ITtems */}
      <div className="receiptContainer__items">
        {items.map((item, idx) => (
          <div className="receiptContainer__row" key={idx}>
            <span className="receiptContainer__itemName">{item.name}</span>
            <span className="receiptContainer__qty">{item.quantity}</span>
            <span className="receiptContainer__price">{item.price} KR</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="receiptContainer__totalRow">
        <span className="receiptContainer__totalLabel">TOTAL</span>
        <span className="receiptContainer__totalAmount">{total} KR</span>
      </div>
    </div>
  );
}
