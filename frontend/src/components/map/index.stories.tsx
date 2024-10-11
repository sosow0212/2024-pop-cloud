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

const SEONGSU = {
  lat: 37.544882695287725,
  lng: 127.05574132618605,
};

const initState: MapInfoType = {
  currentPosition: SEONGSU,
  center: SEONGSU,
  markers: [],
  mapLevel: 4,
};

export const Default: Story = {
  render: () => <Map mapInfo={initState} handleChange={() => {}} />,
};
