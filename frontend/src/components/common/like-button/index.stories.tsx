import type { Meta, StoryObj } from "@storybook/react";

import LikeButton from "./index";

const meta: Meta<typeof LikeButton> = {
  title: "Components/LikeButton",
  component: LikeButton,
  tags: ["autodocs"],
  argTypes: {
    initialLiked: { control: "boolean" },
    onChange: { action: "changed" },
    size: { control: { type: "range", min: 10, max: 50, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    initialLiked: false,
    size: 20,
  },
};

export const InitiallyLiked: Story = {
  args: {
    initialLiked: false,
    size: 20,
  },
};

export const LargeButton: Story = {
  args: {
    initialLiked: false,
    size: 40,
  },
};

export const SmallButton: Story = {
  args: {
    initialLiked: true,
    size: 15,
  },
};
