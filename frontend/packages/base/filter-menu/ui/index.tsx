import "./index.css";

export function FilterMenu() {
  const categories: string[] = ["Nachos", "Burritos", "Tacos", "Sides", "Drinks"];

  return (
    <div className="filterMenu">
      {categories.map((cat: string, index: number) => (
        <button
          key={cat}
          className={
            index === 0
              ? "filterMenu__button filterMenu__button--active"
              : "filterMenu__button"
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}