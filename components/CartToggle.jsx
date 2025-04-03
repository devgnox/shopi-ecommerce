"use client";
import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCart, useCartContext } from "../hooks/useCart";

const CartToggle = () => {
  const { data: cart, isLoading} = useCart();
  const { isCartOpen, toggleCart, data } = useCartContext();

  return (
    <button
      onClick={()=>toggleCart()}
      className={`relative rounded-full w-8 h-8 p-1 flex items-center justify-center transition duration-300 ease-in cursor-pointer hover:bg-gray-100`}
    >
      <ShoppingBag
        className={ "size-5 text-slate-800 "
        }
      />
      {data?.cartItems > 0 ? (
        <div className="z-10 absolute -bottom-1 -right-1 rounded-full min-w-4 h-4 flex items-center justify-center bg-blue-600 overflow-hidden">
          <span className="text-[10px] text-white p-0.5 transition duration-300 ease-in">
            {data?.cartItems}
          </span>
        </div>
      ) : null}
    </button>
  );
};

export default CartToggle;
