import { z } from "zod";

export const parcelSchema = z.object({
  length: z
    .number({ invalid_type_error: "Length must be a number" })
    .positive("Length must be positive"),
  width: z
    .number({ invalid_type_error: "Width must be a number" })
    .positive("Width must be positive"),
  height: z
    .number({ invalid_type_error: "Height must be a number" })
    .positive("Height must be positive"),
  weight: z
    .number({ invalid_type_error: "Weight must be a number" })
    .positive("Weight must be positive"),
});

export type ParcelFormData = z.infer<typeof parcelSchema>;
