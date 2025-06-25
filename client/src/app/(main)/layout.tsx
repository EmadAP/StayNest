import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "leaflet/dist/leaflet.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col h-full">{children}</div>
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
