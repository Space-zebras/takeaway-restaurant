import { useCartStore } from "@app/core/stores";
import { type MenuItem } from "@app/core/types";
import { AmountButtons } from "@app/base";
import "./index.css";

export function MenuItemCard({
  image,
  title,
  description,
  price,
}: MenuItem) {
  const addToCart = useCartStore((s) => s.addToCart);
  const decreaseItem = useCartStore((s) => s.decreaseItem);

  const quantity = useCartStore(
    (s) => s.items.find((item) => item.title === title)?.quantity || 0

  );

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

          <AmountButtons
            value={quantity}
            onDecrement={() => decreaseItem(title)}
            onIncrement={() =>
              addToCart({ title, price, quantity: 1 })
            }
          />
        </div>
      </div>
    </article>
  );
}
