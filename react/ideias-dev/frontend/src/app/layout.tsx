import "./globals.css";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
