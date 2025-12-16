import { client } from "../services/db.mjs";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import { marshall } from "@aws-sdk/util-dynamodb";

export const handler = async (event: any) => {
  const TableName = process.env.MENU_TABLE;

  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return responseHandler(400, { message: "Missing menu item id" });
    }

    const body = JSON.parse(event.body || "{}");

    const command = new UpdateItemCommand({
      TableName,
      Key: {
        id: { S: id },
      },
      UpdateExpression: `
        SET
          menuItem = :name,
          category = :category,
          description = :description,
          ingredients = :ingredients,
          imageUrl = :image,
          price = :price
      `,
      ExpressionAttributeValues: {
        ":name": { S: body.name || "" },
        ":category": { SS: body.category || [] },
        ":description": { S: body.description || "" },
        ":ingredients": { M: marshall(body.ingredients || {}) },
        ":image": { S: body.image || "" },
        ":price": { N: String(body.price || 0) },
      },
      ReturnValues: "ALL_NEW",
    });

    const result = await client.send(command);

    return responseHandler(200, {
      message: "Menu item updated",
      item: result.Attributes,
    });
  } catch (error: any) {
    console.log(error);
    return responseHandler(500, { message: error.message });
  }
};