import { MiddlewareObj } from "@middy/core";
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const apiKeyMiddleware = (): MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyResultV2> => ({
  before: async (request) => {
    const headers = request.event.headers || {};
    const apiKey = headers["x-api-key"] || headers["X-API-Key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {

      throw {
        statusCode: 401,
        message: "Invalid API key",
      };
    }
  },
});
