import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev - Pizza",
  description: "Aplicativo com foco em gerenciamento de pedidos para pizzarias, desenvolvido com Next.js e TypeScript.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br" translate="no">
       <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
