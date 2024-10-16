"use server";

import { cookies } from "next/headers";

/**
 *넥스트 쿠키를  사용할 수 있는 함수들입니다.
 get,set,delete 있습니다.
 서버와 클라이언트 모두 사용가능합니다.
 * @example
 * setCookie("token","this is token");
 * getCookie("token");
 * deleteCookie("token");
 * @author ☯️채종민
 */

export async function setCookie(name: string, value: string) {
  const oneDay = 24 * 60 * 60 * 1000; // Set expiry for one day
  cookies().set(name, value, { expires: Date.now() + oneDay });
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}
