import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-900 border-t border-gray-800 text-gray-400">
      {/* Main Footer Content */}
      <div className="px-16 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="font-bold text-gray-600">POPCLOUD</h2>
            <p className="text-sm">퍼져있는 팝업을 하나로</p>
            <div className="flex space-x-4" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-600">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/upcoming">회사 소개</Link>
              </li>
              <li>
                <Link href="/upcoming">블로그</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-600">법적 고지</h3>
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

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-600">연락처</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span>contact@popcloud.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>서울특별시 강남구 테헤란로</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-300 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p>© {currentYear} Popcloud. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
