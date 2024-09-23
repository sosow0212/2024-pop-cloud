import { ReactNode } from "react";

export default function NavBarContainer({ children }: { children: ReactNode }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 h-50 border-t border-gray-300 bg-white shadow-md md:inset-y-0 md:bottom-auto md:left-0 md:h-full md:w-70 md:border-r lg:w-245"
      aria-label="Navigation Bar"
    >
      {children}
    </nav>
  );
}
