import React from "react";
import { Container } from "@app/base";
import { useMenu, useUpdateMenuItem } from "@app/core";
import { AdminMenuItemCard } from "../children/admin-menuitem";
import { AdminMenuItemEditModal } from "../children/admin-menuoverlay";
import "./index.css";

export type MenuItem = {
  id: string;
  category: string[];
  name?: string;
  description?: string;
  price: number;
  image?: string;
  ingredients?: Record<string, number>;
};

/* här faller det på id om namn inte finns så det bör nog uppdateras! */
function toTitle(item: MenuItem) {
  return item.name ?? item.id ?? "Untitled item";
}

function ingredientsToString(ingredients?: Record<string, number>): string {
  if (!ingredients) return "";
  return Object.keys(ingredients).join(", ");
}

/* behövde omvanlda formatet på ingredients till backend */
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

export function AdminMenuPage() {
  const { data } = useMenu();
  const { updateMenuItem } = useUpdateMenuItem();
  const [items, setItems] = React.useState<MenuItem[]>([]);
  const [selected, setSelected] = React.useState<MenuItem | null>(null);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      setItems(data as MenuItem[]);
    }
  }, [data]);

  const handleOpenEdit = (item: MenuItem) => setSelected(item);
  const handleCloseEdit = () => setSelected(null);

  const handleSave = async (updated: {
    id: string;
    title: string;
    price: number;
    description: string;
    ingredients: string;
    category?: string[];
  }) => {
    if (!selected) return;

    try {
      console.log("selected.id:", selected.id);
      console.log("updated data being sent:", {
        price: updated.price,
        description: updated.description,
        ingredients: ingredientsStringToRecord(updated.ingredients),
        category: updated.category,
      });
      /* uppdatera menuitem i backend */
      const updatedItem = await updateMenuItem(updated.id, {
        price: updated.price,
        description: updated.description,
        ingredients: ingredientsStringToRecord(updated.ingredients),
        category: updated.category,
      });
      console.log("Updated item returned from hook:", updatedItem);

      /* ska ju uppdatera ui men tror ej det funkar som det ska */
      setItems(prev =>
        prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );

      handleCloseEdit();
    } catch (error) {
      console.error("Failed to update menu item", error);
    }
  };

  return (
    <main className="adminMenuPage">
      <Container title="Manage Menu" variant="full">
        <div className="adminMenuGrid">
          {items.map(item => (
            <AdminMenuItemCard
              key={`${item.id}-${item.category.join(",")}`}
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
