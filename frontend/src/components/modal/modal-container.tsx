import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import cn from "@/utils/cn";
import useMediaQuery from "@/hooks/use-media-query";

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
      <DialogContent className={cn("bg-white", className)}>
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
      <DrawerContent className={cn("bg-white", className)}>
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

function DrawerDialogContiner({
  children,
  isOpen,
  onClose,
  className,
}: ContainerProps) {
  const isDektop = useMediaQuery();

  if (isDektop) {
    return (
      <DialogContainer isOpen={isOpen} onClose={onClose} className={className}>
        {children}
      </DialogContainer>
    );
  }
  return (
    <DrawerContainer isOpen={isOpen} onClose={onClose} className={className}>
      {children}
    </DrawerContainer>
  );
}

export { DialogContainer, DrawerContainer, DrawerDialogContiner };
