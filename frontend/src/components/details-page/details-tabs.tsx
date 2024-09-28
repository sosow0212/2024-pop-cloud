import { format } from "date-fns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Popup {
  data: {
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
    isKidsZone: boolean;
    isWifiAvailable: boolean;
    fee: number;
    publicTag: string;
    visitCount: number;
    likedCount: number;
    tags: string[];
    images: string[];
  };
}

export default function DetailsTabs({ data }: Popup) {
  const DETAIL_INFO = [
    {
      title: "행사기간",
      info: `${format(new Date(data.startDate), "yyyy. MM. dd")} - ${format(new Date(data.endDate), "yyyy. MM. dd")}`,
    },
    { title: "장소", info: data.location },
    { title: "이용시간", info: data.openTimes },
    { title: "이용요금", info: `${data.fee}원` },
    { title: "주소", info: data.location },
  ];

  return (
    <Tabs defaultValue="information" className="mt-30 w-full">
      <TabsList>
        <TabsTrigger value="information">상세정보</TabsTrigger>
        <TabsTrigger value="review">후기</TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <section className="my-40">
          <article className="leading-16 text-14">{data.description}</article>

          {DETAIL_INFO.map(({ title, info }) => (
            <dl key={title}>
              <dt className="mt-20 text-18-700">{title}</dt>
              <dd className="mt-8 text-16">{info}</dd>
            </dl>
          ))}
        </section>
      </TabsContent>
      <TabsContent value="review">review</TabsContent>
    </Tabs>
  );
}
