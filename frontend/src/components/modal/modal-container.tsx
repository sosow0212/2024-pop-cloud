import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import cn from "@/components/ui/cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobileStore } from "@/store";

/**
 * dialog와 drawer container 입니다. 
 * 
 * 담고 싶은 내용을 children 형식으로 담아주시면 됩니다.
 * 
 * @example 
 *  <DrawerDialogContiner isOpen={isModalOpen} onClose={onClose}>
      <ProfileForm />
    </DrawerDialogContiner>
 * @author 위영진
 */
interface ContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function DialogContainer({
  isOpen,
  onClose,
  className,
  children,
}: ContainerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("bg-white pt-10", className)}>
        {/* Title과 Description을 설정하지 않을 시 경고창이 떠서 이를 막기 위해 선언하였습니다  */}
        <VisuallyHidden.Root asChild>
          <DialogTitle />
        </VisuallyHidden.Root>
        <VisuallyHidden.Root asChild>
          <DialogDescription />
        </VisuallyHidden.Root>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function DrawerContainer({
  children,
  isOpen,
  onClose,
  className,
}: ContainerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className={cn("bg-white pb-20", className)}>
        {/* Title과 Description을 설정하지 않을 시 경고창이 떠서 이를 막기 위해 선언하였습니다  */}
        <VisuallyHidden.Root asChild>
          <DrawerTitle />
        </VisuallyHidden.Root>
        <VisuallyHidden.Root asChild>
          <DrawerDescription />
        </VisuallyHidden.Root>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

/**
 *  모바일 환경일시 - drawer,데스크탑 환경일시 - dialog 가 노출되는 반응형입니다
 *  모바일/데스크탑의 기준이 max-width 480px이라 화면에 출력되는 요소는 tailwind sm(480px) 기준으로 작성해주시면 될 것 같습니다
 *
 *  @author 위영진
 */
function DrawerDialogContiner({
  children,
  isOpen,
  onClose,
  className,
}: ContainerProps) {
  const isMobile = useIsMobileStore();

  if (isMobile) {
    return (
      <DrawerContainer isOpen={isOpen} onClose={onClose} className={className}>
        {children}
      </DrawerContainer>
    );
  }
  return (
    <DialogContainer isOpen={isOpen} onClose={onClose} className={className}>
      {children}
    </DialogContainer>
  );
}

export { DialogContainer, DrawerContainer, DrawerDialogContiner };
