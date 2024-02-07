import z from "zod";

export const ContactUsSchema = z.object({
  name: z.string().refine((value) => value.trim() !== "", {
    message: "Name is required",
  }),

  email: z.string().email(),
  message: z.string().refine((value) => value.trim() !== "", {
    message: "Message is required",
  }),
});

export type TContactUsSchema = z.infer<typeof ContactUsSchema>;
