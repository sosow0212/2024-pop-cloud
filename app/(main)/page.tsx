/**
 * 1. 메인 페이지 진입 시 유저 위치 확인 client 어디에서 다룰지
 */

import { MainMap, MainBillboard, MainPopular } from "./_component";
import MainReviews from "./_component/main-reviews";

const MainPage = () => {
  return (
    <section className="relative flex h-full flex-col space-y-4">
      <MainBillboard />
      <MainPopular content="popup" />
      <MainPopular content="exhibition" />
      <MainReviews />
      <MainMap />
    </section>
  );
};

export default MainPage;
