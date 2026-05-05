import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AIAssistant from "@/components/chat/AIAssistant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDP Market & Services | El marketplace de Mar del Plata",
  description: "Compra, vendé y contratá servicios en Mar del Plata con pago protegido. Productos y profesionales verificados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-[#ebebeb] text-slate-900 flex flex-col min-h-screen`}>
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AIAssistant />
        </FavoritesProvider>
      </body>
    </html>
  );
}
