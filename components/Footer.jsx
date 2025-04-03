import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-gray-800">
        <div className="px-5 max-width mx-auto py-8 space-y-5 flex flex-col sm:flex-row items-start justify-between">
          <div className="w-full sm:w-1/2">
            <Link href="/" className="font-semibold text-white text-3xl w-1/3">
              Shopi
            </Link>
            <p className="font-montserrat text-white text-sm mt-2">
              Shopy &copy; Todos los derechos reservados
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-end  md:justify-between gap-5 max-sm:w-full max-md:w-1/3">
            <div className="text-white space-y-3">
              <h4 className="font-semibold text-lg">Sobre Shopy</h4>
              <ul className="list-none flex flex-col gap-1">
                <Link href="">Institucional</Link>
                <Link href="">Trabaja con Nosotros</Link>
                <Link href="">Inversores</Link>
              </ul>
            </div>

            <div className="text-white space-y-3 md:w-1/2">
              <h4 className="font-semibold text-lg">Politicas</h4>
              <ul className="list-none flex flex-col gap-1">
                <Link href="">
                  Reglamentos, Política de Cambios y Devoluciones
                </Link>
                <Link href="">Política de Privacidad</Link>
                <Link href="">Términos de Uso</Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="text text-sm text-center py-3 max-md:mb-16">
        Made with 💜 by{" "}
        <Link
          href="https://devnox-portfolio.netlify.app/"
          target="_blank"
          className={`uppercase font-semibold text-purple-700`}
        >
          Dev Gnox
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
