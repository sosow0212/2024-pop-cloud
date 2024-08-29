import Link from "next/link";

interface ContentCardProps {
  categoryType?: "popup" | "exhibition";
  cardId: string;
}

const ContentCard = ({ cardId, categoryType = "popup" }: ContentCardProps) => {
  return (
    <Link
      href={`/category/${categoryType}/${cardId}`}
      className="flex flex-col"
    >
      <div className="h-40 w-full rounded-md bg-black" />
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full items-center justify-between">
          <h3>제목</h3>
          <div>기간</div>
        </div>
        <div className="text-xs text-slate-400">위치</div>
      </div>
    </Link>
  );
};

export default ContentCard;
