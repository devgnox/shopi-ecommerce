import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import DataTable from "./UI/DataTable";
import Modal from "./UI/Modal";
import Image from "next/image";
import Link from "next/link";
import { loaderProp } from "../lib/utils";
import { Eye } from "lucide-react";

const OrdersTable = ({ orders, isLoading, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("orderNumber", {
        header: "Order Number",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString("es-ES", {
            dateStyle: "medium",
          }),
      }),
      columnHelper.accessor("totalAmount", {
        header: "Total Amount",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor("deliveredDate", {
        header: "Delivery Date",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString("es-ES", {
                dateStyle: "medium",
              })
            : "Not delivered",
            meta: {
              className: "hidden md:table-cell",
            },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs uppercase font-medium ${
              info.getValue() === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : info.getValue() === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
        meta: {
          className: "hidden md:table-cell",
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            onClick={() => {
              setCurrentOrder(info.row.original);
              setIsModalOpen(true);
            }}
            className="bg-gray-800 max-sm:text-sm py-2  hover:bg-gray-800/70 text-white sm:py-1 px-3 rounded text-sm cursor-pointer"
          >
            <Eye className="size-4 sm:hidden"/>
            <p className="max-sm:hidden">View Details</p>
            
          </button>
        ),
      }),
    ],
    []
  );

  return (
    <div className="mt-5">
      <DataTable
        data={orders}
        columns={columns}
        pageSize={10}
        isLoading={isLoading}
        error={error}
        emptyMessage="Aun No tienes ordenes"
        theadClassName={(header) => header.column.columnDef.meta?.className || ""}
        tdClassName={(cell) => cell.column.columnDef.meta?.className || ""}
      />

      {isModalOpen && currentOrder && (
        <Modal
          setIsOpen={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          title={"Detalle de Orden"}
        >
          <div className="flex gap-1 flex-col mt-5">
            <div className="flex gap-2 py-1 items-center border-b border-gray-800/20">
              <p className="font-semibold">Orden:</p>
              <p className="">#{currentOrder.orderNumber}</p>
              <p className="text-gray-500 text-sm">
                {new Date(currentOrder.date).toLocaleDateString("es-ES", {
                  dateStyle: "medium",
                })}
              </p>
            </div>

            <div className="flex gap-3 border-b border-gray-800/20">
              <div className="flex gap-2 py-1 items-center ">
                <p className="font-semibold">Total:</p>
                <p className="">${currentOrder.totalAmount.toFixed(2)}</p>
              </div>

              <div className="flex gap-2  py-1 items-center">
                <p className="font-semibold">Subtotal:</p>
                <p className="">${currentOrder.subtotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-2 py-1 items-center ">
              <p className="font-semibold">Estado:</p>
              <span
                className={`px-2 py-1 rounded-full text-xs uppercase font-medium ${
                  currentOrder.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : currentOrder.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {currentOrder.status}
              </span>
            </div>

            {currentOrder.deliveredDate && (
              <div className="flex gap-2 py-1 items-center border-b border-gray-800/20">
                <p className="font-semibold">Entregado: </p>
                <p className="">
                  {new Date(currentOrder.deliveredDate).toLocaleDateString(
                    "es-ES",
                    {
                      dateStyle: "medium",
                    }
                  )}
                </p>
              </div>
            )}

            <div className="mt-2 ">
              <p className="text-sm font-semibold">Produtos</p>

              <ul className="h-52 overflow-y-scroll">
                {currentOrder.products.map((product) => (
                  <li
                    key={product.id + "-" + product.variant}
                    className="flex p-1 pr-3  items-start gap-2 border-b border-b-black/20 pb-2 hover:bg-black/2 transition duration-300 ease-in-out"
                  >
                    <Link
                      href={`/productos/${product.id}`}
                      className="w-12 h-12 bg-white rounded-sm flex-shrink-0"
                    >
                      <Image
                        src={product.thumbnail}
                        width={300}
                        height={300}
                        loader={loaderProp}
                        alt={product.title}
                        className="aspect-square object-contain"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col gap-2 h-full">
                      <div className="flex items-start justify-between gap-1">
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
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Cantidad: {product.quantity}
                        </p>
                        <p className="text-sm font-semibold">
                          ${product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrdersTable;
