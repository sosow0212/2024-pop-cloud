import type { Meta, StoryObj } from "@storybook/react";
import Carousel from ".";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {},
} as Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    link: false,
    autoPlay: false,
    indicators: false,
  },
};

export const Link: Story = {
  args: {
    link: true,
    autoPlay: false,
    indicators: false,
  },
};

export const Indicators: Story = {
  args: {
    link: true,
    autoPlay: false,
    indicators: true,
  },
};

export const Autoplay: Story = {
  args: {
    link: true,
    autoPlay: true,
    indicators: true,
  },
};
