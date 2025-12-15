import React from "react";
import "./index.css";

type Props = {
  id: string;
  title: string;
  description: string;
  price: number;
  onEdit: () => void;
};

export function AdminMenuItemCard({
  title,
  description,
  price,
  onEdit,
}: Props) {
  return (
    <article className="adminMenuItemCard">
      <div className="adminMenuItemCard__content">
        <div className="adminMenuItemCard__topRow">
          <h3 className="adminMenuItemCard__title">{title}</h3>
          <span className="adminMenuItemCard__price">{price} kr</span>
        </div>

        <p className="adminMenuItemCard__desc">{description}</p>

        <div className="adminMenuItemCard__actions">
          <button className="adminMenuItemCard__editBtn" onClick={onEdit}>
            EDIT
          </button>
        </div>
      </div>
    </article>
  );
}
