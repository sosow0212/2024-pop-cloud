import { useModalStore } from "@/store/modal-store";
import { DrawerDialogContiner } from "./modal-container";
import Button from "../common/button";

function ProfileForm() {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&${process.env.NEXT_PUBLIC_KAKAO_CLIENTID}&redirect_uri=http://localhost:8080/api/auth/login/oauth/kakao&scope=profile_nickname,account_email`;
  };

  return (
    <section className="flex flex-col   items-center justify-center gap-y-10 ">
      <header>소셜 계정을 통해 로그인 해주세요 </header>
      <Button
        variant="primary"
        type="button"
        onClick={handleLogin}
        className="bg-yellow-500 text-white rounded-md w-3/4 py-10  lg:w-full"
      >
        <div>카카오 로그인</div>
      </Button>
    </section>
  );
}

export default function LoginModal() {
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "login";

  return (
    <DrawerDialogContiner isOpen={isModalOpen} onClose={onClose}>
      <ProfileForm />
    </DrawerDialogContiner>
  );
}
