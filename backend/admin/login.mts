import bcrypt from "bcryptjs";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { SignJWT } from "jose";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

import { client as db } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";

type LoginBody = {
  adminId: string;
  password: string;
};

export const loginHandler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const body = event.body as unknown as LoginBody;

  if (!body?.adminId || !body?.password) {
    return responseHandler(400, { message: "Missing adminId or password" });
  }

  const { adminId, password } = body;

  const tableName = process.env.ADMIN_TABLE;
  const jwtSecret = process.env.JWT_SECRET;

  if (!tableName || !jwtSecret) {
    return responseHandler(500);
  }

  const getRes = await db.send(
    new GetItemCommand({
      TableName: tableName,
      Key: {
        PK: { S: "ADMIN#root" },
      },
    })
  );

  if (!getRes.Item) {
    return responseHandler(401);
  }

  const storedId = getRes.Item.adminId?.S;
  const storedHash = getRes.Item.passwordHash?.S;

  if (!storedId || !storedHash) {
    return responseHandler(500);
  }

  if (adminId !== storedId) {
    return responseHandler(401);
  }

  const isValidPassword = await bcrypt.compare(password, storedHash);

  if (!isValidPassword) {
    return responseHandler(401);
  }

  const token = await new SignJWT({ adminId, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(jwtSecret));

  const cookie = [
    `token=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
  ].join("; ");

  /* lägg till secure i prod sen typ kanske ev */

  return responseHandler(
    200,
    { message: "Login successful" },
    {
      "Set-Cookie": cookie,
    }
  );
};

export const handler = middy(loginHandler)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
