import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Button from ".";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    isDisabled: false,
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click me",
  },
};

export const 버튼_활성화_여부: Story = {
  render: () => {
    function ButtonActive() {
      const [isActive, setIsActive] = useState(true);

      const handleActive = () => {
        setIsActive(!isActive);
      };

      return (
        <div className="flex size-[300px] flex-col gap-4">
          <Button variant="primary" isDisabled={isActive}>
            {isActive ? "Disabled" : "Enabled"}
          </Button>
          <Button variant="secondary" onClick={handleActive}>
            Toggle Button State
          </Button>
        </div>
      );
    }
    return <ButtonActive />;
  },
};

// 새로운 스토리 추가
export const SecondaryButton: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Action",
  },
};
