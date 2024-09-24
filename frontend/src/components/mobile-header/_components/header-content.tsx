import Link from "next/link";
import BackButton from "./back-button";

export default function HeaderContent() {
  return (
    <nav>
      <BackButton />
      <Link href="/">
        <h1 className="pl-16 font-[TTSamlipCreamyWhiteR] text-15 font-bold text-purple-400">
          POP CLOUD
        </h1>
      </Link>
    </nav>
  );
}
