import { jwtVerify, JWTPayload } from "jose";
import type { MiddlewareObj } from "@middy/core";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

export interface AdminJwtPayload extends JWTPayload {
    adminId: string;
    role: string;
}

export interface AuthenticatedEvent extends APIGatewayProxyEventV2 {
    admin?: AdminJwtPayload;
}

export const verifyAdmin = (): MiddlewareObj<AuthenticatedEvent> => {
    return {
        before: async (request) => {
            const event = request.event;

            const cookieHeader =
                event.headers?.cookie || event.headers?.Cookie;

            if (!cookieHeader) {
                throw new Error("Unauthorized: Missing cookie header");
            }

            const token = cookieHeader
                .split(";")
                .map((c) => c.trim())
                .find((c) => c.startsWith("token="))
                ?.split("=")[1];

            if (!token) {
                throw new Error("Unauthorized: Missing auth token");
            }

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("Server misconfiguration");
            }

            try {
                const { payload } = await jwtVerify(
                    token,
                    new TextEncoder().encode(jwtSecret)
                );

                event.admin = payload as AdminJwtPayload;
            } catch (err) {
                console.error("JWT verification failed:", err);
                throw new Error("Unauthorized: Invalid token");
            }
        },
    };
};