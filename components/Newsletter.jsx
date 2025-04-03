import {  ChevronRight, MailsIcon } from "lucide-react";
import React from "react";

const Newsletter = () => {
  const handleSubmit = (e) => {
    return null;
  };

  return (
    <div className="px-5 py-16 xl:px-0 bg-white  w-full">
      <div className=" text-gray-800 text-center space-y-2">
        <h2 className="text-xl sm:text-4xl flex items-center justify-center">
          Suscribete a nuestro Newletter
        </h2>
        <span className="max-sm:text-sm text-gray-700 flex-1 text-center font-semibold flex-wrap">
          !Nunca te pierdas de una oferta!
        </span>
      </div>
      <div className="w-full mt-8">
        <form
          action={(e)=>handleSubmit(e)}
          className="flex items-center justify-center gap-2 mx-auto"
        >
          <label htmlFor="email" hidden />
          <input
            type="email"
            name="email" required
            placeholder="Ingresa tu corrreo electronico"
            className="w-64 sm:w-78 border border-gray-400 rounded-sm p-2 focus:ring-blue-300"
          />
          <button type="submit" className="cursor-pointer">
            <ChevronRight className="size-8 text-gray-800" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
