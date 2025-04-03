"use client";
import { Minus, Plus, TrashIcon, X, XCircleIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCart, useCartContext, useCartMutations } from "../hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import { Transition, TransitionChild } from "@headlessui/react";
import { loaderProp } from "../lib/utils";
import { useOrders } from "../hooks/useUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Modal from "./UI/Modal";

const Cart = ({}) => {
  const router = useRouter();
  const { data: cart, isLoading } = useCart();
  const { updateCartItem, removeFromCart, clearCart } = useCartMutations();
  const { isCartOpen, toggleCart, data } = useCartContext();
  const { isAuthenticated, isLoading: isLoadingAuth } = useAuth();

  const {
    isLoading: isLoadingOrders,
    createOrder,
    error: errorOrder,
  } = useOrders();

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && isCartOpen) {
        toggleCart();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  const handleQuantityIncrement = (productId, quantity) => {
    updateCartItem.mutate({
      productId: productId,
      quantity: quantity + 1,
    });
  };

  const handleQuantityDecrement = (productId, quantity) => {
    updateCartItem.mutate({
      productId: productId,
      quantity: quantity - 1,
    });
  };

  const handleBuy = () => {    
    if (!isLoadingAuth) {
      if (!isLoadingAuth && !isAuthenticated) {
        router.push("/auth/login");
        toggleCart();
      } else {
        createOrder.mutate(
          {},
          {
            onSuccess: () => {
              toggleCart();
              toast.success("Compra exitosa", {
                style: { padding: "15px" },
              });
              setTimeout(() => {
                router.push("/profile#orders");
              }, 1500);
            },
            onError: (err) => {
              toast.error("Algo salió mal, intenta de nuevo", {
                style: { padding: "15px" },
              });
            },
          }
        );
      }
    }
  };

  return (
    <>
      <Transition show={isCartOpen} appear={true}>
        <TransitionChild
          enter="transition-opacity ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="transition-opacity ease-in-out duration-500"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div
            aria-hidden="true"
            className={`fixed inset-0 bg-black/50 z-10 `}
            onClick={toggleCart}
          />
        </TransitionChild>
        <TransitionChild
          enter="transform transition-transform ease-in-out duration-500"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition-transform ease-in-out duration-500 "
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`fixed z-50 top-0 right-0 h-full sm:w-[400px] w-full sm:max-w-[80vw] bg-white shadow-lg`}
          >
            {/* Contenido del carrito */}
            <div className="p-4 h-full flex flex-col sm:w-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tu Carrito</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCart();
                  }}
                  className="p-1 hover:bg-black/5 cursor-pointer"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto mt-3">
                {data?.products?.length > 0 ? (
                  <ul className="space-y-2">
                    {data.products.map((product) => (
                      <li
                        key={product.id + "-" + product.variant}
                        className="flex p-1 pr-3 h-20 items-start gap-2 bg-white border-b border-b-black/20 pb-2 hover:bg-black/2 transition duration-300 ease-in-out"
                      >
                        <Link
                          href={`/productos/${product.id}`}
                          className="w-16 h-16 rounded-sm flex-shrink-0 bg-white"
                        >
                          <Image
                            src={product.thumbnail}
                            width={300}
                            height={300}
                            loader={loaderProp}
                            alt={product.title}
                            className="aspect-square object-contain "
                          />
                        </Link>
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <div className="flex items-start justify-between gap-1">
                            <div className="">
                              <Link
                                href={`/productos/${product.id}`}
                                className="font-semibold font-montserrat text-sm line-clamp-1 text-ellipsis"
                              >
                                {product.title}
                              </Link>
                              <p className="text-sm text-gray-600">
                                Talle: {product.size} | Color: {product.color}
                              </p>
                            </div>

                            <button
                              title="Eliminar del carrito"
                              onClick={() => removeFromCart.mutate(product.id)}
                              className="p-0.5 rounded-sm h-fit transition duration-300 ease-in hover:bg-gray-300/50 cursor-pointer"
                            >
                              <TrashIcon className="size-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2 items-center">
                              <p className="text-sm text-gray-500">
                                Cantidad: {product.quantity}
                              </p>
                              <button
                                onClick={() =>
                                  handleQuantityDecrement(
                                    product.id,
                                    product.quantity
                                  )
                                }
                                className="p-0.5 rounded-sm h-fit border border-gray-300  transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer"
                              >
                                <Minus className="size-3" />
                              </button>
                              <button
                                onClick={() =>
                                  handleQuantityIncrement(
                                    product.id,
                                    product.quantity
                                  )
                                }
                                className="p-0.5 rounded-sm h-fit border border-gray-300  transition duration-300 ease-in hover:bg-gray-300/50  cursor-pointer"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <p className=" font-semibold">
                              ${product.price * product.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center font-montserrat py-8 text-gray-500">
                    Tu carrito está vacío
                  </div>
                )}
              </div>

              {data?.products?.length > 0 && (
                <div className=" pt-4 mt-auto space-y-2 ">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal:</span>
                    <span>${data?.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold ">
                    <span>Impuestos:</span>
                    <span>${data?.taxes?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${(data?.total + data?.taxes).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => handleBuy()}
                    className="w-full bg-gray-800 hover:bg-gray-800/80 text-white py-2 rounded-sm transition cursor-pointer"
                  >
                    Comprar
                  </button>
                </div>
              )}
            </div>
          </div>
        </TransitionChild>
      </Transition>
    </>
  );
};

export default Cart;
