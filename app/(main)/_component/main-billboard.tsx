const MainBillboard = () => {
  return (
    <section className="-mx-2 h-[50vh] overflow-hidden">
      <div className="flex h-full w-fit">
        <article className="flex h-full w-fit items-center bg-red-300 font-bold text-white">
          <div className="h-full w-[36rem] bg-red-500 md:w-[42rem]">1</div>
          <div className="h-full w-[36rem] bg-blue-500 md:w-[42rem]">2</div>
          <div className="h-full w-[36rem] bg-yellow-500 md:w-[42rem]">3</div>
        </article>
        <article className="flex h-full w-fit items-center bg-red-300 font-bold text-white">
          <div className="h-full w-[36rem] bg-red-500 md:w-[42rem]">4</div>
          <div className="h-full w-[36rem] bg-blue-500 md:w-[42rem]">5</div>
          <div className="h-full w-[36rem] bg-yellow-500 md:w-[42rem]">6</div>
        </article>
      </div>
    </section>
  );
};

export default MainBillboard;

/**
 * 전체 길이 구하기 -> (전체 길이에서 / cnt) 만큼 좌에서 우로 시간마다 움직임 (3s 15% 이동 나머지 대기)
 *    클릭시 -> 현재 위치에서 (전체 길이에서 / cnt) 만큼 + 또는 -
 *
 */
