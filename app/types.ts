import z from "zod";

export const ContactUsSchema = z.object({
  firstName: z.string().refine((value) => value.trim() !== "", {
    message: "First name is required",
  }),
  lastName: z.string().refine((value) => value.trim() !== "", {
    message: "Last name is required",
  }),

  email: z.string().email(),
  message: z.string().refine((value) => value.trim() !== "", {
    message: "Message is required",
  }),
});

export type TContactUsSchema = z.infer<typeof ContactUsSchema>;
