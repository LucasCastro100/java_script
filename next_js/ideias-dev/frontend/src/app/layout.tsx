import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MeuSite",
    template: "%s | MeuSite", // <-- isso gera títulos dinâmicos
  },
  description: "Descrição padrão do site",
  authors: [
    { name: "Lucas Oliveira", url: "https://meusite.com/autor/lucas" }
  ],
  keywords: ["Next.js", "React", "Tailwind"],
  openGraph: {
    title: "MeuSite",
    description: "Descrição padrão para Open Graph",
    url: "https://meusite.com",
    siteName: "MeuSite",
    images: [
      {
        url: "https://meusite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imagem OG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeuSite",
    description: "Descrição padrão no Twitter",
    images: ["https://meusite.com/twitter-image.png"],
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
