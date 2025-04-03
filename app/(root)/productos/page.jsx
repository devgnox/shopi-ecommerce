"use client";

import React, { useEffect, useState } from "react";
import ProductCard, {
  ProductCardSkeleton,
} from "../../../components/ProductCard";
import { useSearchParams } from "next/navigation";
import { useProducts } from "../../../hooks/useProducts";
import CategoryFilters, {
  FiltersBar,
} from "../../../components/CategoryFilters";
import Pagination from "../../../components/Pagination";
import SectionHeader from "../../../components/UI/SectionHeader";

const Products = () => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "all";

  const { data, isLoading, error, isPreviousData } = useProducts(
    page,
    category
  );

  return (
    <div className="w-full scroll-smooth">
      <SectionHeader
        title={"Descubre tu nuevo Estilo"}
        alt="image clothing rack"
        image={"/images/clothes-rack.jpg"}
      />
      <div className="px-5 xl:px-0 max-width mx-auto w-full flex flex-col md:flex-row items-start gap-3 justify-between my-8 md:my-16">
        <div className="md:w-2/8 ">
          <CategoryFilters />
        </div>
        <div className="w-full md:w-6/8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 h-auto">
          <div className="col-span-full h-auto mb-5">
            <small className="font-semibold">
              Mostrando {page} de {data?.totalPages} páginas
            </small>
            <FiltersBar />
          </div>

          {isLoading
            ? [1, 2, 3, 4, 5, 6, 8, 10, 11].map((item) => (
                <ProductCardSkeleton key={item} />
              ))
            : data?.products?.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}

          {data?.products.length === 0 && (
            <div className="text-center py-8">
              No se encontraron productos en esta categoría.
            </div>
          )}

          {data?.totalPages > 1 && (
            <div className="col-span-full flex items-center justify-center mt-8">
              <Pagination currentPage={page} totalPages={data.totalPages} />
            </div>
          )}

          {isPreviousData && (
            <div className="text-center mt-4 text-gray-500">
              Cargando más productos...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
