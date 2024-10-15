import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

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

const SINLIM = {
  lat: 37.484267135140364,
  lng: 126.9297453749671,
};

const initState: MapInfoType = {
  currentPosition: SINLIM,
  center: SINLIM,
  markers: [
    {
      searchTarget: "POPUPS",
      id: 111,
      title: "타임스트림",
      position: {
        latitude: {
          value: 37.48388636094257,
        },
        longitude: {
          value: 126.93034045502553,
        },
        location: "주소 타임스트림",
      },
      startDate: String(new Date()),
      endDate: String(new Date()),
      visitedCount: 10,
      likedCount: 20,
    },
    {
      searchTarget: "POPUPS",
      id: 222,
      title: "강남수 요양병원",
      position: {
        latitude: {
          value: 37.4851550452392,
        },
        longitude: {
          value: 126.930450082986,
        },
        location: "주소 강남수요양병원",
      },
      startDate: String(new Date()),
      endDate: String(new Date()),
      visitedCount: 10,
      likedCount: 20,
    },
    {
      searchTarget: "EXHIBITION",
      id: 333,
      title: "미남장소",
      position: {
        latitude: {
          value: 37.4842340583771,
        },
        longitude: {
          value: 126.92719916344,
        },
        location: "주소 미남참치",
      },
      startDate: String(new Date()),
      endDate: String(new Date()),
      visitedCount: 10,
      likedCount: 20,
    },
  ],
  mapLevel: 4,
};

function MapWrapper() {
  const [clickedMarker, setClickedMarker] = useState(-1);

  const handleClickMarker = (id: number) => {
    setClickedMarker((prevId) => (prevId === id ? -1 : id));
  };

  return (
    <Map
      mapInfo={initState}
      clickedMarker={clickedMarker}
      onClickMarker={handleClickMarker}
      handleChange={() => {}}
    />
  );
}

export const Default: Story = {
  render: () => <MapWrapper />,
};
