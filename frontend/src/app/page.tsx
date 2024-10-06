import CarouselUI from "@/components/common/carousel";
import PopupCard, { Popup } from "@/components/common/popup-card";

const BANNER_MOCK = [
  "/images/rhino.webp",
  "/images/cat.webp",
  "/images/dog.webp",
];
const POPUP_MOCK: Popup = {
  id: 1,
  ownerId: 9,
  title: "MOCK",
  description: "TITLE: DESCRIPTION",
  location: "Yongsan-gu, Seoul",
  isParkingAvailable: true,
  fee: 89000,
  startDate: "2024-08-02T19:32:19.379718",
  endDate: "2024-08-02T19:32:19.379718",
  openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
  latitude: 37.556725,
  longitude: 126.9234952,
  publicTag: "게임",
};

const sectionStyle = "my-30 flex flex-col gap-10";
const headingStyle = "text-24 font-extrabold ml-20";
const cardContainerStyle = "flex justify-center";
const bannerStyle = "h-180 w-full bg-blue-100";

export default function Home() {
  return (
    <main>
      <section>
        <CarouselUI data={BANNER_MOCK} />
      </section>
      <section className="my-30 flex flex-col gap-10">
        <h2 className="ml-20 text-24 font-extrabold">🔥 Hottest</h2>
        <div className={cardContainerStyle}>
          <PopupCard popup={POPUP_MOCK} />
        </div>
      </section>
      <div className={bannerStyle}>Banner</div>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>Upcoming..</h2>
        <div className={cardContainerStyle}>
          <PopupCard popup={POPUP_MOCK} />
        </div>
      </section>
      <div className={bannerStyle}>Banner</div>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>Pop-ups</h2>
        <div className={cardContainerStyle}>
          <PopupCard popup={POPUP_MOCK} />
        </div>
      </section>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>Exhibitions</h2>
        <div className={cardContainerStyle}>
          <PopupCard popup={POPUP_MOCK} />
        </div>
      </section>
      <div className={bannerStyle}>Banner</div>
      {/* CTA */}
      <section className={`${sectionStyle} text-24 font-extrabold`}>
        <div>Join us!</div>
        <div>Showcase yours</div>
        <div>Subscribe</div>
      </section>
    </main>
  );
}
