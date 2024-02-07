"use server";

import { Resend } from "resend";
import { ContactUsSchema, TContactUsSchema } from "./types";
import React from "react";
import ContactFormEmail from "@/components/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SubmitContactForm(formData: TContactUsSchema) {
  try {
    //validating data on the server
    const validatedData = ContactUsSchema.safeParse(formData);
    let zodErrors = {};

    if (!validatedData.success) {
      validatedData.error.issues.forEach(
        (issue) =>
          (zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }),
      );
    }

    if (Object.keys(zodErrors).length > 0) {
      // zod errors exist in our application
      return { errors: true, zodErrors };
    }

    await resend.emails.send({
      from: "Rahul Gupta <onboarding@resend.dev>",
      to: "rg5353070@gmail.com",
      subject: `Contact Inquiry from ${formData.name}`,
      reply_to: formData.email,
      react: React.createElement(ContactFormEmail, {
        message: formData.message,
        name: formData.name,
        email: formData.email,
      }),
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      errors: true,
      errorMessage: error.message,
    };
  }
}
