import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { googleIcon, kakaoTalkIcon, naverIcon } from "@/icons/index";
import { useModalStore } from "@/store";

import { DrawerDialogContainer } from "./modal-container";

const LOGIN_OPTION = [
  {
    href: `https://kauth.kakao.com/oauth/authorize?response_type=code&${process.env.NEXT_PUBLIC_KAKAO_CLIENTID}&redirect_uri=http://localhost:8080/api/auth/login/oauth/kakao&scope=profile_nickname,account_email`,
    icon: kakaoTalkIcon,
    alt: "카카오톡 로고",
  },
  {
    href: "",
    icon: googleIcon,
    alt: "구글 로고",
  },
  {
    href: "",
    icon: naverIcon,
    alt: "네이버 로고",
  },
];

function ProfileForm() {
  return (
    <section className="gap-25 flex flex-col items-center justify-center">
      <header className="mb-6 text-center">
        <h2 className="text-24-700 mb-2 ">로그인</h2>
        <p className="text-gray-600">소셜 계정을 통해 로그인 해주세요</p>
      </header>
      <div className="gap-25 flex items-center">
        {LOGIN_OPTION.map(({ href, icon, alt }) =>
          href ? (
            <Link key={alt} href={href} className="size-45">
              <Image src={icon} alt={alt} />
            </Link>
          ) : (
            <TooltipProvider key={alt}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-35">
                    <Image src={icon} alt={alt} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>아직 준비 중이에요</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
        )}
      </div>
    </section>
  );
}

export default function LoginModal() {
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "login";

  return (
    <DrawerDialogContainer
      isOpen={isModalOpen}
      onClose={onClose}
      className="p-15 rounded-lg bg-white shadow-lg"
    >
      <ProfileForm />
    </DrawerDialogContainer>
  );
}
