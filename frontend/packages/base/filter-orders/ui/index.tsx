import "./index.css";

type Props = {
  active: string;
  onChange: (value: string) => void;
};

export function FilterOrders({ active, onChange }: Props) {
  const categories = ["All", "Pending", "Preparing", "Complete", "Cancelled"];

  return (
    <div className="filterOrders">
      {categories.map((cat) => (
        <button
          key={cat}
          className={
            active === cat
              ? "filterOrders__button filterOrders__button--active"
              : "filterOrders__button"
          }
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
