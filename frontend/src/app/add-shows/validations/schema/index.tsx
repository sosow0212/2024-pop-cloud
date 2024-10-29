import { z } from "zod";

export const addShowForm = z.object({
  title: z.string().min(1, "팝업/전시회 이름은 필수입니다"),

  description: z.string().min(1, "설명은 필수입니다"),

  startDate: z.string().min(1, "시작일은 필수입니다"),

  endDate: z.string().min(1, "종료일은 필수입니다"),

  openTimes: z.string().min(1, "운영시간은 필수입니다"),

  location: z.string().min(1, "주소는 필수입니다"),

  latitude: z.string().optional().nullable(),

  longitude: z.string().optional().nullable(),

  fee: z.number().nonnegative().optional().default(0),

  publicTag: z.string().min(1, "공개 태그는 필수입니다"),

  tags: z.array(z.string()).optional().default([]),

  isParkingAvailable: z.boolean().optional().default(false),

  isFoodAllowed: z.boolean().optional().default(false),

  isPetAllowed: z.boolean().optional().default(false),

  isKidsZone: z.boolean().optional().default(false),

  isWifiAvailable: z.boolean().optional().default(false),
});

export type ShowType = z.infer<typeof addShowForm>;

export interface AddShowsFormResponse {
  location: string;
}
