import Footer from "@/components/site/loja/layout/footer";
import Header from "@/components/site/loja/layout/header";
import { StoreHydration } from "@/providers/loja/store-hydration";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreHydration />
      <Header />

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <Footer />
    </>
  );
}
