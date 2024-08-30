import getToken from "@/actions/get-token";
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
  const data = await getToken(code, provider);
  if (!data.accessToken) {
    console.log("잘못된 접근");
    redirect("/error");
    // 에러 처리
  } else {
    cookies().set("token", data.accessToken, {
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
