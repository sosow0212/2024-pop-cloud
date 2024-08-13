"use client";
import NavIcon from "./nav-icon";
import NavScrollUp from "./nav-scroll-up";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex h-16 max-w-xl items-center justify-between border bg-slate-50 px-4 py-2">
      <NavScrollUp />
      <NavIcon title="팝업" icon="popup" href="/category/popup" />
      <NavIcon title="전시회" icon="exhibition" href="/category/exhibiton" />
      <NavIcon title="팝클라우드 홈" icon="home" href="/" />
      <NavIcon title="좋아요" icon="like" href="/favorite" />
      <NavIcon title="마이" icon="profile" href="/profile" />
    </nav>
  );
};

export default Navbar;
