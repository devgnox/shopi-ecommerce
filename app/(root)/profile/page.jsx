"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useFavorites, useOrders } from "../../../hooks/useUser";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import ProductCard, {
  ProductCardSkeleton,
} from "../../../components/ProductCard";
import DataTable from "../../../components/UI/DataTable";
import OrdersTable from "../../../components/OrdersTable";
import SectionHeader from "../../../components/UI/SectionHeader";

const Profile = () => {
  const {
    favorites,
    isLoading: isLoadingFavorities,
    removeFromFavorites,
  } = useFavorites();
  const {
    orders,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useOrders();

  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabHashes = ["orders", "favorites"];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    
    const index = tabHashes.indexOf(hash);
    
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    return router.push("/");
  };

   const handleTabChange = (index) => {
    setSelectedIndex(index);
    
    if (index < tabHashes.length) {
      window.history.pushState(null, "", `#${tabHashes[index]}`);
    }
  };

  return (
    <div className="w-full">
      <SectionHeader
        title={"Mi cuenta"}
        image={"/images/rack-chlothes.jpg"}
        imageClass=" bg-center w-full"
        bgColor="bg-white"
        alt="rack de ropa"
      />

      <div className="px-5 xl:p-0 max-width my-16 mx-auto flex items-start justify-between">
        <TabGroup className="w-full flex gap-10 flex-col sm:flex-row"  selectedIndex={selectedIndex} 
          onChange={handleTabChange}>
          <TabList className="flex sm:flex-col gap-3 sm:w-52">
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={twMerge(
                    "p-2 max-sm:text-sm border shadow-sm border-gray-800/20 rounded-sm cursor-pointer ",
                    hover && " bg-gray-800/15",
                    selected && "bg-gray-800 text-white "
                  )}
                >
                  Mis Ordenes
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={twMerge(
                    "p-2 max-sm:text-sm  border shadow-sm border-gray-800/20 rounded-sm cursor-pointer ",
                    hover && "bg-gray-800/15 ",
                    selected && "bg-gray-800  text-white "
                  )}
                >
                  Mis Favoritos
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  onClick={handleLogout}
                  className={twMerge(
                    "p-2 max-sm:text-sm  border shadow-sm border-gray-800/20 rounded-sm cursor-pointer ",
                    hover && "bg-gray-800/15 ",
                    selected && "bg-gray-800  text-white "
                  )}
                >
                  Cerrar sesión
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels className="min-h-[300px] w-full">
            <TabPanel>
              <div className="">
                <h3 className="font-bold text-lg sm:text-2xl text-gray-800">Ordenes</h3>
                <OrdersTable
                  orders={orders}
                  isLoading={isLoadingOrders}
                  error={ordersError}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="">
                <h3 className="font-bold text-lg sm:text-2xl text-gray-800">
                  Productos Guardados
                </h3>
                <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-5">
                  {isLoadingFavorities
                    ? [1, 2, 3, 4, 5, 6, 8, 10, 11].map((item) => (
                        <ProductCardSkeleton key={item} />
                      ))
                    : favorites?.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                  {favorites?.length == 0 && (
                    <div className="mt-8 col-span-full text-center">
                      No tienes Productos en Favoritos
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Profile;
