import "./index.css";

type Props = {
  name: string;
  quantity: number;
};

export function AdminStockItem({ name, quantity }: Props) {
  let levelClass = "adminStockItem__qty--ok";

  if (quantity <= 20) {
    levelClass = "adminStockItem__qty--low";
  } else if (quantity <= 50) {
    levelClass = "adminStockItem__qty--medium";
  }

  return (
    <div className="adminStockItem">
      <span className="adminStockItem__name">{name}</span>
      <span className={`adminStockItem__qty ${levelClass}`}>{quantity}</span>
    </div>
  );
}
