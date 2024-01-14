"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

export default function Avatar({
  image,
  className,
}: {
  image: ImageField;
  className?: string;
}) {
  const component = useRef(null);

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700">
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-fill"
        />
      </div>
    </div>
  );
}
