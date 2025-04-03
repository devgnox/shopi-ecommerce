"use client";
import React, { useState } from "react";
import { useCategories } from "../hooks/useProducts";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryFilters = () => {
  const { data, isLoading, error } = useCategories();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentPage = searchParams.get("page") || "1";

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold uppercase flex justify-between items-center text-gray-800">
        Filtros
      </h3>

      <div className="mt-4 space-y-4">
        <div className="space-y-2 ">
          <h4 className="font-semibold text-gray-800 ">
            Categorias
          </h4>
          <ul className="list-none ml-1 flex flex-wrap gap-2 md:flex-col">
            {data?.categories?.map((category) => (
              <li key={category.slug} className="cursor-pointer">
                <button
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`capitalize cursor-pointer hover:opacity-95 transition duration-300 ease-in ${currentCategory == category ? "text-primary-blue font-semibold" : "text"}`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const FiltersBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "all";

  const removeCategoryFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.replace(`${pathname}`, { scroll: false });
  };

  return (
    (currentCategory !== "all") && (
      <div className="w-full flex gap-2 mt-2">
        {currentCategory !== "all" && (
          <button
            onClick={removeCategoryFilter}
            className="capitalize bg-gray-800 p-1 px-2 text-sm text-white font-semibold cursor-pointer"
          >
            {currentCategory.replace('-', " ")}
          </button>
        )}

        <button
          onClick={resetFilters}
          className="bg-gray-800 p-1 px-2 text-sm text-white font-semibold cursor-pointer"
        >
          Limpiar filtro
        </button>
      </div>
    )
  );
};

export default CategoryFilters;
