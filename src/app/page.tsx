"use client";
import ViewProductPage from "@/views/products/ViewProductsPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading content...</div>}>
      <ViewProductPage />
    </Suspense>
  );
}
