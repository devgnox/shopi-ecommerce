"use client";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePrefetchProduct } from "../hooks/useProducts";
import { useCartMutations } from "../hooks/useCart";
import { generateOffer, loaderProp } from "../lib/utils";
import { useFavorites } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProductCard = ({ ...props }) => {
  const router = useRouter();
  const { prefetch } = usePrefetchProduct(props.id);
  const { addToCart } = useCartMutations();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const price = props?.price - props?.price * (props?.discountPercentage / 100);

  const productIsFavorite = props && isFavorite(props.id);

  const handleMouseEnter = () => {
    prefetch();
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart.mutate({ product: props });
    toast.success("Se ha añadido producto a carrito", {
      style: { padding: "15px" },
    });
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();

    if (!isAuthenticated) router.push("/auth/login");

    if (productIsFavorite) {
      removeFromFavorites.mutate(props.id);
      toast.success("Se ha removido de favoritos", {
        style: { padding: "15px" },
      });
    } else {
      addToFavorites.mutate(props);
      toast.success("Se ha añadido a favoritos", {
        style: { padding: "15px" },
      });
    }
  };

  return (
    <Link href={"/productos/" + props.id}>
      <div
        key={props.id}
        className="relative shadow-sm h-[350px] sm:h-[430px] overflow-hidden rounded-t-sm pb-1 "
      >
        <Image
          src={props.images[0]}
          className="object-contain h-52 sm:h-72 w-full bg-white rounded-t-sm hover:scale-105 transition duration-300 ease-in-out"
          width={300}
          loading="lazy"
          height={400}
          loader={loaderProp}
          alt={props.title}
        />

        <span className="absolute top-3 left-2 rounded-sm bg-gray-50 text-green-400 shadow-sm border border-gray-200 p-1.5 px-2 font-semibold text-sm">
          {props.discountPercentage.toFixed(0)}% off
        </span>

        <button
          onClick={(e) => handleToggleFavorite(e)}
          className={`absolute top-3 right-2 ml-auto rounded-full group cursor-pointer transition duration-300 ease-in `}
          title="Añadir a Favoritos"
        >
          <Heart
            className={`size-5 text-red-500  group-hover:fill-red-500 transition duration-300 ease-in ${productIsFavorite ? "fill-red-500" : "fill-none"}`}
          />
        </button>

        <div className=" w-full  flex flex-col h-32 p-1 px-2 ">
          <p className="text-gray-500 mt-2 text-xs sm:text-sm capitalize">
            {props.category.split('-').join(" ")}
          </p>
          <h4
            title={props.title}
            className="sm:text-lg text-wrap line-clamp-2 mt-2 w-[98%] overflow-ellipsis font-semibold"
          >
            {props.title}
          </h4>
          <div className="flex items-center gap-1 sm:gap-3 mt-auto">
            <p className="text-base sm:text-lg font-bold ">
              ${price.toFixed(2)}
            </p>

            <p className="text-sm sm:text-base font-semibold text-gray-500 line-through">
              ${props.price.toFixed(2)}
            </p>

            <button
              onClick={(e) => handleAddToCart(e)}
              className="ml-auto rounded-md hover:bg-gray-100 cursor-pointer"
              title="Añadir a carrito"
            >
              <ShoppingBag className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="relative shadow-sm h-[350px] sm:h-[430px] overflow-hidden rounded-t-sm pb-1">
      {/* Image placeholder */}
      <div className="h-52 sm:h-72 w-full bg-gray-200 animate-pulse rounded-t-sm"></div>

      {/* Offer tag placeholder */}
      <div className="absolute top-3 left-2 rounded-sm bg-gray-200 animate-pulse w-16 h-7"></div>

      {/* Favorite button placeholder */}
      <div className="absolute top-3 right-2 rounded-full bg-gray-200 animate-pulse w-5 h-5"></div>

      {/* Content area */}
      <div className="w-full flex flex-col h-32 p-1 px-2">
        {/* Category placeholder */}
        <div className="mt-2 h-3 sm:h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>

        {/* Title placeholder - two lines */}
        <div className="mt-2 h-5 sm:h-6 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="mt-1 h-5 sm:h-6 w-2/3 bg-gray-200 animate-pulse rounded"></div>

        {/* Price and buttons area */}
        <div className="flex items-center gap-1 sm:gap-3 mt-auto">
          {/* Price placeholder */}
          <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 animate-pulse rounded"></div>

          {/* Original price placeholder */}
          <div className="h-4 sm:h-5 w-14 sm:w-16 bg-gray-200 animate-pulse rounded"></div>

          {/* Cart button placeholder */}
          <div className="ml-auto h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
