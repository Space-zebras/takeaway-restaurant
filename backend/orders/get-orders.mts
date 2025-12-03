import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";

export const handler = async (event: any) => {
    try {
        const command = new QueryCommand({
           TableName: "orders",
           IndexName: "",
           KeyConditionExpression: "PK = :pk",
           ExpressionAttributeValues: {
            ":pk": { S: "ORDER" }
           },
           ScanIndexForward: false, 
        })

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
            cart: item.cart

        }))

        return responseHandler(200, {orders});

    } catch (error: any) {
        return responseHandler(500, {message: error.message})
    }
}