import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export const ProductServices = {
  async fetchProducts(filters: ProductFilters){

    const {data} = await ApiBackend.get<ResponseAPI>("/Product", {
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
  }
}