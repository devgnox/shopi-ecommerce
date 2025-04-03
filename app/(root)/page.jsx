"use client";
import Image from "next/image";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  LoaderCircle,
  Mails,
  MailsIcon,
  Spline,
} from "lucide-react";
import axios from "axios";
import Hero from "../../components/Hero";
import ProductSuggestions from "../../components/ProductSuggestions";
import CategoryDisplayCard from "../../components/CategoryDisplayCard";
import Link from "next/link";
import CategoryDisplay from "../../components/CategoryDisplay";
import Newsletter from "../../components/Newsletter";
import { useProducts } from "../../hooks/useProducts";

export default function Home() {
  const { data, isLoading, error, isPreviousData } = useProducts();

  return (
    <section className="h-auto scroll-smooth">
      <Hero />

      <ProductSuggestions
        id="featured"
        title="Productos Destacados"
        loading={isLoading}
        containerClassName="px-5 xl:px-0 max-width mx-auto my-8 sm:my-16"
        products={data?.products?.slice(0,10)}
        totalPages={data?.totalPages}
        currentPage={1}
      />

      <CategoryDisplay />

      <Newsletter />
    </section>
  );
}
