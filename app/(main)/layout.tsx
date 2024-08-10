import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="h-full flex-1 bg-blue-300 px-2">{children}</main>
      <Footer />
      <Navbar />
    </div>
  );
};

export default MainLayout;
