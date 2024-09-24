import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { useModalStore } from "@/store";

import Button from "../common/button";
import { LoginModal } from ".";


const meta: Meta<typeof LoginModal> = {
  title: "Components/LoginModal",
  component: LoginModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const originalState = useModalStore.getState();
      const [isOpen, setIsOpen] = useState(false);

      useEffect(() => {
        useModalStore.setState({
          isOpen,
          type: "login",
          onClose: () => setIsOpen(false),
          onOpen: (type) => {
            if (type === "login") setIsOpen(true);
          },
        });

        return () => {
          useModalStore.setState(originalState);
        };
      }, [isOpen, originalState]);

      return (
        <div>
          <Button
            variant="primary"
            onClick={() => useModalStore.getState().onOpen("login")}
            className="border px-2"
          >
            Open Login Modal
          </Button>
          <Story />
        </div>
      );
    },
  ],
};
