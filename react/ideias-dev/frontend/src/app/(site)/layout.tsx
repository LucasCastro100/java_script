
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <main className="w-full max-w-6xl mx-auto p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
