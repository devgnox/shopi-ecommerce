"use client";
import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import ImageDisplayBanner from "./ImageDisplayBanner";
import Heading from "./UI/Heading";

const Hero = () => {
  return (
    <div className={`relative bg-white flex w-full md:h-[700px] transition-opacity duration-300 ease-in`}>
      <ImageDisplayBanner key={'slide-1'} images={['/images/pexels-model-3.jpg', '/images/pexels-model-2.jpg','/images/pexels-model-1.jpg']} height={300} width={500} alt={'model1 '+' model2' + ' model3'}/>
      <ImageDisplayBanner key={'slide-2'} images={['/images/pexels-model-4.jpg', '/images/pexels-model-5.jpg','/images/pexels-model-6.jpg']} height={800} width={800} alt={'model4 '+' model5' + ' model6'}/>
      <ImageDisplayBanner key={'slide-3'} images={['/images/pexels-model-7.jpg', '/images/pexels-model-8.jpg','/images/pexels-model-9.jpg']} height={800} width={800} alt={'model7 '+' model8' + ' model9'}/>
      <div className="absolute bottom-1/6 md:bottom-2/6 w-full flex flex-col gap-2.52 md:gap-5 items-center justify-center">
        <Heading title=" Nueva Colección" />
        <Link
          href="#featured"
          className="rounded-full animate-pulse shadow-md cursor-pointer bg-slate-50 hidden md:flex items-center size-10"
        >
          <ArrowDown className="size-6 mx-auto animate-none text-gray-800" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
