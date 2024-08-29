import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";

const FavoriteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col border-x">
      <Header />
      <main className="flex-1 px-2">{children}</main>
      <Footer />
      <Navbar />
    </div>
  );
};

export default FavoriteLayout;
