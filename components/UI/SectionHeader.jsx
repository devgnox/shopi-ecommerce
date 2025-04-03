import Image from "next/image";
import React from "react";
import Heading from "./Heading";

const SectionHeader = ({ image=null,alt, title, imageClass='w-full sm:-top-25 object-cover', bgColor="bg-slate-300" }) => {
  return (
    <div className={`h-56 md:h-96 relative w-full flex items-center ${bgColor} overflow-hidden`}>
     {image && <Image
        src={image}
        className={`absolute left-0 ${imageClass}`} 
        width={700}
        height={700} alt={alt}
      />}
      <div className="max-width mx-auto text-center ">
        <Heading title={title} />
      </div>
    </div>
  );
};

export default SectionHeader;
