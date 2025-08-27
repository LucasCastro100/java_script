import Footer from "@/components/site/store/layout/footer";
import Header from "@/components/site/store/layout/header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />

        <main className="w-full max-w-6xl mx-auto p-5">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
