import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, "Required"),
  street1: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().min(2, "Required"),
  zip: z.string().min(5, "Required"),
  country: z
    .string()
    .min(1, "Required")
    .refine((val) => val === "US", {
      message: "Only US addresses allowed",
    }),
  phone: z.string().min(7, "Required"),
  email: z.string().email("Invalid email"),
});

export type AddressFormData = z.infer<typeof addressSchema>;
