import type { Meta, StoryObj } from "@storybook/react";
import EventCard from "./index";

const meta: Meta<typeof EventCard> = {
  title: "Components/EventCard",
  component: EventCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const Default: Story = {};
