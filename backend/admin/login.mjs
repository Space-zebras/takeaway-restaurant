import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";

import { responseHandler } from "../build/services/response-handler.mjs";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client as db } from "../build/services/db.mjs";

export const loginHandler = async (event) => {
  const { adminId, password } = event.body;

  if (!adminId || !password) {
    return responseHandler(400, { message: "Missing adminId or password" });
  }

  const getRes = await db.send(
    new GetItemCommand({
      TableName: process.env.ADMIN_TABLE,
      Key: {
        PK: { S: "ADMIN#root" }
      }
    })
  );

  if (!getRes.Item) {
    console.error("No admin found in table!");
    return responseHandler(500, { message: "Admin not found" });
  }

  const storedId = getRes.Item.adminId.S;
  const storedHash = getRes.Item.passwordHash.S;

  if (adminId !== storedId) {
    return responseHandler(401);
  }

  const isValidPassword = await bcrypt.compare(password, storedHash);

  if (!isValidPassword) {
    return responseHandler(401);
  }

  const token = jwt.sign(
    { adminId, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const isProd = process.env.NODE_ENV === "production";
  const isHttps = event.headers?.["x-forwarded-proto"] === "https";
  const secureFlag = (isProd || isHttps) ? "; Secure" : "";

  const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${secureFlag}`;

  /* Secure; läggs till vid produktion tyyyp*/

  return responseHandler(
    200,
    { message: "Login successful" },
    { "Set-Cookie": cookie }
  );
};

export const handler = middy(loginHandler)
  .use(jsonBodyParser())
  .use(httpErrorHandler());