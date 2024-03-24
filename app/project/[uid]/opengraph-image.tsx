/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/prismicio";
import React from "react";
import { ImageResponse } from "next/og";
export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Rahul Portfolio App | Project";
export const contentType = "image/png";

export default async function og({ params }: { params: { uid: string } }) {
  const client = createClient();
  const page = await client.getByUID("project", params.uid);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={
              "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={page.data.title as string}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          {/* Title */}
          <div tw="text-7xl font-bold">{page.data.title}</div>
          {/* Tags */}
          <div tw="flex mt-6 flex-wrap items-center text-4xl text-neutral-200">
            <div
              tw={`font-medium ${
                page?.data.title === "Cities"
                  ? "text-emerald-600"
                  : "text-indigo-600"
              }`}
            >
              {page?.data.title}
            </div>

            {page.tags.map((tag, index) => (
              <React.Fragment key={index}>
                <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
                <div tw={`font-medium text-emerald-600`}>{tag}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
