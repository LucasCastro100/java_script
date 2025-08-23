import { Footer } from "@/components/site/globals/footer";
import { Header } from "@/components/site/globals/header";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-4 bg-gray-50">
          <div className="w-full max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
};

export default SiteLayout;