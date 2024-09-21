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

// New story for secondary variant
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

// New story for a custom colored button
export const CustomColored: Story = {
  args: {
    variant: "primary",
    children: "Custom Color",
    style: { backgroundColor: "#FF5733", color: "white" },
  },
};

export const 버튼_활성화_여부: Story = {
  render: () => {
    function ButtonActive() {
      const [isActive, setIsActive] = useState(true);
      const [clickCount, setClickCount] = useState(0);

      const handleActive = () => {
        setIsActive(!isActive);
        setClickCount((prev) => prev + 1);
      };

      return (
        <div className="flex size-[300px] flex-col gap-4">
          <Button variant="primary" isDisabled={isActive}>
            {isActive ? "Disabled" : "Enabled"}
          </Button>
          <Button variant="secondary" onClick={handleActive}>
            Toggle Button State (Clicked: {clickCount})
          </Button>
        </div>
      );
    }
    return <ButtonActive />;
  },
};

// New story showcasing button sizes
export const ButtonSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button
        variant="primary"
        style={{ fontSize: "12px", padding: "5px 10px" }}
      >
        Small Button
      </Button>
      <Button variant="primary">Default Size</Button>
      <Button
        variant="primary"
        style={{ fontSize: "20px", padding: "15px 30px" }}
      >
        Large Button
      </Button>
    </div>
  ),
};
