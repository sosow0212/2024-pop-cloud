"use client";

import AlertDialog from "@/components/modal/alert-dialog";
import LoginModal from "@/components/modal/login-modal";

export default function ModalProvider() {
  return (
    <>
      <AlertDialog />
      <LoginModal />
    </>
  );
}
