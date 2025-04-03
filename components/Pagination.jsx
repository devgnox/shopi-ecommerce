"use client";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
  onlyArrows = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers = [1];

    let start, end;

    if (currentPage <= 5) {
      [start, end] = [2, 9];
      pageNumbers.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
      );
      pageNumbers.push("ellipsis-end", totalPages);
    } else if (currentPage > totalPages - 5) {
      [start, end] = [totalPages - 8, totalPages - 1];
      pageNumbers.push("ellipsis-start");
      pageNumbers.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
      );
      pageNumbers.push(totalPages);
    } else {
      [start, end] = [currentPage - 3, currentPage + 3];
      pageNumbers.push("ellipsis-start");
      pageNumbers.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
      );
      pageNumbers.push("ellipsis-end", totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handleEllipsisClick = (direction) => {
    const newPage =
      direction === "start"
        ? Math.max(1, currentPage - 10)
        : Math.min(totalPages, currentPage + 10);
    handlePageChange(newPage);
  };

  return (
    <div className="flex space-x-2 ">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 rounded-sm border border-gray-300  transition duration-300 ease-in ${
          currentPage === 1
            ? " text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-300/50  cursor-pointer"
        }`}
      >
        <ArrowLeft className="size-5" />
      </button>

      {!onlyArrows &&
        pageNumbers.map((page, idx) => {
          if (page == "ellipsis-start" || page == "ellipsis-end") {
            return (
              <button
                key={`${page}-${idx}`}
                onClick={() =>
                  handleEllipsisClick(page == "ellipsis-start" ? "start" : "end")
                }
                className={`px-2.5  cursor-pointer rounded-sm  hover:bg-gray-300/50 transition duration-300 ease-in  `}
              >
                <MoreHorizontal className="size-4" />
              </button>
            );
          }

          return (
            <button
              key={`${page}-${page}`}
              onClick={() => handlePageChange(page)}
              className={`px-2.5  cursor-pointer rounded-sm ${
                currentPage === page
                  ? "bg-gray-800  text-white"
                  : "hover:bg-gray-300/50  transition duration-300 ease-in"
              }`}
            >
              {page}
            </button>
          );
        })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1 rounded-sm border border-gray-300  transition duration-300 ease-in ${
          currentPage === totalPages
            ? " text-gray-400 cursor-not-allowed"
            : " hover:bg-gray-300/50  cursor-pointer"
        }`}
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
