export const API_BASE = import.meta.env.VITE_API_BASE;

export type MenuItem = {
    id: string,
    name: string,
    category: string[],
    ingredients: Record<string, number>,
    description: string,
    price: number, 
    image: string,
}

export interface MenuResponse {
    menu: MenuItem[],
    itemsCount: number
}

export const MenuApi = {
  getMenu: async (): Promise<MenuItem[]> => {
    const res = await fetch(`${API_BASE}/menu`);
    if (!res.ok) throw new Error("Failed to fetch menu");

    const data: MenuResponse = await res.json();
    return data.menu;
  }
};
