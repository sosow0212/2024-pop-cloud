import { cookies } from "next/headers";

import NavMenu from "./_components/nav-menu";

export default function NavBar() {
  const cookieStore = cookies();
  const loggedIn = !!cookieStore.get("accessToken");
  return (
    <nav
      className=" fixed inset-x-0 bottom-0 z-50 h-50 border-t border-gray-1 bg-gray-1 shadow-md md:inset-y-0 md:bottom-auto md:left-0 md:h-full md:w-fit md:border-r"
      aria-label="Navigation Bar"
    >
      <NavMenu loggedIn={loggedIn} />
    </nav>
  );
}
