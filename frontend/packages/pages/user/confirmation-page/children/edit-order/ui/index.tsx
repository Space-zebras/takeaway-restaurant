import React from "react";
import "./index.css";

type EditableOrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Props = {
  items: EditableOrderItem[];
  onClose: () => void;
  onSave: (updatedItems: EditableOrderItem[]) => void;
};

export function EditOrderOverlay({ items, onClose, onSave }: Props) {
  const [localItems, setLocalItems] = React.useState(items);

  const handleQuantityChange = (index: number, value: number) => {
    setLocalItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(0, value) } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localItems);
  };

  return (
    <div className="editOrderOverlay__backdrop" onClick={onClose}>
      <div className="editOrderOverlay" onClick={(e) => e.stopPropagation()}>
        <div className="editOrderOverlay__header">
          <h2 className="editOrderOverlay__title">Update Your Order</h2>
          <button className="editOrderOverlay__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="editOrderOverlay__form" onSubmit={handleSubmit}>
          {localItems.map((item, index) => (
            <div key={item.name} className="editOrderOverlay__row">
              <span className="editOrderOverlay__itemName">{item.name}</span>

              <input
                type="number"
                min={0}
                className="editOrderOverlay__qtyInput"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, Number(e.target.value))
                }
              />
            </div>
          ))}

          <div className="editOrderOverlay__buttons">
            <button
              type="button"
              className="editOrderOverlay__btn editOrderOverlay__btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="editOrderOverlay__btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
