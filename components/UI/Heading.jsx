import React from "react";
import { twMerge } from "tailwind-merge";

const Heading = ({ title, backgroundStyles = "bg-white", textColor="text-gray-800" }) => {
  return (
    <h2
      className={twMerge([
        "font-montserrat italic font-bold w-fit -skew-x-16 p-1 px-2 md:px-5 text-center text-xl md:text-6xl uppercase",
        backgroundStyles, textColor
      ])}
    >
      {title}
    </h2>
  );
};

export default Heading;
