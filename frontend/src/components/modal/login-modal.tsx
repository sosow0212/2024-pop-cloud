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
    href: `https://kauth.kakao.com/oauth/authorize?response_type=${process.env.NEXT_PUBLIC_KAKAO_RESPONSE_TYPE}&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&scope=${process.env.NEXT_PUBLIC_KAKAO_SCOPE}`,
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
    <section className="flex h-200 flex-col items-center justify-center gap-25">
      <header className="mb-6 flex flex-col gap-15 text-center">
        <h2 className="pl-16 font-[TTSamlipCreamyWhiteR] text-32-700 font-bold text-blue-5">
          POP CLOUD
        </h2>
        <p className="text-gray-600">소셜 계정을 통해 로그인 해주세요</p>
      </header>
      <div className="flex items-center gap-25">
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
      className="rounded-lg bg-white p-25 shadow-lg "
    >
      <ProfileForm />
    </DrawerDialogContainer>
  );
}
