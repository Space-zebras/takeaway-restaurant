import { http } from "./http";
import type { MenuItem, UpdateMenuItemBody } from "@app/core";

export interface MenuResponse {
    menu: MenuItem[],
    itemsCount: number
}

/* uppdaterade för backend returnerade inte ett menuItem i samma format(hade gått att flytta mapping till backend)*/
export interface UpdateMenuItemResponse {
  message?: string;
  menuItem: {
    id: string;
    category: string[];
    name?: string;
    description: string;
    price: number;
    image?: string;
    ingredients: Record<string, number>;
  };
}

export const MenuApi = {
  getMenu: () =>
    http<MenuResponse>("/menu"),

  updateMenuItem: (id: string, body: UpdateMenuItemBody) =>
    http<UpdateMenuItemResponse>(`/menu/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    })
};
