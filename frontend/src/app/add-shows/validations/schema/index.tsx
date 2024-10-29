import { z } from "zod";

export const addShowForm = z
  .object({
    title: z.string().min(1, "팝업/전시회 이름은 필수입니다"),
    description: z.string().min(1, "설명은 필수입니다"),
    startDate: z.string().min(1, "시작일은 필수입니다"),
    endDate: z.string().min(1, "종료일은 필수입니다"),
    openTimes: z.string().min(1, "운영시간은 필수입니다"),
    location: z.string().min(1, "주소는 필수입니다"),
    fee: z.number(),
    publicTag: z.string().min(1, "공개 태그는 필수입니다"),
    tags: z.array(z.string()),
    isParkingAvailable: z.boolean(),
    isFoodAllowed: z.boolean(),
    isPetAllowed: z.boolean(),
    isKidsZone: z.boolean(),
    isWifiAvailable: z.boolean(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "종료일은 시작일 이후여야 합니다",
      path: ["endDate"],
    },
  );

export type AddShowFormData = z.infer<typeof addShowForm>;

export interface AddShowsFormResponse {
  location: string;
}
