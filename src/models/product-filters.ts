import { z } from "zod";

export const productFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  orderBy: z.string().optional(),
  condition: z.coerce.number().optional(),
  pageNumber: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
});

export type ProductFiltersForm = z.infer<typeof productFiltersSchema>;

export interface ProductParamsRequest {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
  condition?: number;
  PageNumber?: number;
  PageSize?: number;
}
