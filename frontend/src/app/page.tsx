"use client";

import { useModalStore } from "@/store/modal-store";

function AA() {
  const { onOpen } = useModalStore();
  return (
    <button onClick={() => onOpen("login")} type="button">
      aa
    </button>
  );
}

export default function Home() {
  return (
    <div>
      HOME
      <AA />
    </div>
  );
}
