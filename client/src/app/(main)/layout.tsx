import Navbar from "@/components/Navbar";
import "leaflet/dist/leaflet.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
