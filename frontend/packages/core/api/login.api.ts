import { adminHttp } from "./adminhttp.ts";

export interface AdminLoginRequest {
  adminId: string;
  password: string;
}

export interface AdminLoginResponse {
  successful: boolean;
  message: string;
}

export const loginAdmin = async (adminId: string, password: string) => {
  try {
    const response = await adminHttp<AdminLoginResponse>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ adminId, password }),
    });

    console.log("Login successful:", response);
    return response;
  } catch {
    console.log("Login failed");
  }
}