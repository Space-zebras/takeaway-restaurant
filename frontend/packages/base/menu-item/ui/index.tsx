import { useState } from "react";
import "./index.css";

type MenuItemCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
};

export function MenuItemCard({
  image,
  title,
  description,
  price,
}: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0);

  const decrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <article className="menuItem">
      <img className="menuItem__image" src={image} alt={title} />

      <div className="menuItem__content">
        <div className="menuItem__leftCol">
          <h4 className="menuItem__title">{title}</h4>
          <p className="menuItem__desc">{description}</p>
        </div>

        <div className="menuItem__rightCol">
          <p className="menuItem__price">{price} kr</p>

          <div className="menuItem__qty">
            <button className="menuItem__qtyBtn" onClick={decrease}>
              {/* Minus button */}
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M8 12H16" stroke="#4a2e1f" strokeLinecap="round" />
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#4a2e1f"
                />
              </svg>
            </button>

            <span className="menuItem__qtyNumber">{quantity}</span>

            <button className="menuItem__qtyBtn" onClick={increase}>
              {/* Plus button */}
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 8V12M12 12V16M8 12H16"
                  stroke="#4a2e1f"
                  strokeLinecap="round"
                />
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#4a2e1f"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
