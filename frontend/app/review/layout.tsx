import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[100vh] flex-col border-x">
      <Header />
      <main className="flex-1 bg-blue-300 px-2">{children}</main>
      <Footer />
      <Navbar />
    </div>
  );
};

export default ReviewLayout;
