import { client } from "../services/db.mjs";
import { UpdateItemCommand, AttributeValue } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { apiKeyMiddleware } from "../middleware/api-key.mjs";

export const updateMenu = async (event: any) => {
  const TableName = process.env.MENU_TABLE;
  const id = event.pathParameters?.id;

  if (!id) {
    return responseHandler(400, { message: "Missing menuItem id" });
  }

  const body = JSON.parse(event.body || "{}");
  const parts: string[] = [];
  const values: Record<string, AttributeValue> = {};

  if (body.description) {
    parts.push("description = :description");
    values[":description"] = { S: body.description };
  }

  if (body.ingredients && Object.keys(body.ingredients).length > 0) {
    const map: Record<string, AttributeValue> = Object.fromEntries(
      Object.entries(body.ingredients).map(([k, v]) => [k, { S: String(v) }])
    );
    parts.push("ingredients = :ingredients");
    values[":ingredients"] = { M: map };
  }

  if (body.price !== undefined) {
    parts.push("price = :price");
    values[":price"] = { N: String(body.price) };
  }

  if (body.category && body.category.length > 0) {
    parts.push("category = :category");
    values[":category"] = { SS: body.category };
  }

  if (parts.length === 0) {
    return responseHandler(400, { message: "No fields to update" });
  }

  const command = new UpdateItemCommand({
    TableName,
    Key: {
      menuItem: { S: body.name },
    },
    UpdateExpression: "SET " + parts.join(", "),
    ExpressionAttributeValues: values,
    ReturnValues: "ALL_NEW",
  });

  try {
    const result = await client.send(command);
    const attr = result.Attributes;

    const updatedItem = attr
      ? {
        id: attr.id?.S,
        name: attr.menuItem?.S || "",
        description: attr.description?.S || "",
        ingredients: attr.ingredients?.M || {},
        price: attr.price ? Number(attr.price.N) : 0,
        category: attr.category?.SS || [],
        image: attr.imageUrl?.S || "",
      }
      : null;

    return responseHandler(200, {
      message: "Menu item updated",
      menuItem: updatedItem,
    });
  } catch (err: any) {
    console.error("updateMenu error:", err);
    return responseHandler(500, { message: err.message });
  }
};

export const handler = middy(updateMenu)
  .use(apiKeyMiddleware())
  .use(httpErrorHandler());