import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-[4.75rem]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
