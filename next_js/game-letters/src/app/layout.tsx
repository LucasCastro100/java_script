import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="bg-gray-100 flex-1">
          <div className="p-6 w-full max-w-6xl mx-auto">
          {children}
          </div>          
        </main>

        <Footer />
      </body>
    </html>
  );
}
