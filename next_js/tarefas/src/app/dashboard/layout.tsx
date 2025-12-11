import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Header } from "../component/header";

interface LayoutProps {
  children: ReactNode;
}

export default async function LayoutDash({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/?error=auth");

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />      
      {children}
    </div>
  );
}
