import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { responseHandler } from "../build/services/response-handler.mjs";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client as db } from "../build/services/db.mjs";


export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const { adminId, password } = body;

    if (!adminId || !password) {
      return responseHandler(400, { message: "Missing adminId or password" });
    }

    const getRes = await db.responseHandler(
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

    return responseHandler(200, { token });

  } catch (err) {
    console.error("Login error:", err);
    return responseHandler(500);
  }
};
