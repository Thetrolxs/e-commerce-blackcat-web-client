'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Necesario para el enlace de registro

// Importaciones de Shadcn UI (asegúrate de que los paths sean correctos según tu configuración)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button'; // Esta ya la tenías correcta

// Asumiendo que estas interfaces y servicios existen en tu proyecto
import { LoginRequest } from '@/interfaces/auth'; // Asegúrate de que esta ruta sea correcta
import { loginUser } from '@/services/authService'; // Asegúrate de que esta ruta sea correcta
import { useAuth } from '@/hooks/useAuth'; // Asegúrate de que esta ruta sea correcta
import { toast } from 'sonner'; // Asegúrate de que 'sonner' esté instalado y configurado

export const LoginForm = () => {
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data);
      toast.success(`Bienvenido, ${res.data.firtsName}`);
    } catch (err: any) {
      toast.error('Credenciales inválidas');
      console.error(err);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-[#D9D9D9] dark:bg-gray-800 shadow-lg rounded-lg">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-black-700 dark:text-gray-200">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              name="email" // Añadir el atributo name es crucial para handleChange
              placeholder="tu@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-black-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              name="password" // Añadir el atributo name es crucial para handleChange
              placeholder="********" // O dejar vacío
              value={form.password}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#404040] hover:bg-[#505050] text-white font-semibold py-2 px-4 rounded-md shadow transition-colors duration-200 dark:bg-[#404040] dark:hover:bg-[#505050]"
          >
            Iniciar Sesión
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-black-600 dark:text-black-300">¿Aún no tienes cuenta? </span>
          <Link href="/registro" className="font-semibold text-gray-800 hover:underline dark:text-gray-100">
            ¡Regístrate!
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};