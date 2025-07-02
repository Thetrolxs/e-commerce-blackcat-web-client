"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginRequest } from "@/interfaces/LoginRequest";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuthContext } from "@/contexts/authContext";

export const LoginForm = () => {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuthContext();

  const onSubmit = async (data: LoginRequest) => {
    await login(data);
  };

  return (
    <Card className="w-full max-w-md p-6 bg-[#D9D9D9] dark:bg-gray-800 shadow-lg rounded-lg">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Iniciar sesión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#404040] hover:bg-[#505050] text-white"
            >
              Iniciar Sesión
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <span className="text-black-600 dark:text-black-300">
            ¿Aún no tienes cuenta?{" "}
          </span>
          <Link
            href="/register"
            className="font-semibold text-gray-800 hover:underline dark:text-gray-100"
          >
            ¡Regístrate!
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
