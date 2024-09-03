interface MainPopularProps {
  content: "popup" | "exhibition";
}
const title = {
  popup: "팝업",
  exhibition: "전시회",
};

const MainPopular = async ({ content }: MainPopularProps) => {
  //   const contents = await getContent(content)
  return (
    <div className="flex h-[30vh] flex-col gap-y-2">
      <h3>이달의 인기 {title[content]} </h3>
      <div className="flex h-full items-center space-x-2">
        <div className="h-full w-full bg-slate-100 brightness-50" />
        <div className="h-full w-full bg-slate-100 brightness-50" />
      </div>
    </div>
  );
};

export default MainPopular;
