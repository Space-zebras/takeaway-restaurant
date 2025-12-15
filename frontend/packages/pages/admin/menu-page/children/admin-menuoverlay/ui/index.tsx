import React from "react";
import "./index.css";

type Props = {
  id: string;
  initialTitle: string;
  initialPrice: number;
  initialDescription: string;
  initialIngredients: string;
  onClose: () => void;
  onSave: (updated: {
    id: string;
    title: string;
    price: number;
    description: string;
    ingredients: string;
  }) => void;
};

export function AdminMenuItemEditModal({
  id,
  initialTitle,
  initialPrice,
  initialDescription,
  initialIngredients,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = React.useState(initialTitle);
  const [price, setPrice] = React.useState(String(initialPrice));
  const [description, setDescription] = React.useState(initialDescription);
  const [ingredients, setIngredients] = React.useState(initialIngredients);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPrice = Number(price);
    onSave({
      id,
      title: title.trim(),
      price: Number.isFinite(parsedPrice) ? parsedPrice : initialPrice,
      description: description.trim(),
      ingredients: ingredients.trim(),
    });
  };

  return (
    <div className="adminEditModal__backdrop" onClick={onClose}>
      <div className="adminEditModal" onClick={(e) => e.stopPropagation()}>
        <div className="adminEditModal__header">
          <h2 className="adminEditModal__title">Edit Menu Item</h2>
          <button className="adminEditModal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="adminEditModal__form" onSubmit={handleSubmit}>
          <label className="adminEditModal__label">
            Name
            <input
              className="adminEditModal__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="adminEditModal__label">
            Price
            <input
              className="adminEditModal__input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="numeric"
            />
          </label>

          <label className="adminEditModal__label">
            Description
            <textarea
              className="adminEditModal__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>

          <label className="adminEditModal__label">
            Ingredients (comma separated)
            <input
              className="adminEditModal__input"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. beef, salsa, cheese"
            />
          </label>

          <div className="adminEditModal__buttons">
            <button
              type="button"
              className="adminEditModal__btn adminEditModal__btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="adminEditModal__btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
