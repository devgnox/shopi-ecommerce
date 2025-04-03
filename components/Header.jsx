"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import CartToggle from "./CartToggle";
import { usePathname } from "next/navigation";
import { HomeIcon, StoreIcon, UserIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const Header = () => {
  const routePath = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const activeLinkClass = "text-blue-600";

  const handleGoToProfile = () => {
    if (isAuthenticated) return router.push("/profile");
    else return router.push("/auth/login");
  };

  return (
    <>
      <header className="w-screen overflow-x-hidden bg-primary-blue p-4 border-b  border-b-gray-200">
        <nav className="max-width mx-auto justify-between flex">
          <div className="w-1/3">
            <Link href="/" className="font-semibold text-3xl">
              Shopi{" "}
            </Link>
          </div>
          <ul className="w-1/3 list-none font-semibold items-center gap-8 justify-center hidden md:flex">
            <Link
              href="/"
              className={`transition duration-300 ease-in ${routePath == "/" ? activeLinkClass : "text"}`}
            >
              {" "}
              Home
            </Link>
            <Link
              href="/productos"
              className={`transition duration-300 ease-in ${routePath == "/productos" ? activeLinkClass : "text"}`}
            >
              Catalogo
            </Link>
          </ul>

          <div className="flex gap-3 items-center w-1/3 justify-end">
            <CartToggle />
            <button
              onClick={() => handleGoToProfile()}
              className={`${routePath == "/profile" ? activeLinkClass : "text"} flex items-center justify-center px-2  font-semibold transition duration-300 ease-in max-md:hidden cursor-pointer`}
            >
              {isAuthenticated ? "Mi Cuenta" : "Iniciar / Registro"}
            </button>
          </div>
        </nav>

        {/* mobile bottom navigation */}
        <nav className=" z-10 fixed bottom-0 bg-white left-0 right-0 shadow-md w-full block justify-between md:hidden background border-t border-t-gray-200 ">
          <ul className="list-none flex justify-between items-center h-14 w-screen">
            <Link
              href="/"
              className="w-1/3 flex flex-col items-center justify-center"
            >
              <HomeIcon
                className={`size-5  ${routePath == "/" ? activeLinkClass : "text"}`}
              />
              <p className="text-sm font-semibold text">Home</p>
            </Link>
            <Link
              href="/productos"
              className="w-1/3 flex flex-col items-center justify-center"
            >
              <StoreIcon
                className={`size-5  ${routePath == "/productos" ? activeLinkClass : "text"}`}
              />
              <p className="text-sm font-semibold text">Catalogo</p>
            </Link>

            <button
              onClick={() => handleGoToProfile()}
              className="w-1/3 flex flex-col items-center cursor-pointer justify-center"
            >
              <UserIcon
                className={`size-5  ${routePath == "/profile" ? activeLinkClass : "text"}`}
              />
              <p className="text-sm font-semibold text">
                {isAuthenticated ? "Mi Cuenta" : "Iniciar / Registro"}
              </p>
            </button>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
