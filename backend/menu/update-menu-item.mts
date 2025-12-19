import { client } from "../services/db.mjs";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { apiKeyMiddleware } from "../middleware/api-key.mjs";

export const updateMenu = async (event: any) => {
  const TableName = process.env.MENU_TABLE;

  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return responseHandler(400, { message: "Missing menu item id" });
    }

    const body = JSON.parse(event.body || "{}");

    const command = new UpdateItemCommand({
      TableName,
      Key: marshall({
        menuItem: body.name,
    }),
      UpdateExpression: `
        SET
            description = :description,
            ingredients = :ingredients,
            imageUrl = :image,
            price = :price,
            category = :category
      `,
      ExpressionAttributeValues: marshall({
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

export const handler = middy(updateMenu)
  .use(apiKeyMiddleware())
  .use(httpErrorHandler());