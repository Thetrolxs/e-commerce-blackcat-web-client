import { Product } from "@/interfaces/Product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow p-4 w-full flex flex-col items-center text-sm min-h-[100px] hover:shadow-lg transition">
      {/* Imagen */}
      <div
        className="cursor-pointer w-full aspect-square bg-white rounded mb-3 flex items-center justify-center overflow-hidden"
        onClick={onClick}
      >
        <Image
          src="/Producto.png"
          alt={product.name}
          width={400}
          height={400}
          className="object-contain max-h-full "
          priority
        />
      </div>

      {/* Título y precio */}
      <div className="text-center mb-1">
        <h3 className="font-medium leading-snug text-center text-lg mb-1 cursor-pointer">
          {product.name}
        </h3>
        <p className=" text-blue-800 font-semibold text-lg mb-1">
          {product.price.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
        </p>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <button className="cursor-pointer bg-gray-600 text-white px-2 py-0.5 rounded-full hover:bg-gray-800 transition">
          -
        </button>
        <span className="bg-white px-3 py-1 rounded border select-none">1</span>
        <button className="cursor-pointer bg-gray-600 text-white px-2 py-1 rounded-full hover:bg-gray-800 transition">
          +
        </button>
      </div>

      {/* Botón Agregar */}
      <button className="cursor-pointer mt-3 bg-black text-white text-sm px-6 py-2 rounded-full hover:bg-gray-800 transition">
        Agregar
      </button>
    </div>
  );
};
