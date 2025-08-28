import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minha Página - Open Graph",
  description: "Descrição para redes sociais",
  openGraph: {
    title: "Minha Página - Open Graph",
    description: "Descrição para redes sociais",
    url: "https://meusite.com",
    images: [
      {
        url: "https://meusite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imagem OG",
      },
    ],
    siteName: "MeuSite",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minha Página - Twitter",
    description: "Descrição do Twitter",
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
            <main className="flex-1 bg-gray-50">          
                {children}          
            </main>
          </body>
        </html>
  );
};

export default RootLayout;
