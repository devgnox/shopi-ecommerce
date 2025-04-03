import { ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import Loader from "./Loader";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";

const SwiperNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute z-5 top-1/2 w-full flex justify-between  transform -translate-y-1/2">
      <button
        onClick={() => swiper.slidePrev()}
        className="p-1 rounded-sm  border border-gray-300 bg-white transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="p-1 rounded-sm  border border-gray-300 bg-white transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const ProductSuggestions = ({
  id,
  title,
  products,
  loading,
  totalPages = null,
  containerClassName = "",
  currentPage = null,
}) => {
  return (
    <div
      id={id}
      className={twMerge(["relative space-y-6", containerClassName])}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-2xl font-semibold font-montserrat">
          {title}
        </h2>
      </div>
      
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20
            }
          }}
          modules={[Navigation]}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
          className="relative"
        >
          {products?.length > 5 && <SwiperNavigation />}
          {loading
            ? [1, 2, 3, 4, 5, 6, 8].map((item) => (
              <SwiperSlide key={item+'-placeholder'}> <ProductCardSkeleton  />  </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className="" >
                  <ProductCard  {...product} />
                </SwiperSlide>
              ))}
        </Swiper>
    
    </div>
  );
};

export default ProductSuggestions;
