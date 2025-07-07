"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/services/authClient";
import { LoginRequest } from "@/interfaces/LoginRequest";
import { RegisterRequest } from "@/interfaces/RegisterRequest";
import { LoginResponse } from "@/interfaces/LoginResponse";
import { RegisterResponse } from "@/interfaces/RegisterResponse";

interface AuthContextType {
  user: LoginResponse | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const res = await authClient.login(credentials);

      if (!res.success || !res.data) {
        throw new Error(res.message ?? "Credenciales inválidas");
      }

      Cookies.set("token", res.data.token, { expires: 1 });
      Cookies.set("user", JSON.stringify(res.data), { expires: 1 });

      setToken(res.data.token);
      setUser(res.data);

      toast.success(`Bienvenido, ${res.data.firtsName}`);
      router.push("/");
    } catch (error: any) {
      toast.error("Error al iniciar sesión", {
        description: error.message || "Ocurrió un error inesperado",
      });
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const res = (await authClient.register(data)) as {
        success: boolean;
        message?: string;
        data?: RegisterResponse & { token: string };
      };

      if (!res.success || !res.data) {
        throw new Error(res.message ?? "Error al registrarse");
      }

      Cookies.set("token", res.data.token);
      Cookies.set("user", JSON.stringify(res.data));

      setToken(res.data.token);

      //Mapeo de register
      const userToStore: LoginResponse = {
        firtsName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        token: res.data.token,
      };

      Cookies.set("user", JSON.stringify(userToStore), { expires: 1 });
      setUser(userToStore);

      toast.success(`Registro exitoso. Bienvenido, ${res.data.firstName}`);
      router.push("/");
    } catch (error: any) {
      toast.error("Error al registrarse", {
        description: error.message || "Ocurrió un error inesperado",
      });
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    toast.success("Sesión cerrada");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
