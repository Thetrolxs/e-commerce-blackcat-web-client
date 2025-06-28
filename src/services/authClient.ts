import { ApiBackend } from "./axios";
import { LoginRequest } from "@/interfaces/LoginRequest";
import { LoginResponse } from "@/interfaces/LoginResponse";
import { RegisterRequest } from "@/interfaces/RegisterRequest";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const authClient = {
  login: async (
    credentials: LoginRequest
  ): Promise<ResponseAPI<LoginResponse>> => {
    const response = await ApiBackend.post("/auth/login", credentials);
    return response.data;
  },

  register: async (
    data: RegisterRequest
  ): Promise<ResponseAPI<LoginResponse>> => {
    const response = await ApiBackend.post("/auth/register", data);
    return response.data;
  },
};
