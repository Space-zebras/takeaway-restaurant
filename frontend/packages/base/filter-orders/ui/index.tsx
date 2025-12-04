import React from "react";
import "./index.css";

export const FilterOrders: React.FC = () => {
  // Temporary
  const categories = ["All", "Active", "Completed"];

  return (
    <div className="filterOrders">
      {categories.map((cat, index) => (
        <button
          key={cat}
          className={
            index === 0
              ? "filterOrders__button filterOrders__button--active"
              : "filterOrders__button"
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterOrders;
