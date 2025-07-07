"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-black text-white px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md transition-transform duration-300 "
      id="navbar"
    >
      {/* Logo */}
      <div
      title="Ir al catálogo"
      onClick={() => (window.location.href = "/")}
      className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
    >
      <Image
        src="/blackcat-logo.png"
        alt="BLACKCAT"
        width={48}
        height={48}
        className="h-12 w-12"
      />
      <span className="text-xl font-bold hidden sm:inline">BLACKCAT</span>
    </div>

      

      {/* Buscador */}
      <div className="flex-1 flex justify-center w-full sm:w-auto">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="px-5 py-3 rounded bg-white text-black w-full max-w-xs sm:max-w-sm md:max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Íconos */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          title="Cuenta"
          onClick={() => (window.location.href = "/login")}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <Image
            src="/icono-user.png"
            alt="Usuario"
            width={48}
            height={48}
            className="h-10 w-10"
          />
        </button>
        <button
          title="Carrito"
          onClick={() => (window.location.href = "/cart")}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <Image
            src="/icono-carro.png"
            alt="Carrito"
            width={48}
            height={48}
            className="h-10 w-10"
          />
        </button>
      </div>
    </header>
  );
}
