import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { createElement, PropsWithChildren } from "react";

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
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobileStore } from "@/store";

interface ContainerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * 모달 container 입니다. 
 * 
 * 담고 싶은 내용을 children 형식으로 담아주시면 됩니다.
 * 
 * @example 
 *  <DialogContainer isOpen={isModalOpen} onClose={onClose}>
      <ProfileForm />
    </DialogContainer>
 * @author 위영진
 */

function DialogContainer({
  isOpen,
  onClose,
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
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

/**
 * drawer container 입니다. 
 * 
 * 담고 싶은 내용을 children 형식으로 담아주시면 됩니다.
 * 
 * @example 
 *  <DrawerDialogContainer isOpen={isModalOpen} onClose={onClose}>
      <ProfileForm />
    </DrawerDialogContainer>
 * @author 위영진
 */

function DrawerContainer({
  children,
  isOpen,
  onClose,
  className,
}: PropsWithChildren<ContainerProps>) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerOverlay />
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
function DrawerDialogContainer({
  children,
  isOpen,
  onClose,
  className,
}: PropsWithChildren<ContainerProps>) {
  const isMobile = useIsMobileStore();
  return createElement(
    isMobile ? DrawerContainer : DialogContainer,
    { isOpen, onClose, className },
    children,
  );
}

export { DialogContainer, DrawerContainer, DrawerDialogContainer };
