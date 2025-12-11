import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Api Routes - Home",
  description: "api routes com next",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="p-4 w-full max-w-6xl mx-auto">
        <h1 className="text-center font-medium text-3xl">API ROUTES</h1>
      </div>
    </div>
  )
}
