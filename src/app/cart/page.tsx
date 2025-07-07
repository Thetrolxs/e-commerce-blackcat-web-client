"use client";

import { useCart } from "@/contexts/cartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CarritoPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (
    itemId: number,
    currentQty: number,
    stock?: number
  ) => {
    if (stock && currentQty >= stock) {
      toast.error("No hay más stock disponible", {
        position: "top-right",
      });
      return;
    }
    increaseQuantity(itemId);
  };

  return (
    <main className="p-6 flex flex-col md:flex-row gap-8">
      {/* Lista de productos */}
      <section className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold">Carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Tu carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-100 rounded shadow"
            >
              <Image
                src={item.urls?.[0] || "/blackcat-logo.png"}
                alt={item.name}
                width={64}
                height={64}
                className="rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600 mb-2">
                  ${item.price.toLocaleString()} CLP
                </p>

                {/* Selector de cantidad */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id!)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrease(item.id!, item.quantity, item.stock)
                    }
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id!)}
                className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </section>

      {/* Resumen de compra */}
      <aside className="w-full md:w-80 bg-gray-100 p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Resumen compra</h3>
        <div className="flex justify-between mb-2">
          <span>Productos</span>
          <span>{cart.length}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total</span>
          <span>${total.toLocaleString()} CLP</span>
        </div>
        <button
          className="w-full bg-gray-700 hover:bg-black text-white py-2 rounded"
          disabled={cart.length === 0}
        >
          Pagar
        </button>
      </aside>
    </main>
  );
}
