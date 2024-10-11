/* eslint-disable no-useless-escape */

/**
 *클라이언트 쿠키를 사용하는 함수입니다..
 * @example
 * getBrowserCookie("token");
 * @author ☯️채종민
 */
export default function getBrowserCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
