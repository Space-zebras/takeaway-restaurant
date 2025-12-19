import React from "react";
import type { MenuItem } from "@app/core";
import "./index.css";

//functions to convert ingredients
  function ingredientsToString(ingredients?: Record<string, number>): string {
  if (!ingredients || Object.keys(ingredients).length === 0) return "";
  return Object.keys(ingredients).sort().join(", ");
};

function ingredientsStringToRecord(value: string): Record<string, number> {
  if (!value.trim()) return {};
  return value
    .split(",")
    .map(i => i.trim())
    .filter(Boolean)
    .reduce<Record<string, number>>((acc, ingredient) => {
      acc[ingredient] = 1;
      return acc;
    }, {});
}

type Props = {
  item: MenuItem,
  onClose: () => void;
  onSave: (updated: {
    id: string;
    name: string;
    price: number;
    description: string;
    ingredients: Record<string, number>;
    category?: string[],
  }) => void;
};



export function AdminMenuItemEditModal({
  item,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = React.useState(item.name);
  const [price, setPrice] = React.useState(String(item.price));
  const [description, setDescription] = React.useState(item.description);
  const [ingredients, setIngredients] = React.useState(ingredientsToString(item.ingredients));
  const [category, setCategory] = React.useState(item.category.join(", "));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Number(price);

    onSave({
      id: item.id,
      name: name.trim(),
      price: Number.isFinite(parsedPrice) ? parsedPrice : item.price,
      description: description.trim(),
      ingredients: ingredientsStringToRecord(ingredients),
      category: category.split(",").map(c => c.trim()).filter(Boolean),
    });

    onClose();
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
            <h3 className="adminEditModal__label">{name.toUpperCase()}</h3>
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

          <label className="adminEditModal__label">
            Category (comma separated)
            <input
              className="adminEditModal__input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Mexican, Vegan"
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