"use client";

import {
  AlertDialog,
  LoginModal,
  RecommendationModal,
} from "@/components/modal";

export default function ModalProvider() {
  return (
    <>
      <AlertDialog />
      <LoginModal />
      <RecommendationModal />
    </>
  );
}
