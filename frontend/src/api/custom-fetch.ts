/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError, NotFoundError } from "@/custom-error";
import getBrowserCookie from "@/utils/browser-cookies";
import { getCookie } from "@/utils/next-cookie";

class CustomFetch {
  private baseURL: string;
  accessToken?: string;

  constructor() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    if (!BASE_URL) {
      throw new NotFoundError("base url이 없습니다.");
    }
    // 브라우저에서는 localhost:9090, 서버사이드에서는 mock:9090 사용
    this.baseURL =
      typeof window !== "undefined"
        ? BASE_URL.replace("mock", "localhost")
        : BASE_URL;
  }

  async getAccessToken() {
    if (typeof window !== "undefined") {
      this.accessToken = getBrowserCookie("accessToken");
    } else {
      this.accessToken = await getCookie("accessToken");
    }
  }

  // 공통 fetch 메서드
  async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<{ data: T }> {
    await this.getAccessToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };

    const config = {
      ...options,
      headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new ApiError(
        errorData.message || "요청에 실패했습니다",
        response.status,
      );
      throw error;
    }

    return { data: await response.json() };
  }

  // GET 메서드
  get<T>(endpoint: string, options: RequestInit = {}) {
    return this.fetchWithAuth<T>(endpoint, { ...options, method: "GET" });
  }

  // POST 메서드
  post<T>(endpoint: string, body: any, options: RequestInit = {}) {
    return this.fetchWithAuth<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // PUT 메서드
  put<T>(endpoint: string, body: any, options: RequestInit = {}) {
    return this.fetchWithAuth<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  // DELETE 메서드
  delete<T>(endpoint: string, options: RequestInit = {}) {
    return this.fetchWithAuth<T>(endpoint, { ...options, method: "DELETE" });
  }
}

/**
 * axios 처럼 동작하는 인스턴스입니다.
 * 
 * 데이터는 axios처럼 객체 안 data에 담겨 와요.
 * 
 * Base Url 이랑 accessToken 자동으로 들어갑니다.
 * 
 * 받아야 하는 데이터 타입을 제네릭 타입 넣어주세요.
 * 
 * 예시 적어놓은 거 참고 바랍니다.
 * 
 * @example 
 * 
 * import {ApiError} from "@/custom-error";
 * import instance from "../custom-fetch";
 * try {
    const { data } = await instance.post<Response>(
      "/auth/login/oauth/kakao",
      {바디},
      {
        headers: {
          헤더
        },
      },
    );

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
 */

const instance = new CustomFetch();

export default instance;
