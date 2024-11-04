import { Show } from "@pop-cloud-types";
import { format } from "date-fns";

const getDetailInfo = (data: Show) => [
  {
    title: "행사기간",
    info: `${format(new Date(data.startDate), "yyyy. MM. dd")} - ${format(new Date(data.endDate), "yyyy. MM. dd")}`,
  },
  { title: "이용시간", info: data.openTimes },
  { title: "이용요금", info: `${data.fee}원` },
  { title: "주소", info: data.location },
];

export default getDetailInfo;
