"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-600">
        404 - Página no encontrada
      </h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Lo sentimos, la página que estás buscando no existe.
      </p>
    </div>
  );
}
