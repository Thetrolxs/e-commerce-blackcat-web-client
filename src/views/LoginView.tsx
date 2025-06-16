// app/login/page.tsx
import Image from 'next/image';
import { LoginForm } from '@/components/shared/LoginForm'; // Asegúrate de que esta ruta sea correcta
import { ShoppingCart, User } from 'lucide-react'; // Iconos para la cabecera (asegúrate de tener lucide-react instalado)
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* Cabecera */}
      <header className="flex items-center justify-between p-4 bg-black text-white dark:bg-gray-950 dark:text-gray-50 shadow-md">
        <div className="flex items-center gap-2">
          {/* Si tienes un logo, puedes usar Next/Image */}
          <Image src="/blackcat-logo.png" alt="Blackcat Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-2xl font-bold">BLACKCAT</span>
        </div>
        <div className="relative flex-1 max-w-xs mx-4">
          {/* Este Input también debe ser de Shadcn UI */}
          <Input
            type="search"
            placeholder="Buscar productos"
            className="w-full rounded-md bg-white border-none text-black placeholder-white-400 focus:ring-blue-500 focus:border-white-500 dark:bg-white dark:placeholder-gray-400 dark:text-black"
          />
        </div>
        <div className="flex items-center gap-4">
          <User className="h-6 w-6 cursor-pointer hover:text-gray-300" />
          <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-gray-300" />
        </div>
      </header>

      {/* Contenido principal - Login Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </main>

      {/* Pie de página */}
      <footer className="p-4 bg-black text-white text-center text-sm dark:bg-gray-950 dark:text-gray-50">
        ©Desarrollador por Ignacio Morales y Alonso Rojas
      </footer>
    </div>
  );
}