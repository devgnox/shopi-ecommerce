import { Inter, Montserrat } from "next/font/google";
import QueryProvider from "../_providers/QueryProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cart from "../../components/Cart";
import { AuthProvider } from "../../hooks/useAuth";
import { CartProvider } from "../../hooks/useCart";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";

const montserratSans = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shopi",
  description: "Tienda en linea!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable}`}
    >
      <body
        className={`antialiased overflow-x-hidden max-w-screen scroll-smooth font-sans`}
      >
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="h-auto">{children}</main>
              <Footer />
              <Cart />
              <Toaster position="bottom-right" />
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
