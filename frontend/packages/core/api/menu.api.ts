import { http } from "./http";

export interface MenuItem {
    menuItem: string,
    category: string | string[], //borde göra så databasen följer samma stil för alla menuITem kanske?
    ingredients: Record<string, number>,
    description: string,
    price: number, 
}

export interface MenuResponse {
    menu: MenuItem[],
    itemsCount: number
}

export const MenuApi = {
    getMenu: () => http<MenuResponse>("/menu")
}