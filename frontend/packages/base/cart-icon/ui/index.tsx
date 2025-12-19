import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@app/core/stores";
import "./index.css";

type CartIconProps = {
  variant?: "desktop" | "mobile";
};

export function CartIcon({ variant = "desktop" }: CartIconProps) {
  const totalQuantity = useCartStore((state) => state.totalQuantity());

  const iconSize = variant === "mobile" ? 20 : 24;
  const badgeClass = variant === "mobile" ? "cart__number--mobile" : "";

  return (
    <div className={`cart-icon cart-icon--${variant}`}>
      <FaShoppingCart size={iconSize} />
      {totalQuantity > 0 && (
        <span className={`cart__number ${badgeClass}`}>{totalQuantity}</span>
      )}
    </div>
  );
}
