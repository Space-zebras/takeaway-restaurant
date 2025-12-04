import { client } from "../services/db.mjs";
import { PutItemCommand, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import { v4 as uuid } from "uuid";
export const handler = async (event) => {
    try {
        if (!event.body)
            return responseHandler(404, { error: "body missing" });
        const body = JSON.parse(event.body);
        const createdAt = new Date().toISOString();
        const orderId = uuid();
        for (const cartItem of body.cart) {
            const menuItemResp = await client.send(new GetItemCommand({
                TableName: "menu",
                Key: { PK: { S: cartItem.menuItem } }
            }));
            if (!menuItemResp.Item) {
                return responseHandler(404, { error: `MenuItem ${cartItem.menuItem} not found` });
            }
            const ingredients = menuItemResp.Item.ingredients?.M ?? {};
            for (const [ingredient, value] of Object.entries(ingredients)) {
                const amountNeeded = Number(value.N) * cartItem.quantity;
                await client.send(new UpdateItemCommand({
                    TableName: "stock",
                    Key: { PK: { S: ingredient } },
                    UpdateExpression: "SET quantity = quantity - :used",
                    ConditionExpression: "quantity >= :used",
                    ExpressionAttributeValues: { ":used": { N: String(amountNeeded) } }
                }));
            }
        }
        const command = new PutItemCommand({
            TableName: "orders",
            Item: {
                PK: { S: "ORDER" },
                SK: { S: orderId },
                cart: {
                    L: body.cart.map((item) => ({
                        M: {
                            menuItem: { S: item.menuItem },
                            quantity: { N: String(item.quantity) },
                            price: { N: String(item.price) }
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
                status: { S: "pending" },
                createdAt: { S: createdAt },
                modifiedAt: { S: createdAt }
            }
        });
        const order = await client.send(command);
        return responseHandler(200, {
            message: "Order created",
            orderId
        });
    }
    catch (error) {
        return responseHandler(500, { message: "Internal Server Error" });
    }
};
