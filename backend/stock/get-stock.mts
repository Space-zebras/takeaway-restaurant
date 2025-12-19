import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { apiKeyMiddleware } from "../middleware/api-key.mjs";

interface StockItem {
  stockItem: string;
  quantity: number;
}

export const stock = async (): Promise<any> => {
  const TableName = "stock";

  try {
    const data = await client.send(new ScanCommand({ TableName }));

    const stock: StockItem[] = (data.Items || []).map((it: any) => ({
      stockItem: it.stockItem?.S || "",
      quantity: it.quantity?.N ? Number(it.quantity.N) : 0,
    }));

    return responseHandler(200, {
      stock,
      itemsCount: stock.length,
    });
  } catch (err: any) {
    console.error("getStock error:", err);
    return responseHandler(500, { message: "Internal Server Error" });
  }
};

export const handler = middy(stock)
  .use(apiKeyMiddleware())
  .use(httpErrorHandler());