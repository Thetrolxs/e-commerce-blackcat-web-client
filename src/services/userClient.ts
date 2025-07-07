import { ApiBackend } from "./axios";
import { ProfileResponse } from "@/interfaces/ProfileResponse";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { ProfileRequest } from "@/interfaces/ProfileRequest";

export const userClient = {
  getProfile: async (): Promise<ResponseAPI<ProfileResponse>> => {
    const res = await ApiBackend.get("/user/profile");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },

  updateProfile: async (
    data: ProfileRequest
  ): Promise<ResponseAPI<ProfileResponse>> => {
    const res = await ApiBackend.patch("/user/profile", data);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },
};
