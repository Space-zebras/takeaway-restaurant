import "./index.css";

type FilterMenuProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export function FilterMenu({ selected, onSelect }: FilterMenuProps) {
  const categories = [
    "all",
    "mains",
    "nachos",
    "burritos",
    "tacos",
    "sauces",
    "drinks",
  ];

  return (
    <div className="filterMenu">
      {categories.map((cat) => (
        <button
          key={cat}
          className={
            selected === cat
              ? "filterMenu__button filterMenu__button--active"
              : "filterMenu__button"
          }
          onClick={() => onSelect(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
