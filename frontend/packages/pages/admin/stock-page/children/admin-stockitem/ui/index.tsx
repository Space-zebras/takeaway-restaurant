import { useState, useEffect } from "react";
import "./index.css";

type Props = {
  name: string;
  quantity: number;
  onChange: (quantity: number) => void;
};

export function AdminStockItem({ name, quantity, onChange }: Props) {
  const [localQty, setLocalQty] = useState(quantity);

  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLocalQty(val);
    onChange(val);
  };

  let levelClass = "adminStockItem__qty--ok";
  if (localQty <= 10) levelClass = "adminStockItem__qty--low";
  else if (localQty <= 20) levelClass = "adminStockItem__qty--medium";

  return (
    <div className="adminStockItem">
      <span className="adminStockItem__name">{name}</span>
      <input
        type="number"
        className={`adminStockItem__input ${levelClass}`}
        value={localQty}
        onChange={handleChange}
      />
    </div>
  );
}
