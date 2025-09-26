import { TitlePage } from "@/components/site/globals/titlePage";
import Footer from "@/components/site/loja/layout/footer";
import Header from "@/components/site/loja/layout/header";
import { HeaderFilmes } from "@/components/site/prime-flix/header";
import { StoreHydration } from "@/providers/loja/store-hydration";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>      
      <HeaderFilmes />
      <TitlePage title="Prime Flix" />

      <main className="flex-1 bg-gray-50">
        {children}
      </main>      
    </>
  );
}
