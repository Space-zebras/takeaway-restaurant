import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";

export const handler = async (event: any) => {
    // const TableName = process.env.ORDER_TABLE
    try {
        const orderId = event.pathParameters?.id;

        if(!orderId) {
            return responseHandler(400, {error: "OrderId missing"})
        }

        const command = new GetItemCommand({
            TableName: "orders",
            Key: {
                orderId: { S: orderId }
            },
        });

        const result = await client.send(command);

        if(!result.Item) return responseHandler(404, {error: "Order not found"});

        const order = {
            orderId: result.Item.orderId,
            status: result.Item.status,
            payment: result.Item.payment,
            totalPrice: result.Item.totalPrice,
            createdAt: result.Item.createdAt,
            modifiedAt: result.Item.modifiedAt,
            user: result.Item.user,
            cart: result.Item.cart
        }

        return responseHandler(200, {order})

    } catch (error: any) {
        return responseHandler(500, {message: error.message})
    }
}