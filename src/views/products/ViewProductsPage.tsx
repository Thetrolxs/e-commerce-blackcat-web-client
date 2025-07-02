"use client";

import { Product } from "@/interfaces/Product";
import { useProductStore } from "@/stores/ProductStore";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import Navbar from "@/components/layout/navbar";
import { ProductDialog } from "@/components/products/ProductDialog";

export default function ViewProductsPage() {
  const { products, loading, fetchProducts, filters } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Cargando Productos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Línea de título y botón */}
      <div className="w-full bg-white border-b px-6 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold text-gray-800 tracking-tight">
            Catálogo
          </h2>
          <button
            onClick={() => {
              console.log("Filtrar recomendados");
            }}
            className="text-sm sm:text-base text-blue-600 font-semibold hover:underline cursor-pointer transition-colors duration-200 rounded-full px-3 py-1.5 shadow-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Filtros
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {" "}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* ProductDialog con producto seleccionado*/}
      <ProductDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Paginación */}
      <div className="flex justify-center gap-4 mt-12 mb-8">
        <button
          onClick={() => console.log("Anterior")}
          className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded shadow transition duration-200 cursor-pointer"
        >
          Anterior
        </button>
        <button
          onClick={() => console.log("Siguiente")}
          className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded shadow transition duration-200 cursor-pointer"
        >
          Siguiente
        </button>
      </div>

      {/* footer */}
      <footer className="w-full bg-black text-white text-center py-6 mt-10 shadow-lg">
        ©Desarrollador por Ignacio Morales y Alonso Rojas
      </footer>
    </div>
  );
}
