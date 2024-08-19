const MIN = 60 * 1_000;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEEK = DAY * 7;
const MONTH = WEEEK * 4;
const YEAR = 12 * MONTH;

const RelativeTime = (date: Date) => {
  const cur = new Date().getTime();
  const prev = new Date(date).getTime();
  const diff = cur - prev;
  if (diff < MIN) return "방금 전";
  if (diff < HOUR) return `${Math.floor(diff / MIN)}분 전`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}시간 전`;
  if (diff < WEEEK) return `${Math.floor(diff / DAY)}일 전`;
  if (diff < MONTH) return `${Math.floor(diff / WEEEK)}주 전`;
  if (diff < YEAR) return `${Math.floor(diff / MONTH)}개월 전`;

  return `${Math.floor(diff / YEAR)}년 전`;
};

export default RelativeTime;
