import { useState } from "react";
import { MenuApi, type MenuItem, type UpdateMenuItemBody } from "@app/core";

export function useUpdateMenuItem() {
    const [item, setMenuItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function updateMenuItem(id: string, body: UpdateMenuItemBody) {
        try {
            setLoading(true);
            setError(null);

            const res = await MenuApi.updateMenuItem(id, body);

            if (!res.menuItem) {
                throw new Error("No menu item returned from server");
            }
            /* här sker mapping, api formatet är typ res.menuItem och i frontend är det MenuItem */
            const mappedUpdatedItem: MenuItem = {
                id: res.menuItem.id,
                category: res.menuItem.category || [],
                name: res.menuItem.name || "",
                // name: res.menuItem.name ?? res.menuItem.id,
                description: res.menuItem.description,
                price: res.menuItem.price,
                image: res.menuItem.image || "",
                ingredients: res.menuItem.ingredients || {},
            };

            setMenuItem(mappedUpdatedItem);
            return mappedUpdatedItem;
        } catch (err: any) {
            setError(err.message ?? "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { item, loading, error, updateMenuItem };
}

