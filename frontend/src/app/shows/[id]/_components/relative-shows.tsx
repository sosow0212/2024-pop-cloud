import { RelativeShow } from "@pop-cloud-types";

import EventCard from "@/components/common/list-card";

interface RelativeShowsProps {
  data: RelativeShow[];
}

export default function RelativeShows({ data }: RelativeShowsProps) {
  return (
    <section className="mb-70">
      <h3 className="text-20-600 md:text-24-600">연관 추천 팝업</h3>
      {data.map((show) => (
        <EventCard key={show.showId} event={show} />
      ))}
      <span />
    </section>
  );
}
