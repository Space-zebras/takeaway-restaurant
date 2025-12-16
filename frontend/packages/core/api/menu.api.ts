import { http } from "./http";
import type { MenuItem, UpdateMenuItemBody } from "@app/core";

export interface MenuResponse {
    menu: MenuItem[],
    itemsCount: number
}

interface UpdateMenuItemResponse {
  message?: string,
  menuItem: MenuItem
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
