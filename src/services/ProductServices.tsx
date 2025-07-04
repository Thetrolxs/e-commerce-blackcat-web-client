import { ApiBackend } from "@/services/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters {
  pageNumber: number;
  pageSize: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
  condition?: number;
}

export const ProductServices = {
  async fetchProducts(filters: ProductFilters) {
    const { data } = await ApiBackend.get<ResponseAPI<Product[]>>("/Product", {
      params: filters,
    });
    console.log("Datos obtenidos:", data);
    if (!data.success) {
      throw new Error(data.message || "Error al obtener los productos");
    }
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("No se encontraron productos");
    }
    if (data.error) {
      console.error("Error:", data.error);
    }
    return data.data as Product[];
  },
};
