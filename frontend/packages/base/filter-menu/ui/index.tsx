import React from "react";
import "./index.css";

export const FilterMenu: React.FC = () => {
  // Temporary
  const categories = ["Nachos", "Burritos", "Tacos", "Sides", "Drinks"];

  return (
    <div className="filterMenu">
      {categories.map((cat, index) => (
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
};

export default FilterMenu;
