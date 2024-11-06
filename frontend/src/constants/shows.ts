import { Show } from "@pop-cloud-types";
import { format } from "date-fns";

export const getDetailInfo = (data: Show) => [
  {
    title: "행사기간",
    info: `${format(new Date(data.startDate), "yyyy. MM. dd")} - ${format(new Date(data.endDate), "yyyy. MM. dd")}`,
  },
  { title: "이용시간", info: data.openTimes },
  { title: "이용요금", info: data.fee },
  { title: "주소", info: data.location },
];

const today = new Date();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), 0);

export const defaultParams = {
  startDate: startOfMonth.toISOString().split("T")[0],
  endDate: oneYearLater.toISOString().split("T")[0],
  showType: "popups" as "popups" | "exhibition",
  pageSize: "10",
};

export default getDetailInfo;
