"use client";

import { useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  convertParamsToForm,
  convertFormToParams,
  convertParamsToUrl,
  convertUrlToParams,
} from "@/utils/url";
import {
  ProductFiltersForm,
  productFiltersSchema,
  ProductParamsRequest,
} from "@/models/product-filters";
import { ProductServices } from "@/services/ProductServices";
import { useProductStore } from "@/stores/ProductStore";

export const useProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  const {
    products,
    pagination,
    availableFilters,
    filters,
    setProducts,
    setAvailableFilters,
    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
    initializeFromUrl,
  } = useProductStore();

  // Paso 1: inicializar valores desde URL o estado actual
  const initialValues = convertParamsToForm(
    Object.keys(convertUrlToParams(searchParams)).length > 0
      ? { ...filters, ...convertUrlToParams(searchParams) }
      : filters
  );

  if (initialValues.condition === undefined) {
    initialValues.condition = 0;
  }

  // Paso 2: preparar formulario
  const form = useForm<ProductFiltersForm>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: initialValues,
  });

  // Paso 3: inicializar estado global desde URL (sólo 1 vez)
  useEffect(() => {
    if (!isInitialized.current) {
      const urlFilters = convertUrlToParams(searchParams);
      if (Object.keys(urlFilters).length > 0) {
        initializeFromUrl(urlFilters);
      }
      isInitialized.current = true;
    }
  }, [searchParams, initializeFromUrl]);

  // Paso 4: actualizar URL cada vez que los filtros cambien
  const updateUrl = useCallback(
    (filters: ProductParamsRequest) => {
      const params = convertParamsToUrl(filters);
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (isInitialized.current) {
      updateUrl(filters);
    }
  }, [filters, updateUrl]);

  // Paso 5: obtener productos desde la API
  const fetchProducts = useCallback(async () => {
    try {
      const data = await ProductServices.fetchProducts(filters);
      setProducts(data); // si usas paginación, separa data y pagination
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }, [filters, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Paso 6: manejar envío del formulario
  const handleSubmit = useCallback(
    (data: ProductFiltersForm) => {
      const apiFilters = convertFormToParams(data);
      updateFilters(apiFilters);
    },
    [updateFilters]
  );

  const handleClear = useCallback(() => {
    const defaultValues = convertParamsToForm({
      pageNumber: 1,
      pageSize: 12,
      orderBy: undefined,
      search: undefined,
      brands: undefined,
      categories: undefined,
      condition: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });

    defaultValues.condition = 0;

    form.reset(defaultValues);
    clearFilters();
  }, [clearFilters, form]);

  const handleSearchSubmit = useCallback(() => {
    const currentData = form.getValues();
    handleSubmit(currentData);
  }, [form, handleSubmit]);

  return {
    products,
    pagination,
    availableFilters,
    form,
    isLoading: false, // puedes agregar estado de carga si lo manejas tú
    isError: false, // igual para errores
    error: null,

    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
    onSubmit: form.handleSubmit(handleSubmit),
    onSearchSubmit: handleSearchSubmit,
    onClear: handleClear,

    refetch: fetchProducts,
  };
};
