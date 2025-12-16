import { useCartStore } from "@app/core/";
import { AmountButtons } from "@app/base";
import "./index.css";

interface MenuItemCardProps {
      id: string;
      name: string;
      price: number;
      image: string;
      description?: string;
      category?: string[];
      ingredients?: Record<string, number>;
      showAmountButtons?: boolean;
      showDescription?: boolean;
      showImage?: boolean;
}

export function MenuItemCard(props: MenuItemCardProps) {
  const {
      id,
      image,
      name,
      description,
      price,
      showDescription = true,
      showImage = true,
      showAmountButtons = true,
  } = props;

  const addToCart = useCartStore((s) => s.addToCart);
  const decreaseItem = useCartStore((s) => s.decreaseItem);

  const quantity = useCartStore(
    (s) => s.items.find((item) => item.id === id)?.quantity || 0
  );

  const handleIncrement = () => addToCart({ id, name, price, image, quantity: 1 });
  const handleDecrement = () => decreaseItem(id);

  return (
    <article className="menuItem">
      {showImage && image && <img className="menuItem__image" src={image} alt={name} />}

      <div className="menuItem__content">
        <div className="menuItem__leftCol">
          <h4 className="menuItem__title">{name}</h4>
          {showDescription && <p className="menuItem__desc">{description}</p>}
        </div>

        <div className="menuItem__rightCol">
          <p className="menuItem__price">{price} kr</p>
          {showAmountButtons && (
            <AmountButtons
              value={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          )}
        </div>
      </div>
    </article>
  );
}
