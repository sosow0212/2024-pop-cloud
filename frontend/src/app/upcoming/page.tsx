import Link from "next/link";
import { GiFluffyCloud } from "react-icons/gi";

function Upcoming() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-10 text-center">
      <GiFluffyCloud className="mb-30 size-130 text-blue-500" />
      <h2 className="mb-20 text-24-600">페이지 준비 중</h2>
      <p className="mb-40 text-18-500 text-gray-600">
        더 나은 서비스를 위해 준비 중입니다. 곧 멋진 모습으로 찾아뵙겠습니다!
      </p>
      <Link
        href="/"
        className="rounded bg-blue-3 px-44 py-12 text-white transition hover:bg-blue-9"
      >
        홈으로
      </Link>
    </div>
  );
}

export default Upcoming;
