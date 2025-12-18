import { client } from "../services/db.mjs";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const handler = async (event: any) => {
  const TableName = process.env.MENU_TABLE;

  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return responseHandler(400, { message: "Missing menu item id" });
    }

    const body = JSON.parse(event.body || "{}");

    /* tog bort name och category, kommer inte ihåg varför riktigt */
    /* la till marshall som ändrar js-objekt till dynamoDB format */
    // VI SÖKTE EFTER PRODUKTEN MED ID, MEN NAMNET ÄR VÅR PK SÅ SKICKAR MED GAMLA NAMNET NU
    const command = new UpdateItemCommand({
      TableName,
      Key: marshall({
        menuItem: body.oldName,
    }),
      UpdateExpression: `
        SET
            menuItem = :name,
            description = :description,
            ingredients = :ingredients,
            imageUrl = :image,
            price = :price,
            category = :category
      `,
      ExpressionAttributeValues: marshall({
        ":name": body.name || "",
        ":description": body.description || "",
        ":ingredients": body.ingredients || {},
        ":image": body.image || "",
        ":price": body.price || 0,
        ":category": body.category || [],
      }),
      ReturnValues: "ALL_NEW",
    });

    const result = await client.send(command);
    const updatedItem = result.Attributes ? unmarshall(result.Attributes) : null;

    return responseHandler(200, {
      message: "Menu item updated",
      menuItem: updatedItem,
    });
  } catch (error: any) {
    console.log(error);
    return responseHandler(500, { message: error.message });
  }
};