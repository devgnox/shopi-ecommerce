"use client";
import React, { useState } from "react";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  usePrefetchProduct,
  useProduct,
  useRelatedProducts,
} from "../../../../hooks/useProducts";
import { useFavorites } from "../../../../hooks/useUser";
import { useAuth } from "../../../../hooks/useAuth";
import { useCartMutations } from "../../../../hooks/useCart";
import Image from "next/image";
import { generateOffer, loaderProp } from "../../../../lib/utils";
import {
  Facebook,
  HeartIcon,
  Instagram,
  MinusIcon,
  PlusIcon,
  StarIcon,
  Truck,
  Twitter,
} from "lucide-react";
import ProductSuggestions from "../../../../components/ProductSuggestions";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { StarRating } from "../../../../components/UI/StartRating";
import Link from "next/link";
import ReviewCard from "../../../../components/ReviewCard";

const Product = () => {
  const router = useRouter();
  const { id } = useParams();

  if (!id) return notFound();

  const { prefetch } = usePrefetchProduct(id);

  const { data: product, isLoading, error } = useProduct(id);

  if (!isLoading && !product) return notFound();

  const { addToCart, updateCartItem } = useCartMutations();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { data: relatedProducts, isLoading: relatedLoading } =
    useRelatedProducts(product?.category, id);

  // STATE
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const productIsFavorite = product && isFavorite(product.id);

  const price =
    product?.price - product?.price * (product?.discountPercentage / 100);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["blue", "red", "green", "black", "orange"];

  const handleAddToCart = () => {
    addToCart.mutate({ product, quantity, color, size });
    setQuantity(1);
    toast.success("Se ha añadido producto a carrito", {
      style: { padding: "15px" },
    });
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) return router.push("/auth/login");

    if (productIsFavorite) {
      removeFromFavorites.mutate(product.id);
      toast.success("Se ha removido de favoritos", {
        style: { padding: "15px" },
      });
    } else {
      addToFavorites.mutate(product);
      toast.success("Se ha añadido a favoritos", {
        style: { padding: "15px" },
      });
    }
  };

  const handleIncrease = () => {
    setQuantity((prevState) => {
      return quantity + 1;
    });
  };

  const handleDecrease = () => {
    setQuantity((prevState) => {
      if (prevState == 1) return quantity;
      else return quantity - 1;
    });
  };

  const handleSizeChange = (e) => {
    setSize((prevState) => e.target.value);
  };

  const handleColorChange = (e) => {
    setColor((prevState) => {
      if (prevState == e.target.value) return prevState;
      else return e.target.value;
    });
  };

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="w-full max-width mx-auto px-5 xl:px-0">
      <div className="w-full grid grid-cols-2 items-start gap-5 my-8 md:my-16">
        <div className="max-md:col-span-full">
          <Swiper
            style={{
              "--swiper-navigation-color": "#1e2939 ",
              "--swiper-pagination-color": "#1e2939 ",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="max-sm:h-96 max-h-[600px]  aspect-square z-[1]"
          >
            {product?.images.map((img) => (
              <SwiperSlide className="bg-white">
                <Image
                  loading="lazy"
                  src={img || null}
                  width={800}
                  height={900}
                  loader={loaderProp}
                  alt={product?.title}
                  className="h-full object-contain "
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-2 h-32 "
          >
            {product?.images.map((img) => (
              <SwiperSlide className="bg-white">
                <Image
                  loading="lazy"
                  src={img || null}
                  width={800}
                  height={900}
                  loader={loaderProp}
                  alt={product?.title}
                  className="object-contain h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:ml-auto max-md:col-span-full h-full flex flex-col justify-between md:w-[95%] max-md:space-y-3">
          <div className="space-y-3">
            <Link
              href={`/productos?category=${product.category}&page=1`}
              className="capitalize text-gray-500 text-sm font-medium"
            >
              {product?.category.split("-").join(" ")}
            </Link>
            <h1 className="font-monsterrat font-bold text-2xl">
              {product?.title}
            </h1>
            <div className="w-full flex gap-1 items-center">
              {/* {[1, 2, 3, 4, 5].map((item, index) => (
                <StarIcon
                  key={index}
                  className="size-5 text-amber-400 fill-amber-400"
                />
              ))} */}
              <StarRating value={product.rating} />
              <p className="font-semibold text-sm ml-2 text-gray-500">
                {" "}
                {product.rating} ({product.reviews.length} reviews)
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-xl font-semibold">${price?.toFixed(2)}</p>

              <p className="font-semibold text-gray-500 line-through">
                ${product?.price.toFixed(2)}
              </p>

              <span className=" rounded-sm text-green-400 border border-gray-200 p-1 px-2 font-semibold text-sm">
                {product.discountPercentage.toFixed(0)}% off
              </span>
            </div>
          </div>

          {product?.brand && (
            <div className="flex items-center gap-3">
              <p className="font-semibold">Marca: </p>
              <p>{product?.brand}</p>
            </div>
          )}
          <div className="flex mt-3 w-full">
            <p>{product?.description}</p>
          </div>

          <div className="space-y-5 mt-2 md:mt-4">
            <div className="flex items-center gap-3">
              <p className="font-semibold">Color: </p>

              <div className="flex items-center gap-2">
                {colors?.map((c, idx) => (
                  <label
                    key={idx}
                    htmlFor={`color-${c}`}
                    className={twMerge([
                      `block uppercase cursor-pointer rounded-full font-bold p-1 w-8 h-8 text-center border-gray-300 ${color == c ? `ring-2 ring-gray-400 shadow-sm` : " hover:bg-black/10"} transition duration-300 ease-in`,
                    ])}
                    style={{
                      backgroundColor: c,
                      outlineOffset: 8,
                      outlineColor: c,
                    }}
                  >
                    <input
                      type="radio"
                      id={`color-${c}`}
                      value={c}
                      name="color"
                      className="appearance-none"
                      onChange={(e) => handleColorChange(e)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-semibold">Talle: </p>
              <div className="flex items-center gap-2">
                {sizes?.map((s, idx) => (
                  <label
                    key={idx}
                    htmlFor={`size-${s}`}
                    className={`block  uppercase cursor-pointer font-bold p-1 w-10 h-8 text-center border  ${size == s ? "border-blue-400 bg-blue-400 shadow-sm text-white" : "border-gray-600 hover:bg-black/10"} transition duration-300 ease-in`}
                  >
                    <input
                      type="radio"
                      id={`size-${s}`}
                      name="size"
                      value={s}
                      className="appearance-none"
                      onChange={(e) => handleSizeChange(e)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="flex items-center gap-2 font-semibold ">
              <Truck className="size-5 " /> Envio
              <span className=" font-normal">
                {product.shippingInformation}
              </span>
            </p>
            <p className="font-semibold">
              Disponible:{" "}
              <span className="font-normal">{product.stock}</span>{" "}
            </p>
          </div>

          <div className="w-full flex items-center gap-4 max-sm:flex-col ">
            <div className="flex h-10 items-center max-sm:w-full ">
              <button
                onClick={() => handleDecrease()}
                title="descrease quantity"
                className="p-1 h-full rounded-r-none rounded-sm border border-r-0 border-gray-300  transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer"
              >
                <MinusIcon className="size-5" />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                max={10}
                onChange={(e) => setQuantity(e.target.value)}
                name="quantity"
                className="font-bold  text-center p-2 max-sm:w-full h-full border border-gray-300"
              />

              <button
                onClick={() => handleIncrease()}
                title="descrease quantity"
                className="h-full p-1 rounded-l-none rounded-sm border border-l-0 border-gray-300  transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer"
              >
                <PlusIcon className="size-5" />
              </button>
            </div>

            <div className="flex max-sm:w-full items-center gap-2">
              <button
                onClick={() => handleAddToCart()}
                className="w-full bg-gray-800 p-2 text-white font-semibold cursor-pointer shadow-sm hover:opacity-90 transition duration-300 ease-in rounded-sm"
              >
                Agregar a Carrito
              </button>

              <button
                onClick={handleToggleFavorite}
                className="group p-2 h-full rounded-sm border border-gray-300  transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer group:hover:text-red-400"
              >
                <HeartIcon
                  className={`size-6 text-red-500 fill-none group-hover:fill-red-500 transition duration-300 ease-in ${productIsFavorite ? "fill-red-500" : "fill-none"}`}
                />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">{product.returnPolicy}</p>
          <div className=" space-y-2">
            <p className="font-semibold">
              Garantia:{" "}
              <span className="font-normal">{product.warrantyInformation}</span>
            </p>
            <p className="font-semibold">
              SKU: <span className="font-normal">{product.sku}</span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              Tags:{" "}
              {product?.tags.map((tag) => (
                <span key={tag} className="font-normal capitalize">
                  {tag}
                </span>
              ))}
            </p>
            <div className=" flex items-center space-x-1 ">
              <p className="font-semibold ">Compartir: </p>
              <button
                onClick={() => {}}
                className="cursor-pointer hover:opacity-95 transition duration-300 ease-in"
              >
                <Facebook className="size-6 text-blue-500" />
              </button>
              <button
                onClick={() => {}}
                className="cursor-pointer hover:opacity-95 transition duration-300 ease-in"
              >
                <Instagram className="size-6 text-blue-500" />
              </button>
              <button
                onClick={() => {}}
                className="cursor-pointer hover:opacity-95 transition duration-300 ease-in"
              >
                <Twitter className="size-6 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-8 my-24 border-b border-b-gray-300">
        <div className="space-y-5  pb-8 mb-8">
          <h3 className="font-bold text-xl sm:text-2xl text-center ">
            Detalles de Producto
          </h3>
          <div className="flex flex-col mt-16 sm:flex-row w-full items-start sm:h-68 gap-5">
            <div className="sm:w-2/3">
              <p className="">{product?.description}</p>

              <div className="mt-6 space-y-5">
                <h3 className="font-bold text-lg">Opiniones del Producto</h3>
                <Swiper
                  spaceBetween={30}
                  pagination={{
                    type: "bullets",
                    clickable: true,
                    dynamicBullets:true, bulletActiveClass:'bg-[#1e2939]'
                  }}
                  modules={[Pagination]}
                  style={{
                    "--swiper-navigation-color": "#1e2939 ",
                    "--swiper-pagination-color": "#1e2939 ",
                  }}
                  className=""
                >
                  {product.reviews.map((rev) => (
                    <SwiperSlide key={rev.reviewerName+rev.date} className="">
                      <ReviewCard {...rev} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="h-auto">
              <Image
                src={product.images[0]}
                width={800}
                height={800}
                alt={product.title}
                loader={loaderProp}
                className="object-contain h-74 aspect-square bg-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-16">
        {!relatedLoading && relatedProducts?.length > 0 && (
          <ProductSuggestions
            title="Productos relacionados"
            loading={relatedLoading}
            products={relatedProducts}
          />
        )}
      </div>
    </div>
  );
};

const ProductPageSkeleton = () => {
  return (
    <div className="w-full max-width mx-auto px-5 xl:px-0">
      <div className="w-full grid grid-cols-2 items-start gap-5 my-8 md:my-16">
        {/* Product Images Skeleton */}
        <div className="max-md:col-span-full">
          {/* Main Image Skeleton */}
          <div className="max-sm:h-96 max-h-[600px] aspect-square bg-gray-200 animate-pulse rounded"></div>

          {/* Thumbnails Skeleton */}
          <div className="mt-2 h-32 flex gap-2">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex-1 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="md:ml-auto max-md:col-span-full h-full flex flex-col justify-between md:w-[95%] max-md:space-y-3">
          {/* Category */}
          <div className="space-y-3">
            <div className="w-1/4 h-4 bg-gray-200 animate-pulse rounded"></div>

            {/* Title */}
            <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded"></div>

            {/* Rating */}
            <div className="w-full flex gap-1 items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className="w-5 h-5 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
              <div className="w-24 h-4 ml-2 bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Price */}
            <div className="flex gap-4">
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>

          {/* Description */}
          <div className="flex mt-3 w-full">
            <div className="w-full h-16 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Colors and Sizes */}
          <div className="space-y-5 mt-2 md:mt-4">
            {/* Colors */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-5 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"
                  ></div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-5 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="w-10 h-8 bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart and Quantity */}
          <div className="w-full flex items-center mt-8 gap-4 max-sm:flex-col">
            <div className="h-10 w-32 max-sm:w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="flex-1 h-10 max-sm:w-full bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Additional Info */}
          <div className="mt-5 space-y-2">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="w-3/4 h-5 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full mt-16 mb-8">
        <div className="space-y-4 border-b border-b-gray-300 pb-8 mb-8">
          <div className="w-64 mx-auto h-8 bg-gray-200 animate-pulse rounded"></div>

          <div className="flex flex-col sm:flex-row w-full items-start sm:h-68 gap-5">
            <div className="sm:w-2/3 h-40 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full sm:w-1/3 h-40 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="my-8">
        <div className="w-64 mx-auto h-8 bg-gray-200 animate-pulse rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="h-64 bg-gray-200 animate-pulse rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
