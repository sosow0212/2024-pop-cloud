"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
  const oneDay = 24 * 60 * 60 * 1000; // 일단 만료 기한은 하루로 할게요.
  cookies().set(name, value, { expires: Date.now() + oneDay });
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}
