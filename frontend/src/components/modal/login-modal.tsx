import cn from "@/utils/cn";
import { useModalStore } from "@/store/modal-store";
import { DrawerDialogContiner } from "./modal-container";

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="username">Username</label>
        <input id="username" defaultValue="@shadcn" />
      </div>
      <button type="submit">Save changes</button>
    </form>
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
