import { client } from "../services/db.mjs";
import { responseHandler } from "../services/response-handler.mjs";
import { UpdateItemCommand, UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";

interface UpdateOrderStatusBody {
    status: "PENDING" | "PREPARING" | "COMPLETE" | "CANCELLED"
}

export const handler = async (event: any) => {
    const TableName = process.env.ORDERS_TABLE;
    try {
        const orderId = event.pathParameters?.orderId;
        
        if(!orderId) return responseHandler(400, {error: "OrderId missing"});
        if(!event.body) return responseHandler(400, {error: "Body missing"});
        
        const body = JSON.parse(event.body) as UpdateOrderStatusBody;

        const validStatuses = ["PENDING", "PREPARING", "COMPLETE", "CANCELLED"] as const;

        if(!validStatuses.includes(body.status)) {
            return responseHandler(400, {
                error: `Invalid status. Allowed: ${validStatuses.join(", ")}`
            })
        }

        const date = new Date().toISOString();

        const command = new UpdateItemCommand({
            TableName,
            Key: {
                PK: {S: "ORDER"},
                SK: {S: orderId}
            },
            UpdateExpression: "SET #status = :status, #modifiedAt = :modifiedAt",
            ExpressionAttributeNames: {
                "#status": "status",
                "#modifiedAt": "modifiedAt"
            },
            ExpressionAttributeValues: {
                ":status": {S: body.status},
                ":modifiedAt": {S: date}
            },
            ReturnValues: "ALL_NEW"
        });

        const result: UpdateItemCommandOutput = await client.send(command);

     if (!result.Attributes) {
      return responseHandler(404, { error: "Order not found" });
    }

    const updatedOrder = {
      orderId: result.Attributes.SK?.S ?? "",
      status: result.Attributes.status?.S ?? "",
      payment: result.Attributes.payment?.S ?? "",
      totalPrice: Number(result.Attributes.totalPrice?.N ?? 0),
      createdAt: result.Attributes.createdAt?.S ?? "",
      modifiedAt: result.Attributes.modifiedAt?.S ?? date,
      user: {
        name: result.Attributes.user?.M?.name?.S ?? "",
        phoneNumber: result.Attributes.user?.M?.phoneNumber?.S ?? "",
      },
      cart:
        result.Attributes.cart?.L?.map((c) => ({
          menuItem: c.M?.menuItem?.S ?? "",
          quantity: Number(c.M?.quantity?.N ?? 0),
          price: Number(c.M?.price?.N ?? 0),
        })) ?? [],
    };

    return responseHandler(200, {
      message: "Order status updated",
      order: updatedOrder,
    });       
       
    } catch (error: any) {
        console.log(error);
        return responseHandler(500, {message: error.message})
    }
}