import jwt from "jsonwebtoken";

export const verifyAdmin = () => {
  return {
    before: async (request) => {
      const { event } = request;
      const cookieHeader = event.headers?.Cookie || event.headers?.cookie;

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

      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        event.admin = payload;
      } catch (err) {
        console.error("JWT verification failed:", err);
        throw new Error("Unauthorized: Invalid token");
      }
    }
  };
};