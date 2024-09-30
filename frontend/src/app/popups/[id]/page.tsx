import CarouselUI from "@/components/common/carousel";
import DetailsHeader from "@/components/details-page/details-header";
import DetailsTabs from "@/components/details-page/details-tabs";
import DetailsTags from "@/components/details-page/details-tags";

export type Popup = {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  openTimes: string;
  location: string;
  latitude: number;
  longitude: number;
  isParkingAvailable: boolean;
  isFoodAllowed: boolean;
  isPetAllowed: boolean;
  isKidsZone: boolean;
  isWifiAvailable: boolean;
  fee: number;
  publicTag: string;
  visitCount: number;
  likedCount: number;
  tags: string[];
  images: string[];
};

async function getPopupDetails(popupId: number): Promise<Popup> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/popups/${popupId}`,
  );
  const res = await fetch(url);
  return res.json();
}

export default async function PopupDetails({
  params,
}: {
  params: { id: string };
}) {
  const popupId = Number(params.id);
  const data = await getPopupDetails(popupId);

  return (
    <div className="text-gray-700">
      <DetailsHeader publicTag={data.publicTag} title={data.title} />
      <hr className="mb-40 h-1 w-full bg-gray-200" />
      <CarouselUI
        data={data.images}
        className="h-300 md:h-460 md:w-700 lg:h-500 w-full"
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
