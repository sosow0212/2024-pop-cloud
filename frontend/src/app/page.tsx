import Link from "next/link";

import CarouselUI from "@/components/common/carousel";
import Slide from "@/components/common/popup-slide";
import mockData from "@/components/common/popup-slide/mockData";

const BANNER_MOCK = [
  "/images/rhino.webp",
  "/images/cat.webp",
  "/images/dog.webp",
];

const sectionStyle = "my-30 flex flex-col max-w-1100 mx-auto";
const headingStyle = "text-24 font-extrabold pl-20";
const cardContainerStyle = "flex justify-center";
const bannerStyle = "h-180 w-full bg-blue-100 ";

export default function Home() {
  return (
    <>
      <section>
        <CarouselUI data={BANNER_MOCK} />
      </section>
      <section className="mx-auto flex max-w-1100 flex-col py-30">
        <h2 className="pl-20 text-24 font-extrabold">🔥 Hottest</h2>
        <div className={cardContainerStyle}>
          <Slide popups={mockData} />
        </div>
      </section>
      <div className={bannerStyle}>Banner</div>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>Upcoming..</h2>
        <div className={cardContainerStyle}>
          <Slide popups={mockData} />
        </div>
      </section>
      <div className={bannerStyle}>Banner</div>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>Pop-ups</h2>
        <div className={cardContainerStyle}>
          <Slide popups={mockData} />
        </div>
      </section>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>Exhibitions</h2>
        <div className={cardContainerStyle}>
          <Slide popups={mockData} />
        </div>
      </section>
      <div className={bannerStyle}>Banner</div>
      {/* CTA */}
      <section
        className={`${sectionStyle} mb-100 flex flex-col gap-10 px-20 text-24 font-extrabold`}
      >
        <Link href="/">Showcase yours🌏</Link>
        <Link href="/">Subscribe our newsletters!</Link>
      </section>
    </>
  );
}
