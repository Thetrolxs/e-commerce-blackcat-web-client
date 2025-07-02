import { Product} from "@/interfaces/Product";
import { ProductFilters } from "@/services/ProductServices";
import { ProductServices } from "@/services/ProductServices";
import { create } from "zustand";

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    fetchProducts: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
    
}
export const useProductStore = create<ProductsState>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    filters: { PageNumber: 1, PageSize: 10 }, 
    
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try{
            const { filters } = get();
            const data = await ProductServices.fetchProducts(filters);
            console.log("Productos obtenidos:", data);

            set({ products: data, loading: false, error: null });

        }catch (error: any) {
            set({loading: false, error: error.message || "Error al obtener los productos" });
        }
    },
    setFilters: (newFilters) =>
         set((state) => ({
            filters: {...state.filters, ...newFilters },
        })),
    
}));