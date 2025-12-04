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
            <button className="menuItem__qtyBtn">
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12H16"
                  stroke="#4a2e1f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#4a2e1f"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <span className="menuItem__qtyNumber">1</span>

            <button className="menuItem__qtyBtn">
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12H12M16 12H12M12 12V8M12 12V16"
                  stroke="#4a2e1f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#4a2e1f"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}