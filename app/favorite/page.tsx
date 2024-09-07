import ContentCard from "@/components/ui/content-card";

// 무한 스크롤?
const FavoritePage = () => {
  // const user = getCurrentProfile()

  return (
    <section className="h-full">
      FavoritePage
      <div>서버단에서 유저의 정보 받아온 뒤 페이보릿 목록 가져올 것</div>
      <div>
        로그인 한 유저가 아니라면 로그인 페이지로 전환(middlewar로 제어하기)
      </div>
      <article className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {Array.from({ length: 12 }).map((_, idx) => (
          <ContentCard categoryType="popup" key={idx} cardId="12312nsad" />
        ))}
      </article>
    </section>
  );
};

export default FavoritePage;
