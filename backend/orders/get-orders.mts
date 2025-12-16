import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";

export const handler = async (event: any) => {
    const TableName = process.env.ORDERS_TABLE
    try {
        const command = new QueryCommand({
           TableName,
           KeyConditionExpression: "PK = :pk",
           ExpressionAttributeValues: {
            ":pk": { S: "ORDER" }
           },
           ScanIndexForward: false, 
        })

        const data = await client.send(command);

        const orders = (data.Items || []).map((item: any) => ({
            orderId: item.SK?.S,
            status: item.status?.S,
            payment: item.payment?.S,
            totalPrice: item.totalPrice?.S,
            createdAt: item.createdAt?.S,
            modifiedAt: item.modifiedAt?.S,

            user: item.user?.M
                ? {
                    name: item.user.M.name?.S ?? null,
                    phoneNumber: item.user.M.phoneNumber?.S ?? null
                }
                : null,

            cart: item.cart?.L
                ? item.cart.L.map((c: any) => ({
                    menuItem: c.M?.menuItem?.S ?? null,
                    quantity: Number(c.M?.quantity?.N ?? 0),
                    price: Number(c.M?.price?.N ?? 0)
                }))
                : []
        }));

        if(orders.length < 1) return responseHandler(200, {message: "No orders yet"});

        return responseHandler(200, {orders});

    } catch (error: any) {
        return responseHandler(500, {message: error.message})
    }
}