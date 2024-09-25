"use client";

import React from "react";

import { useIsMobileStore } from "@/store";

import BottomNav from "./bottom-nav";
import SideNav from "./side-nav";

export default function NavBar() {
  const isMobile = useIsMobileStore();

  if (isMobile === null) {
    return null;
  }

  return isMobile ? <BottomNav /> : <SideNav />;
}
