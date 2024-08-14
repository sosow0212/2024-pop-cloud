import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/lib/store";
import Image from "next/image";

const ModalAuth = () => {
  const { isOpen, modal, onClose } = useModalStore();
  if (!isOpen && modal !== "auth") return;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[50vh] max-w-lg">
        <DialogHeader className="">
          <DialogTitle className="text-[1.75rem]">POP CLOUD 로그인</DialogTitle>
          <DialogDescription>
            sns 계정으로 빠르게 로그인/회원가입을 해보세요!
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col items-center space-y-4">
          <OAuthBtn provider="kakao" />
          <OAuthBtn provider="google" />
          <OAuthBtn provider="naver" />
        </ul>
      </DialogContent>
    </Dialog>
  );
};

const OAUTH = {
  google: {
    title: "구글",
    oauthLink: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENTID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_GOOGLE_REDIRECT_URI}`,
    bg: "bg-slate-50",
  },
  kakao: {
    title: "카카오",
    oauthLink: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH_KAKAO_CLIENTID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_KAKAO_REDIRECT_URI}&scope=profile_nickname,account_email`,
    bg: "bg-yellow-400",
  },
  naver: {
    title: "네이버",
    oauthLink: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENTID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_NAVER_REDIRECT_URI}&state=test`,
    bg: "bg-green-400",
  },
};

interface OAuthBtnProps {
  provider: "google" | "naver" | "kakao";
}

const OAuthBtn = ({ provider }: OAuthBtnProps) => {
  const handleClick = () => {
    window.location.href = OAUTH[provider].oauthLink;
  };
  return (
    <li
      onClick={handleClick}
      className={`flex w-full cursor-pointer items-center justify-center space-x-4 rounded-xl border py-4 font-semibold shadow-lg ${OAUTH[provider].bg}`}
    >
      <div className="relative size-6">
        <Image src={`/oauth/${provider}-logo.svg`} fill alt={provider} />
      </div>
      <div>{OAUTH[provider].title} 로그인</div>
    </li>
  );
};

export default ModalAuth;
