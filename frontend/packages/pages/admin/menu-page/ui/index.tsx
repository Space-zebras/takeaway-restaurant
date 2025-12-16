import React from "react";
import { Container } from "@app/base";
import { useMenu } from "@app/core";
import { AdminMenuItemCard } from "../children/admin-menuitem";
import { AdminMenuItemEditModal } from "../children/admin-menuoverlay";
import "./index.css";

type MenuItem = {
  id: string;
  name?: string;
  menuItem?: string;
  description?: string;
  price: number;
  image?: string;
  ingredients?: any;
  category?: string[];
};

function toTitle(item: MenuItem) {
  return item.name ?? item.menuItem ?? "Untitled item";
}

function ingredientsToString(ingredients: any) {
  if (!ingredients) return "";
  if (Array.isArray(ingredients)) return ingredients.join(", ");
  if (typeof ingredients === "string") return ingredients;
  if (typeof ingredients === "object")
    return Object.keys(ingredients).join(", ");
  return "";
}

export function AdminMenuPage() {
  const { data } = useMenu();
  const [items, setItems] = React.useState<MenuItem[]>([]);
  const [selected, setSelected] = React.useState<MenuItem | null>(null);

  React.useEffect(() => {
    setItems(data ?? []);
  }, [data]);

  const handleOpenEdit = (item: MenuItem) => setSelected(item);
  const handleCloseEdit = () => setSelected(null);

  const handleSave = (updated: {
    id: string;
    title: string;
    price: number;
    description: string;
    ingredients: string;
  }) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === updated.id
          ? {
              ...it,
              name: updated.title,
              description: updated.description,
              price: updated.price,
              ingredients: updated.ingredients,
            }
          : it
      )
    );
    handleCloseEdit();
  };

  return (
    <main className="adminMenuPage">
      <Container title="Manage Menu" variant="full">
        <div className="adminMenuGrid">
          {items.map((item) => (
            <AdminMenuItemCard
              key={item.id}
              id={item.id}
              title={toTitle(item)}
              description={item.description ?? ""}
              price={item.price}
              image={item.image}
              onEdit={() => handleOpenEdit(item)}
            />
          ))}
        </div>

        {selected && (
          <AdminMenuItemEditModal
            id={selected.id}
            initialTitle={toTitle(selected)}
            initialPrice={selected.price}
            initialDescription={selected.description ?? ""}
            initialIngredients={ingredientsToString(selected.ingredients)}
            onClose={handleCloseEdit}
            onSave={handleSave}
          />
        )}
      </Container>
    </main>
  );
}
