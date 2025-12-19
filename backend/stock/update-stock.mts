import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { apiKeyMiddleware } from "../middleware/api-key.mjs";

interface StockUpdate {
  name: string;
  quantity: number;
}

export const updateStock = async (event: any) => {
  try {
    if (!event.body) {
      return responseHandler(400, { message: "Missing body" });
    }

    const updates: StockUpdate[] = JSON.parse(event.body);

    for (const update of updates) {
      const TableName = "stock";

      await client.send(
        new PutItemCommand({
          TableName,
          Item: {
            stockItem: { S: update.name },
            quantity: { N: update.quantity.toString() },
          },
        })
      );
    }

    return responseHandler(200, { message: "Stock updated successfully", updates });
  } catch (error: any) {
    console.error("updateStock error:", error);
    return responseHandler(500, { message: error.message });
  }
};

export const handler = middy(updateStock)
  .use(apiKeyMiddleware())
  .use(httpErrorHandler());