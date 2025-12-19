import React from "react";
import { Container } from "@app/base";
import { useMenu, useUpdateMenuItem, type MenuItem } from "@app/core";
import { AdminMenuItemCard } from "../children/admin-menuitem";
import { AdminMenuItemEditModal } from "../children/admin-menuoverlay";
import "./index.css";

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
    name: string;
    price: number;
    description: string;
    ingredients: Record<string, number>;
    category?: string[];
  }) => {
    if (!selected) return;

    try {
      console.log("selected.id:", selected.id);
      console.log("updated data being sent:", {
        price: updated.price,
        description: updated.description,
        ingredients: updated.ingredients,
        category: updated.category,
      });
      /* uppdatera menuitem i backend */
      const updatedItem = await updateMenuItem(updated.id, {
        name: selected.name,
        price: updated.price,
        description: updated.description,
        ingredients: updated.ingredients,
        category: updated.category,
      });
      console.log("Updated item returned from hook:", updatedItem);

      /* ska ju uppdatera ui men tror ej det funkar som det ska */
      setItems(prev =>
        prev.map(item => (item.name === selected.name ? updatedItem : item))
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
              key={item.id}
              item={item}
              onEdit={() => handleOpenEdit(item)}
            />
          ))}
        </div>

        {selected && (
          <AdminMenuItemEditModal
            item={selected}
            onClose={handleCloseEdit}
            onSave={handleSave}
          />
        )}
      </Container>
    </main>
  );
}
