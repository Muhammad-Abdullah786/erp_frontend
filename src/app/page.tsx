// app/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "./home/page";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
