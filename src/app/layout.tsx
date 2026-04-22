import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import CartContainer from "@/components/CartContainer";
import ConversationalSearch from "@/components/ConversationalSearch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simba Supermarket | Rwanda's Online Supermarket",
  description: "Shop for groceries, electronics, and more at Simba Supermarket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-900 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <CartProvider>
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#334155',
                    color: '#fff',
                    borderRadius: '12px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#f97316',
                      secondary: '#fff',
                    },
                  },
                }} 
              />
              {children}
              <CartContainer />
              <ConversationalSearch />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
