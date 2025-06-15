export default function Navbar() {
  return (
    <header className="w-full bg-black text-white px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <img src="/logo-gato.png" alt="BLACKCAT" className="h-12 w-12" />
        <span className="text-xl font-bold tracking-wide">BLACKCAT</span>
      </div>

      {/* Buscador */}
      <div className="flex-1 flex justify-center w-full sm:w-auto">
        <input type="text" placeholder="Buscar productos..." className="px-5 py-3 rounded bg-white text-black w-full max-w-xs sm:max-w-sm md:max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Íconos */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button title="Cuenta" onClick={() => (window.location.href = "/cuenta")} className="cursor-pointer hover:scale-105 transition-transform">
          <img src="/icono-user.png" alt="Usuario" className="h-10 w-10" />
        </button>
        <button title="Carrito" onClick={() => (window.location.href = "/carrito")} className="cursor-pointer hover:scale-105 transition-transform">
          <img src="/icono-carro.png" alt="Carrito" className="h-10 w-10" />
        </button>
      </div>
    </header>
  );
}
