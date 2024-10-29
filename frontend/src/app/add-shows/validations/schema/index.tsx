import { z } from "zod";

export const addShowForm = z.object({
  showTitle: z.string(),
  description: z.string().min(10, "설명은 최소 10자 이상이어야 합니다."),
  publicTag: z.string(),
});

export type AddShowFormData = z.infer<typeof addShowForm>;

export interface AddShowsFormResponse {
  location: string;
}
