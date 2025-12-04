import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";
export const handler = async (event) => {
    // const TableName = process.env.ORDER_TABLE
    try {
        const orderId = event.pathParameters?.id;
        if (!orderId) {
            return responseHandler(400, { error: "OrderId missing" });
        }
        const command = new GetItemCommand({
            TableName: "orders",
            Key: {
                orderId: { S: orderId }
            },
        });
        const result = await client.send(command);
        if (!result.Item)
            return responseHandler(404, { error: "Order not found" });
        const order = {
            orderId: result.Item.SK?.S,
            status: result.Item.status?.S,
            payment: result.Item.payment?.S,
            totalPrice: Number(result.Item.totalPrice?.N),
            createdAt: result.Item.createdAt?.S,
            modifiedAt: result.Item.modifiedAt?.S,
            user: {
                name: result.Item.user?.M?.name?.S,
                phoneNumber: result.Item.user?.M?.phoneNumber?.S
            },
            cart: result.Item.cart.L?.map((c) => ({
                menuItem: c.M.menuItem.S,
                qquantity: Number(c.M.quantity.N),
                price: Number(c.M.price.N)
            }))
        };
        return responseHandler(200, { order });
    }
    catch (error) {
        return responseHandler(500, { message: error.message });
    }
};
