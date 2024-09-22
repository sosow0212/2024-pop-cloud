"use client";

import { useModalStore } from "@/store/modal-store";

function AA() {
  const { onOpen } = useModalStore();
  return (
    <button type="button" onClick={() => onOpen("login")}>
      클릭
    </button>
  );
}

export default function Home() {
  return (
    <div>
      <AA />
    </div>
  );
}
