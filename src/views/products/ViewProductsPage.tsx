"use client";

import { Product } from "@/interfaces/Product";
import { useProductStore } from "@/stores/ProductStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDialog } from "@/components/products/ProductDialog";
import { ProductFiltersDrawer } from "@/components/products/ProductFiltersDrawer";

export default function ViewProductsPage() {
  const { products, loading, fetchProducts, error } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      error?.includes("Error al obtener los productos") ||
      error?.includes("No se encontraron productos")
    ) {
      router.push("/");
    }
  }, [error, router]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Cargando Productos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Línea de título y botón */}
      <div className="w-full bg-white border-b px-6 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold text-gray-800 tracking-tight">
            Catálogo
          </h2>
          <ProductFiltersDrawer />
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
