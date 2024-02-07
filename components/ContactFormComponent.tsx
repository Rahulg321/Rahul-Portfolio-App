"use client";

import React from "react";
import Bounded from "./Bounded";
import clsx from "clsx";
import { ContactUsSchema, TContactUsSchema } from "@/app/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { SubmitContactForm } from "@/app/actions";

type ContactFormProps = {
  classname?: string;
};

const ContactFormComponent = ({ classname }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TContactUsSchema>({
    resolver: zodResolver(ContactUsSchema),
  });

  const onSubmit = async (data: TContactUsSchema) => {
    const response = await SubmitContactForm(data);

    if (response.errors) {
      toast.error("Could not send message to the server");
    }

    if (response.success) {
      toast.success("your message was sent successfully");
    }

    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx("flex flex-col gap-4", classname)}
      >
        <input
          {...register("name", {
            required: "name is required",
          })}
          placeholder="Your name"
          className="form-input flex-1 font-semibold text-black"
        />
        {errors.name && (
          <span className="text-red-500">{`${errors.name.message}`}</span>
        )}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          name="email"
          className="form-input flex-1 font-semibold text-black"
        />
        {errors.email && (
          <span className="text-red-500">{`${errors.email.message}`}</span>
        )}
        <textarea
          {...register("message", {
            required: "message is required",
          })}
          name="message"
          placeholder="Your message"
          className="form-textarea w-full font-semibold text-black"
        ></textarea>
        {errors.message && (
          <span className="text-red-500">{`${errors.message.message}`}</span>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-secondary block bg-blue-600 px-4 py-2 transition hover:bg-blue-800 hover:shadow-xl"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ContactFormComponent;
