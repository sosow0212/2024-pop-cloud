import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center border-t border-gray-30 px-60 text-gray-60">
      <div className="w-full max-w-1200 px-16 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-8 pb-20 text-center md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="font-bold text-gray-80">POPCLOUD</h2>
            <p className="text-sm">퍼져있는 팝업을 하나로</p>
            <div className="flex space-x-4" />
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-80">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/upcoming">회사 소개</Link>
              </li>
              <li>
                <Link href="/upcoming">블로그</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-80">법적 고지</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/upcoming">개인정보처리방침</Link>
              </li>
              <li>
                <Link href="/upcoming">이용약관</Link>
              </li>
              <li>
                <Link href="/upcoming">쿠키 정책</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-80">연락처</h3>
            <ul className="space-y-2">
              <li>
                <span>contact@popcloud.com</span>
              </li>
              <li>
                <span>02-1234-5678</span>
              </li>
              <li>
                <span>서울특별시 강남구 테헤란로</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-30 mt-12 w-full border-t border-gray-20 pt-30">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p>© {currentYear} Popcloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
