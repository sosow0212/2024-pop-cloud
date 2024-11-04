import { getShowsDetails } from "@/api/get-shows";
import CarouselUI from "@/components/common/carousel";

import DetailsHeader from "./_components/details-header";
import DetailsTabs from "./_components/details-tabs";
import DetailsTags from "./_components/details-tags";

export default async function PopupDetails({
  params,
}: {
  params: { id: string };
}) {
  const popupId = Number(params.id);
  const data = await getShowsDetails(popupId);

  return (
    <div className="text-gray-100">
      <DetailsHeader publicTag={data.publicTag} title={data.title} />
      <hr className="mb-40 h-1 w-full bg-gray-200" />
      <CarouselUI
        data={data.images}
        autoPlay={false}
        className="h-300 w-full md:h-460 md:w-700 lg:h-500"
      />
      <DetailsTabs data={data} />
      <hr className="my-30 h-1 w-full bg-gray-200" />

      <DetailsTags tags={data.tags} />
      <hr className="my-30 h-1 w-full bg-gray-200" />
      <section className="mb-70">
        <h3 className="text-20-600 md:text-24-600">연관 추천 팝업</h3>
      </section>
    </div>
  );
}
