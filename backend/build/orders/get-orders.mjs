import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";
export const handler = async (event) => {
    try {
        const command = new QueryCommand({
            TableName: "orders",
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": { S: "ORDER" }
            },
            ScanIndexForward: false,
        });
        const data = await client.send(command);
        const orders = (data.Items || []).map((item) => ({
            orderId: item.orderId?.S,
            status: item.status?.S,
            payment: item.payment?.S,
            totalPrice: item.totalPrice?.S,
            createdAt: item.createdAt?.S,
            modifiedAt: item.SK?.S,
            user: {
                name: item.user.M.name.S,
                phoneNumber: item.user.M.phoneNumber.S
            },
            cart: item.cart.L?.map((c) => ({
                menuItem: c.M.menuItem.S,
                qquantity: Number(c.M.quantity.N),
                price: Number(c.M.price.N)
            }))
        }));
        return responseHandler(200, { orders });
    }
    catch (error) {
        return responseHandler(500, { message: error.message });
    }
};
