import type { MenuItem } from "@app/core";
import "./index.css";

type Props = {
  item: MenuItem;
  onEdit: () => void;
};

export function AdminMenuItemCard({
  item,
  onEdit,
}: Props) {
  return (
    <article className="adminMenuItemCard">
      <div className="adminMenuItemCard__content">
        <div className="adminMenuItemCard__topRow">
          <h3 className="adminMenuItemCard__title">{item.name}</h3>
          <span className="adminMenuItemCard__price">{item.price} kr</span>
        </div>

        <p className="adminMenuItemCard__desc">{item.description}</p>

        <div className="adminMenuItemCard__actions">
          <button className="adminMenuItemCard__editBtn" onClick={onEdit}>
            EDIT
          </button>
        </div>
      </div>
    </article>
  );
}

