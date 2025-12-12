import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";

export const handler = async () => {
  const TableName = "menu";

  try {
    const data = await client.send(new ScanCommand({ TableName }));

    const menu = (data.Items || []).map((it) => ({
      id: it.id?.S,
      name: it.menuItem?.S || "",
      category: it.category?.SS || [],
      description: it.description?.S || "",
      ingredients: it.ingredients?.M || {},
      image: it.imageUrl?.S || "",
      price: it.price ? Number(it.price.N) : 0,
    }));

    return responseHandler(200, { menu: menu, itemsCount: menu.length });
  } catch (err) {
    console.error("getMenu error:", err);
    return responseHandler(500, { message: "Internal Server Error" });
  }
};
