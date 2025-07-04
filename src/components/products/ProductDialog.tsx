import { Product } from "@/interfaces/Product";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDialog = ({
  product,
  open,
  onClose,
}: ProductDialogProps) => {
  if (!product) return null;

  const imageUrl =
    Array.isArray(product.urls) && product.urls.length > 0
      ? product.urls[0]
      : "/Producto.png";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Detalle del Producto</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Image
            src={imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain mb-4"
            priority
          />
          <p className="text-blue-700 font-bold text-2xl mt-4">
            {product.price.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-gray-600 mt-2">
            {product.description ?? "Sin descripción"}{" "}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
