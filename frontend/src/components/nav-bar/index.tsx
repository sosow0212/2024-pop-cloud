"use client";

import React from "react";
import { useIsMobileStore } from "@/store";
import SideNav from "./side-nav";
import BottomNav from "./bottom-nav";

export default function NavBar() {
  const isMobile = useIsMobileStore();
  if (isMobile) {
    return <BottomNav />;
  }
  return <SideNav />;
}
