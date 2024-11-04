import { DetailsProps } from "@pop-cloud-types";

import MapStatic from "@/components/map/map-static";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getDetailInfo from "@/constants/details";

import DetailsInfo from "./details-info";

export default function DetailsTabs({ data }: DetailsProps) {
  const DETAIL_INFO = getDetailInfo(data);

  return (
    <Tabs defaultValue="information" className="my-30 w-full">
      <TabsList>
        <TabsTrigger className="text-18" value="information">
          상세정보
        </TabsTrigger>
        <TabsTrigger className="text-18" value="review">
          후기
        </TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <section className="my-40">
          <article className="leading-16 mb-50 text-16 text-gray-600">
            {data.description}
          </article>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <MapStatic
              label={data.title}
              lat={data.latitude}
              lng={data.longitude}
              type="popups"
              className="order-2 size-full h-300 md:order-1"
            />
            <div className="order-1 mb-26 md:order-2 md:ml-20">
              {DETAIL_INFO.map(({ title, info }) => (
                <dl key={title} className="mb-20 last:mb-0 md:mb-34">
                  <dt className="mb-8 text-16-600 text-gray-700">{title}</dt>
                  <dd className="text-15 text-gray-500">{info}</dd>
                </dl>
              ))}
            </div>
          </div>
        </section>
        <hr className="mb-30 h-1 w-full bg-gray-200" />
        <DetailsInfo data={data} />
      </TabsContent>
      <TabsContent className="h-100" value="review">
        후기가 존재하지 않습니다
      </TabsContent>
    </Tabs>
  );
}
