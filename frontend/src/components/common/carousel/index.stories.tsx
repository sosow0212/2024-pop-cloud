import type { Meta, StoryObj } from "@storybook/react";

import Carousel from ".";

const mock = ["/images/mock.jpeg", "/images/mock2.jpeg", "/images/mock3.jpeg"];

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "캐러셀에 표시할 이미지 URL 배열",
    },
    link: {
      control: "boolean",
      description: "이미지에 링크를 적용할지 여부",
    },
    autoPlay: {
      control: "boolean",
      description: "자동 재생 여부",
    },
    indicators: {
      control: "boolean",
      description: "인디케이터 표시 여부",
    },
    className: {
      control: "text",
      description: "추가적인 CSS 클래스",
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mock,
    link: false,
    autoPlay: false,
    indicators: false,
    className: "w-full h-300",
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    link: true,
  },
};

export const Indicators: Story = {
  args: {
    ...Default.args,
    link: true,
    indicators: true,
  },
};

export const Autoplay: Story = {
  args: {
    ...Default.args,
    link: true,
    autoPlay: true,
    indicators: true,
  },
};

export const CustomSize: Story = {
  args: {
    ...Default.args,
    className: "w-500 h-350",
  },
};
