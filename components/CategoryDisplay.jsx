import React from "react";
import CategoryDisplayCard from "./CategoryDisplayCard";
import Link from "next/link";

const CategoryDisplay = () => {
  const categories = [
    {
      id: 1,
      title: "men's clothing",
      image: "/images/men-fashion.jpg",
      url: `?category=mens-shirts&page=1`,
    },
    {
      id: 2,
      title: "women's clothing",
      image: "/images/women-fashion.jpg",
      url: `?category=womens-dresses&page=1`,
    },
    {
      id: 3,
      title: "Accessories",
      image: "/images/jewelery.jpg",
      url: `?category=sunglasses&page=1`,
    },
    {
      id: 4,
      title: "electronics",
      image: "/images/electronics.jpg",
      url: `?category=mobile-accessories&page=1`,
    },
  ];

  return (
    <div className="bg-gray-700 py-16 w-full my-8 sm:my-16 space-y-6">
      <div className="px-5 xl:px-0 max-width mx-auto flex gap-2 items-center justify-between">
        <h2 className="text-lg sm:text-2xl text-white font-semibold font-montserrat uppercase">
          Explora Nuestras Categorias
        </h2>
        <Link
          href="/productos"
          className="font-semibold text-white text-xs max-sm:w-16 sm:text-sm uppercase"
        >
          Ver Más
        </Link>
      </div>
      <div className="px-5 xl:px-0  max-width mx-auto grid grid-cols-1 md:grid-cols-2 space-y-2 md:flex-row gap-2">
        {categories.map((cat) => (
          <CategoryDisplayCard
            key={cat.id}
            title={cat.title}
            backgroundClasses={"bg-[#fff67e] "}
            link={cat.url}
            image={cat.image}
            textPosition={"left"}
            imagePosition={"right"}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
