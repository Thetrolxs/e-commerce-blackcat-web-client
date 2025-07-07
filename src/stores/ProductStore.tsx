import { create } from "zustand";
import { Product } from "@/interfaces/Product";
import { ProductFilters, ProductServices } from "@/services/ProductServices";

// Opcional: estructura para paginación si la API la entrega
interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
  totalPages?: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;

  filters: ProductFilters;
  pagination: Pagination;

  availableFilters: Record<string, any>; // ajusta si tienes tipos
  setAvailableFilters: (filters: Record<string, any>) => void;

  fetchProducts: () => Promise<void>;

  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  setProducts: (products: Product[], pagination?: Pagination) => void;
  updateFilters: (filters: Partial<ProductFilters>) => void;
  setPage: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;

  initializeFromUrl: (filters: Partial<ProductFilters>) => void;
}

export const useProductStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  filters: { pageNumber: 1, pageSize: 10 },
  pagination: { pageNumber: 1, pageSize: 10 },

  availableFilters: {},
  setAvailableFilters: (filters) => set(() => ({ availableFilters: filters })),

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const data = await ProductServices.fetchProducts(filters);
      console.log("Productos obtenidos:", data);

      // Si usas paginación, sepárala
      set({
        products: data,
        loading: false,
        error: null,
        pagination: {
          pageNumber: filters.pageNumber || 1,
          pageSize: filters.pageSize || 10,
          // puedes calcular totalCount y totalPages si la API lo entrega
        },
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.message || "Error al obtener los productos",
      });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set(() => ({
      filters: {
        pageNumber: 1,
        pageSize: 10,
      },
    })),

  setPage: (pageNumber) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pageNumber: pageNumber,
      },
    })),

  setPageSize: (pageSize) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pageSize: pageSize,
      },
    })),

  setProducts: (products, pagination) =>
    set((state) => ({
      products,
      pagination: pagination || state.pagination,
    })),

  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  initializeFromUrl: (urlFilters) =>
    set(() => ({
      filters: {
        pageNumber: 1,
        pageSize: 10,
        ...urlFilters,
      },
    })),
}));
