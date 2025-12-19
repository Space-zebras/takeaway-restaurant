import { client } from "../services/db.mjs";
import { PutItemCommand, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import { v4 as uuid } from "uuid";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { apiKeyMiddleware } from "../middleware/api-key.mjs";

export interface CartItem {
    menuItem: string,
    price: number,
    quantity: number
}

export interface UserInfo {
    name: string,
    phoneNumber: string
}

export interface OrderBody {
    user: UserInfo;
    cart: CartItem[];
    totalPrice: number;
    payment: "online" | "in-house";
}

export const createOrder = async (event: any) => {
    try {
        if(!event.body) return responseHandler(404, { error: "body missing"});

        const TableName = process.env.ORDERS_TABLE;
        const body: OrderBody = JSON.parse(event.body);

        console.log("Event body:", event.body);


        const createdAt = new Date().toISOString();
        const orderId = uuid().split("-")[0];
        console.log(JSON.stringify(body, null, 2));

        const command = new PutItemCommand({
            TableName,
            Item: {
            PK: { S: "ORDER" },
            SK: { S: orderId },
            cart: {
                L: body.cart.map((item: CartItem) => ({
                    M: {
                        menuItem: { S: item.menuItem},
                        quantity: { N: String(item.quantity) },
                        price: {N: String(item.price)}
                    }
                }))
            },
            totalPrice: { N: String(body.totalPrice) },
            user: {
                M: {
                    name: { S: body.user.name },
                    phoneNumber: { S: body.user.phoneNumber }
                }
            },
            payment: { S: body.payment },
            status: { S: "PENDING" },
            createdAt: { S: createdAt },
            modifiedAt: { S: createdAt }

            }
        });

        const orderData = {
            PK: "ORDER",
            SK: orderId,
            cart: body.cart,
            totalPrice: body.totalPrice,
            user: body.user,
            payment: body.payment,
            status: "PENDING",
            createdAt,
            modifiedAt: createdAt
        };

        const order = await client.send(command)

        return responseHandler(200, {
            message: "Order created",
            orderId,
            order: orderData
        })

    } catch (error: any) {
        console.error(error);
        return responseHandler(500, { message: error.message });
    }
}

export const handler = middy(createOrder)
  .use(apiKeyMiddleware())
  .use(httpErrorHandler());