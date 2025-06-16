import axios from 'axios';
import { LoginRequest, LoginResponse } from '@/interfaces/auth';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>('/Auth/login', data)
  return response.data;
};
