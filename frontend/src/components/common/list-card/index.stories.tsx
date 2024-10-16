import type { Meta, StoryObj } from "@storybook/react";

import EventCard from "./index";

const meta: Meta<typeof EventCard> = {
  title: "Components/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  argTypes: {
    onLikeChange: { action: "liked" },
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

const baseEvent = {
  showId: 1,
  title: "아보디저트 팝업스토어",
  location: "서울특별시 송파구",
  startDate: "2024-09-02T00:00:00",
  endDate: "2024-09-24T00:00:00",
  images: ["/images/luffi.jpg"],
  publicTag: "디저트",
  showType: "팝업스토어",
  visitedCount: 100,
  likedCount: 50,
};

export const Default: Story = {
  args: {
    event: baseEvent,
  },
};

export const LongTitle: Story = {
  args: {
    event: {
      ...baseEvent,
      showId: 2,
      title:
        "매우 긴 제목의 이벤트 - 아보디저트 팝업스토어 특별 여름 에디션 (2024)",
    },
  },
};

export const NoImage: Story = {
  args: {
    event: {
      ...baseEvent,
      showId: 3,
      title: "이미지 없는 이벤트",
      location: "서울특별시 강남구",
      images: [],
    },
  },
};

export const PastEvent: Story = {
  args: {
    event: {
      ...baseEvent,
      showId: 4,
      title: "지난 이벤트",
      location: "서울특별시 마포구",
      startDate: "2023-01-01T00:00:00",
      endDate: "2023-01-31T00:00:00",
    },
  },
};
