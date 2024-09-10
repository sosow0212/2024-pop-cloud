import fetchOAuthAccessToken from "@/actions/auth-action/fetch-oauth-accessToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface OAuthPageProps {
  params: {
    provider: string;
  };
  searchParams: {
    code: string;
  };
}

const TOKEN_EXPIRY = 3600; // seconds

const OAuthPage = async ({ params, searchParams }: OAuthPageProps) => {
  const { provider } = params;
  const { code } = searchParams;
  if (provider !== "kakao") redirect("/");
  const data = await fetchOAuthAccessToken(code, provider);
  if (!data.accessToken) {
    console.log("잘못된 접근");
    redirect("/error");
    // 에러 처리 필요
  } else {
    cookies().set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: TOKEN_EXPIRY,
    });
    redirect("/profile");
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-12 animate-spin rounded-full border-4 border-black border-b-transparent" />
    </div>
  );
};

export default OAuthPage;
