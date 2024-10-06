import type { Meta, StoryObj } from "@storybook/react";

import Map from ".";

const meta = {
  title: "Components/Map",
  component: Map,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Map>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Map />,
};
