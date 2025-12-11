require("dotenv").config();
const jwt = require("jsonwebtoken");
const { send } = require("../responseHandler");

module.exports.login = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const { adminId, password } = body;

    const validId = process.env.ADMIN_ID;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!adminId || !password) {
      return send(400, { message: "Missing adminId or password" });
    }

    if (adminId !== validId || password !== validPassword) {
      return send(401);
    }

    const token = jwt.sign(
      { adminId, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return send(200, { token });

  } catch (err) {
    console.error("Login error:", err);
    return send(500);
  }
};