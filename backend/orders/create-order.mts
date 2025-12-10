import { client } from "../services/db.mjs";
import { PutItemCommand, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { responseHandler } from "../services/response-handler.mjs";
import { v4 as uuid } from "uuid";

export interface CartItemBackend {
    menuItem: string,
    price: number,
    quantity: number
}

export interface UserInfo {
    name: string,
    phoneNumber: string
}

export interface OrderBody {
    // orderId: string;
    user: UserInfo;
    cart: CartItemBackend[];
    totalPrice: number;
    payment: "online" | "in-house";
    // status: "pending" | "completed" | "active" | "canceled";
    // createdAt: string;
    // modifiedAt: string;
}

export const handler = async (event: any) => {
    try {
        if(!event.body) return responseHandler(404, { error: "body missing"});

        const TableName = process.env.ORDERS_TABLE;
        const body: OrderBody = JSON.parse(event.body);

        console.log("Event body:", event.body);


        const createdAt = new Date().toISOString();
        const orderId = uuid();
        console.log(JSON.stringify(body, null, 2));


        // for (const cartItem of body.cart) {
        //     const menuItemResp = await client.send(new GetItemCommand({
        //         TableName: "menu",
        //         Key: { PK: { S: cartItem.menuItem } }
        //     }));

        //     if (!menuItemResp.Item) {
        //         return responseHandler(404, { error: `MenuItem ${cartItem.menuItem} not found` });
        //     }

        //     const ingredients = menuItemResp.Item.ingredients?.M ?? {};

        //     for (const [ingredient, value] of Object.entries(ingredients)) {
        //         const amountNeeded = Number(value.N) * cartItem.quantity;

        //         await client.send(new UpdateItemCommand({
        //             TableName: "stock",
        //             Key: { PK: { S: ingredient } },
        //             UpdateExpression: "SET quantity = quantity - :used",
        //             ConditionExpression: "quantity >= :used",
        //             ExpressionAttributeValues: { ":used": { N: String(amountNeeded) } }
        //         }));
        //     }
        // }

        const command = new PutItemCommand({
            TableName,
            Item: {
            PK: { S: "ORDER" },
            SK: { S: orderId },
            cart: {
                L: body.cart.map((item: CartItemBackend) => ({
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
        })

        const order = await client.send(command)

        return responseHandler(200, {
            message: "Order created",
            order
        })

    } catch (error: any) {
        console.error(error);
        return responseHandler(500, { message: error.message, stack: error.stack });
    }
}