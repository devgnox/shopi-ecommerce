"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../hooks/useAuth";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
  });

  const { register, registerLoading, registerError, isAuthenticated } =
    useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="">
      <div className="relative flex  max-width mx-auto my-16 sm:h-[600px] overflow-hidden">
        <div className="max-sm:hidden sm:w-2/3 overflow-hidden h-auto">
          <Image
            src={"/images/login-background.jpg"}
            width={1200}
            height={800}
            alt="mujer"
            className="object-cover  h-full "
          />
        </div>
        <div className="bg-white p-5 w-full sm:w-1/3">
          <div className="mb-3">
            <h3 className="text-xl font-semibold font-montserrat text ">
              Crea una cuenta en Shopi
            </h3>
            <p className="text-sm text-gray-500">
              Crea una cuenta y comienza a disfrutar de un nuevo estilo
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-4 transform transition-transform duration-300 ease-in"
          >
            <div>
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                id="emal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="font-bold p-2 w-full h-full border border-gray-400 rounded-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4  ">
              <div className="">
                <label htmlFor="firstname" className="">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="name.firstname"
                  value={formData.name.firstname}
                  onChange={handleChange}
                  className="font-bold p-2 w-full  border border-gray-400 rounded-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastname" className=" ">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="name.lastname"
                  value={formData.name.lastname}
                  onChange={handleChange}
                  className="font-bold p-2 w-full  border border-gray-400 rounded-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="font-bold  p-2 w-full h-full border border-gray-400 rounded-sm"
                required
              />
            </div>

            {registerError && (
              <div className="bg-red-500/20 rounded-sm p-3 px-2 font-bold text-center text-red-500 ">
                {registerError.message || "Error al registrarse"}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-800/80 cursor-pointer transition duration-300 ease-in"
              disabled={registerLoading}
            >
              {registerLoading ? "Creando Cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p>
              ¿Ya tienes cuenta? {" "}
              <Link
                href="/auth/login"
                className="text-gray-800  hover:underline"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
