import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import type { CartItem } from "../orders/create-order.mts";

export interface StockItem {
    name: string;
    quantity: number;
}

export interface MenuItem {
    id: string;
    ingredients: Record<string, { N: string }>;
}

export const fetchStock = async (): Promise<StockItem[]> => {
    const TableName = "stock";

    const data = await client.send(new ScanCommand({ TableName }));

  return (data.Items || []).map((it: any) => ({
      name: it.stockItem?.S || "",
      quantity: it.quantity?.N ? Number(it.quantity.N) : 0,
  }));
};

export const calculateIngredientUsage = (cart: CartItem[], menu: MenuItem[]) => {
  const usage: Record<string, number> = {};

  for (const cartItem of cart) {
    const menuItem = menu.find((m) => m.id === cartItem.menuItem);
    if (!menuItem) continue;

    for (const [ingredient, value] of Object.entries(menuItem.ingredients)) {
      const neededAmount = Number(value.N ?? 0) * cartItem.quantity;
      usage[ingredient] = (usage[ingredient] || 0) + neededAmount;
    }
  }

  return usage;
};

export const checkStock = async (cart: CartItem[], menu: MenuItem[]) => {
  const stock = await fetchStock();
  const stockMap: Record<string, number> = {};
  stock.forEach((item) => {
    stockMap[item.name] = item.quantity;
  });

  const usage = calculateIngredientUsage(cart, menu);

  const missingIngredients = Object.entries(usage)
    .filter(([ingredient, qty]) => (stockMap[ingredient] ?? 0) < qty)
    .map(([ingredient]) => ingredient);

  if (missingIngredients.length > 0) {
    return { valid: false, missing: missingIngredients };
  }

  return { valid: true };
};

export const deductStock = async (cart: CartItem[], menu: MenuItem[]) => {
  const stock = await fetchStock();
  const stockMap: Record<string, number> = {};
  stock.forEach((item) => {
    stockMap[item.name] = item.quantity;
  });

  const usage = calculateIngredientUsage(cart, menu);

  const missingIngredients = Object.entries(usage)
    .filter(([ingredient, qty]) => (stockMap[ingredient] ?? 0) < qty)
    .map(([ingredient]) => ingredient);

  if (missingIngredients.length > 0) {
    throw new Error(`Not enough stock for: ${missingIngredients.join(", ")}`);
  }

  for (const [ingredient, qty] of Object.entries(usage)) {
    const newQuantity = stockMap[ingredient] - qty;

    await client.send(
      new PutItemCommand({
        TableName: "stock",
        Item: {
          stockItem: { S: ingredient },
          quantity: { N: newQuantity.toString() },
        },
      })
    );
  }
};
