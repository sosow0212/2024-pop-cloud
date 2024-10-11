"use client";

// import EventCard from "@/components/common/list-card";

import Map from "@/components/map";
import { useMapState } from "@/hooks";

import MapSearch from "./_components/map-search";
// import { useModalStore } from "@/store";

// const event = {
//   id: 1,
//   title: "아보디저트 팝업스토어",
//   location: "서울특별시 송파구",
//   startDate: "2024-09-02T00:00:00",
//   endDate: "2024-09-24T00:00:00",
//   image: "/images/luffi.jpg",
// };

export default function MapPage() {
  const { mapInfo, detectMoving, changeCenterPosition } = useMapState();

  return (
    <section className="mapPage-px space-y-10">
      <div className="flex items-center justify-end">
        <MapSearch onChangeValue={changeCenterPosition} />
      </div>
      <Map mapInfo={mapInfo} handleChange={detectMoving} className="w-full" />

      <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* {mapInfo.markers.map((marker)=>(
          <EventCard key={marker.info.id} {...marker.info}    />
        ))} */}
        {/* <EventCard event={event} />
        <EventCard event={event} />
        <EventCard event={event} /> */}
      </article>
    </section>
  );
}
