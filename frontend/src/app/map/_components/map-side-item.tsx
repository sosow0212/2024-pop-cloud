import EventCard from "@/components/common/list-card";

interface MapSideItemProps {
  marker: MarkerType;
  clickedMarkerId: number;
}

export default function MapSideItem({
  marker,
  clickedMarkerId,
}: MapSideItemProps) {
  return (
    <li
      className={`${clickedMarkerId === marker.id ? "bg-slate-300" : "bg-white"}`}
    >
      <EventCard
        event={{
          showId: marker.id,
          startDate: marker.startDate,
          endDate: marker.endDate,
          images: ["/images/luffi.jpg"],
          location: marker.position.location,
          title: marker.title,
          likedCount: marker.likedCount,
          publicTag: "",
          showType: marker.searchTarget,
          visitedCount: marker.visitedCount,
        }}
      />
    </li>
  );
}
