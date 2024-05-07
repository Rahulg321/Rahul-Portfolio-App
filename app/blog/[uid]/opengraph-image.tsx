/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { ImageResponse } from "next/og";
import React from "react";
import * as prismic from "@prismicio/client";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Rahul Portfolio App | Blog";
export const contentType = "image/png";

export default async function og({ params }: { params: { uid: string } }) {
  const client = createClient();
  const page = await client.getByUID("blog_post", params.uid);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={prismic.asImageSrc(page.data.featured_image) as string}
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
