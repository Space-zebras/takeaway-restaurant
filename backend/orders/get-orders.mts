import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../services/db.mts";
import { responseHandler } from "../services/response-handler.mts";

export const handler = async () => {
    // const TableName = process.env.ORDER_TABLE;
    try {
        const command = new QueryCommand({
           TableName: "orders",
           IndexName: "",
           KeyConditionExpression: "orderKey = :ok",
           ExpressionAttributeValues: {
            ":ok": { S: "ORDER" }
           },
           ScanIndexForward: false, 
        })
        //"orderKey = :ok AND begins_with(statusSort, :st)", ":st": { S: "pending#" }

        const data = await client.send(new QueryCommand(command));

        const orders = (data.Items || []).map((item) => ({
            orderId: item.orderId,
            status: item.status,
            payment: item.payment,
            totalPrice: item.totalPrice,
            createdAt: item.createdAt,
            modifiedAt: item.modifiedAt,
            user: item.user,
            cart: item.cart

        }))

        return responseHandler(200, {orders});

    } catch (error: any) {
        return responseHandler(500, {message: error.message})
    }
}