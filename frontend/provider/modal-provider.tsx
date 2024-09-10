"use client";
import ModalAuth from "@/components/modal/modal-auth";
import ModalMap from "@/components/modal/modal-map";

const ModalProvider = () => {
  return (
    <>
      <ModalMap />
      <ModalAuth />
    </>
  );
};

export default ModalProvider;
