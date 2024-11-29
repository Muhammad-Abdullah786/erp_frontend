// app/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}
