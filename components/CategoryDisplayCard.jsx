import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { twMerge } from 'tailwind-merge'

const variantImageStyles = {
  left: "-ml-36",
  right: "-mr-36",
};

const variantTextPosition={
 right: "ml-auto right-7",
 left:"mr-auto left-7"
}

const variantTextStyle={
  light:'text-white',
  dark:'text-gray-800'
}

const CategoryDisplayCard = ({backgroundClasses, link='', title, image, imageStyles='', textStyles='light', imagePosition='right' | 'left', textPosition='right' | 'left'}) => {
  return (
    <Link href={'/productos'+link} className={twMerge(['relative h-56 md:h-78 w-full shadow-sm max-sm:col-span-full rounded-sm overflow-hidden group   transition duration-300 ease-in-out', backgroundClasses])}>
    <p className={twMerge(["absolute top-3/6 z-[6]   font-bold text-4xl uppercase", variantTextPosition[textPosition], variantTextStyle[textStyles] ])}>{title}</p>
      <Image
        src={image}
        className={twMerge(["absolute z-[5] group-hover:scale-105 transition duration-300 ease-in-out top-0 w-full h-full object-cover ", variantImageStyles[imagePosition], imageStyles])}
        width={500}
        height={500}
        alt={title}
      />
    </Link>
  )
}

export default CategoryDisplayCard
