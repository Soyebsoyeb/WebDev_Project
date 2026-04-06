import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-cormorant", // Keeping the variable name to prevent breaking CSS across files
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-inter", // Keeping the variable name to prevent breaking CSS across files
});

export const metadata: Metadata = {
  title: "Rentique | Premium Furniture Rental",
  description: "Style without permanence. Rent premium furniture flexible to your life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 ease-in-out bg-[var(--color-background)] text-text-primary">
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
        <Toaster position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
