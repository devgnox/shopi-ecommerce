"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../hooks/useAuth";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, loginLoading, loginError, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        toast.success("Redirigiendo...", {
          style: { padding: "15px" },
        });

        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      },
      onError: (err) => {
        toast.error("Algo salió mal, intenta de nuevo", {
          style: { padding: "15px" },
        });
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
            loading="lazy"
            alt="mujer"
            className="object-cover  h-full "
          />
        </div>
        <div className="bg-white p-5 w-full sm:w-1/3">
          <div className="mb-3">
            <h3 className="text-xl font-semibold font-montserrat text ">
              Inicia Sesión
            </h3>
            <p className="text-sm text-gray-500">
              Inicia sesión y disfruta de exclusivas ofertas
            </p>
          </div>

          <div className="border p-1 px-2 text-gray-500 bg-gray-500/5 text-sm border-gray-500 rounded-sm">
            <p>
              Para motivos de prueba puedes inciar sesión con las siguientes
              credenciales.
            </p>

            <p className="mt-2 font-bold">
              Username: <span className="font-semibold">emilys</span>
            </p>
            <p className="font-bold">
              Contraseña <span className="font-semibold">emilyspass</span>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-4 transform transition-transform duration-300 ease-in"
          >
            <div>
              <label htmlFor="email" className="">
                Email / Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="font-bold p-2 w-full h-full border border-gray-400 rounded-sm"
                required
              />
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

            {loginError && (
              <div className="bg-red-500/20 rounded-sm p-3 px-2 font-bold text-center text-red-500 ">
                {loginError.message || "Error al iniciar sesión"}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-800/80 cursor-pointer transition duration-300 ease-in"
              disabled={loginLoading}
            >
              {loginLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p>
              ¿No tienes cuenta?{" "}
              <Link
                href="/auth/register"
                className="text-gray-800  hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
