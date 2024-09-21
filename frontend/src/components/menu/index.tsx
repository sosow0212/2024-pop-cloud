"use client";

import React from "react";
import { useIsMobile } from "@/hooks";
import SideMenu from "./side-menu";
import BottomMenu from "./bottom-menu";

export default function Menu() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <BottomMenu />;
  }
  return <SideMenu />;
}
