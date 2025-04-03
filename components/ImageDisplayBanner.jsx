"use client";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const ImageDisplayBanner = (
  {images,
  width,
  height,
  alt,
  horizontal = false}
) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(images[Math.floor(Math.random() * images.length)]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Transition show appear={true}>
      <Image
        src={currentImage}
        width={width}
        height={height}
        loading="lazy"
        className={twMerge(
          `object-cover brightness-90 w-full h-full`
        )}
        alt={alt}
      />
    </Transition>
  );
};

export default ImageDisplayBanner