import { z } from "zod";

export const addShowForm = z.object({
  showTitle: z.string(),
  description: z.string().min(10, "설명은 최소 10자 이상이어야 합니다."),
  publicTag: z.string(),
  placeTypes: z
    .array(z.string())
    .min(1, "최소 1개 이상의 장소 유형을 선택해주세요"),
});

export type AddShowFormData = z.infer<typeof addShowForm>;

export interface AddShowsFormResponse {
  location: string;
}
