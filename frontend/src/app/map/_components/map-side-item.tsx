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
      className={`border px-20 py-10 ${clickedMarkerId === marker.id ? "bg-slate-300" : "bg-white"}`}
    >
      <EventCard
        event={{
          id: marker.id,
          startDate: marker.startDate,
          endDate: marker.endDate,
          image: "/images/luffi.jpg",
          location: marker.position.location,
          title: marker.title,
        }}
      />
    </li>
  );
}
