export const API_BASE = import.meta.env.VITE_API_BASE;

export interface MenuItem {
    menuItem: string,
    category: string[],
    ingredients: Record<string, number>,
    description: string,
    price: number, 
}

export interface MenuResponse {
    menu: MenuItem[],
    itemsCount: number
}

export const MenuApi = {
  getMenu: async (): Promise<MenuResponse> => {
    const res = await fetch(`${API_BASE}/menu`);
    if (!res.ok) throw new Error("Failed to fetch menu");
    return res.json();
  }
};